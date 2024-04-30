import React, { useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import "../css/expenses.css";
import Navbar from "./navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExpenseLi from "./expenseLi";

function Expenses() {
  const notifyFalse = (val) => {
    toast.warn(`${val}`);
  };
  const notifyTrue = (val) => toast.success(`${val}`);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [spents, setSpents] = useState(0);
  const [budget, setBudget] = useState(500);
  const [remaining, setRemaining] = useState(0);
  const [catData, setCatData] = useState([]);
  const [amoData, setAmoData] = useState([]);

  const [dateCreated, setDateCreated] = useState([]);
  const [merge, setMerge] = useState({});

  const initializeMergeState = () => {
    const savedMerge = localStorage.getItem("merge");
    if (savedMerge) {
      const parsedMerge = JSON.parse(savedMerge);
      setMerge(parsedMerge);
    } else {
      setMerge({});
    }
  };

  // Load initial merge state when component mounts
  useEffect(() => {
    initializeMergeState();
    const savedCategory = localStorage.getItem("Category");
    if (savedCategory) {
      setCatData(JSON.parse(savedCategory));
    }
    const savedAmount = localStorage.getItem("Amount");
    if (savedAmount) {
      setAmoData(JSON.parse(savedAmount));
    }
    const savedDateCreated = localStorage.getItem("DateCreated");
    if (savedDateCreated) {
      setDateCreated(JSON.parse(savedDateCreated));
    }
    const savedBudget = localStorage.getItem("Budget");
    if (savedBudget) {
      setBudget(parseFloat(savedBudget));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("merge", JSON.stringify(merge));
    localStorage.setItem("Category", JSON.stringify(catData));
    localStorage.setItem("Amount", JSON.stringify(amoData));
    localStorage.setItem("Budget", budget);
    localStorage.setItem("DateCreated", JSON.stringify(dateCreated));
  }, [merge, catData, amoData, budget, dateCreated]);

  useEffect(() => {
    if (catData.length > 0 && amoData.length > 0) {
      setMerge(mergeArrays(catData, amoData, dateCreated));
      setSpents(amoData.reduce((acc, cur) => acc + parseInt(cur), 0));
      setRemaining(
        parseFloat(budget) -
          amoData.reduce((acc, cur) => acc + parseFloat(cur), 0)
      );
    }
  }, [catData, amoData, budget, dateCreated]);

  const mergeArrays = (cats, amos, dates) => {
    const merged = {};
    for (let i = 0; i < cats.length; i++) {
      merged[cats[i]] = {
        amount: amos[i],
        date: dates[i],
      };
    }
    return merged;
  };

  function AddExpenses(category, amount) {
    if (budget === 0) {
      notifyFalse("💵 Budget is null");
    } else {
      if (category === "") {
        notifyFalse("🚫 Empty category detected!");
      } else if (amount === "") {
        notifyFalse("🚫 Empty amount detected!");
      } else if (amount < 0) {
        notifyFalse("🚫 Amount should be positive");
      } else {
        const currentDate = new Date();
        const categoryIndex = catData.findIndex((cat) => cat === category);
        if (categoryIndex !== -1) {
          setAmoData((prevAmoData) => {
            const newAmoData = [...prevAmoData];
            newAmoData[categoryIndex] = (
              parseInt(newAmoData[categoryIndex]) + parseInt(amount)
            ).toString();
            return newAmoData;
          });
          setDateCreated((prevDateCreated) => {
            const newDateCreated = [...prevDateCreated];
            newDateCreated[categoryIndex] = currentDate;
            return newDateCreated;
          });
        } else {
          setCatData((prevCatData) => [
            ...prevCatData,
            firstCharUppercase(category),
          ]);
          setAmoData((prevAmoData) => [...prevAmoData, amount]);
          setDateCreated((prevDateCreated) => [
            ...prevDateCreated,
            currentDate,
          ]);
        }
        setCategory("");
        setAmount("");
        notifyTrue("💵 Wallet-friendly vibes! Another entry safely recorded.");
      }
    }
  }

  function enterKey(eve) {
    if (eve.key === "Enter") {
      if (eve.target.id === "category") {
        document.getElementById("amount").focus();
      } else if (eve.target.id === "amount") {
        AddExpenses(category, amount);
        document.getElementById("category").focus();
      }
    }
  }

  const deleteItem = (itemName) => {
    const itemIndex = catData.indexOf(itemName);
    if (itemIndex !== -1) {
      const newCatData = [...catData];
      const newAmoData = [...amoData];
      const newDateCreated = [...dateCreated];
      newCatData.splice(itemIndex, 1);
      newAmoData.splice(itemIndex, 1);
      newDateCreated.splice(itemIndex, 1);
      setCatData(newCatData);
      setAmoData(newAmoData);
      setDateCreated(newDateCreated);
      setMerge((prevMerge) => {
        const newMerge = { ...prevMerge };
        delete newMerge[itemName];
        return newMerge;
      });
      if (newAmoData.length === 0) {
        setSpents(0);
        setRemaining(budget);
      }
      notifyTrue("Data deleted successfully!");
    } else {
      notifyFalse("Data not found!");
    }
  };
  function changeBudget() {
    const changebudget = parseInt(prompt("Enter budget here: ", 5000));
    if (changebudget < 0) {
      notifyFalse("Positive numbers only for your budget! 💰");
    } else {
      setBudget(changebudget);
      if (changebudget > budget) {
        notifyTrue("Budget increased successfully! 💰💼");
      } else if (changebudget < budget) {
        notifyTrue("Budget decreased successfully! 💰💼");
      } else {
        notifyTrue("Budget remains same! 💰💼");
      }
    }
  }
  //
  const handleKeyPress = (event) => {
    setCategory(event.target.value);
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (!/^[A-Za-z\s]+$/.test(keyValue)) {
      event.preventDefault();
    }
    if (event.key === "Enter") {
      if (event.target.id === "category") {
        document.getElementById("amount").focus();
      } else if (event.target.id === "amount") {
        AddExpenses(category, amount);
        document.getElementById("category").focus();
      }
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      month: "numeric",
      day: "numeric",
      year: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    return date.toLocaleString("en-IN", options);
  };

  function firstCharUppercase(data) {
    let str = "";
    let value = data;
    for (var i = 1; i < value.length; i++) {
      str = str + value.charAt(i).toLowerCase();
    }
    return value.charAt(0).toUpperCase() + str;
  }

  return (
    <>
      <AppContext.Provider value={{ budget, setBudget }}>
        <main className="mainExpense">
          <Navbar />
          <div className="middle">
            <div className="middleLeft">
              <div className="addData">
                <div className="expenseCategory">
                  <input
                    id="category"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    type="text"
                    placeholder="Category"
                    onKeyPress={handleKeyPress}
                  />
                </div>
                <div className="expenseAmount">
                  <input
                    id="amount"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                    type="number"
                    placeholder="Amount"
                    onKeyPress={enterKey}
                  />
                </div>
                <div className="expenseAdd">
                  <button
                    onClick={() => {
                      AddExpenses(category, amount);
                      setAmount("");
                    }}
                    className="addExpenseBtn"
                  >
                    ADD
                  </button>
                  <ToastContainer newestOnTop autoClose={2000} />
                </div>
              </div>
            </div>
            <div className="vline"></div>
            <hr className="vlineAfter" />
            <div className="middleRight">
              <div className="middleRightTop">
                <div className="budgetBox">
                  <span className="showBudget">Budget : ₹{budget}</span>
                  <button onClick={changeBudget} className="changeBudget">
                    <ion-icon name="create-outline"></ion-icon>
                  </button>
                </div>
                <div className="remainingBox">
                  <div className="showRemaining">Remaining: ₹{remaining}</div>
                </div>
                <div className="spentsBox">
                  <div className="showSpents">Spent: ₹{spents}</div>
                </div>
              </div>
              <div className="middleRightBottom">
                <div className="myExpenses">My Expenses</div>
                <hr className="hr" />
                <ul className="expenseHeading">
                  <li>
                    <span className="expenseName">Category</span>
                    <span className="expenseCost">Amount</span>
                    <span className="expenseAction">Delete</span>
                    <span className="expenseDetails">Created</span>
                  </li>
                </ul>
                <ul className="expenseData">
                  {Object.keys(merge).map((key, index) => (
                    <ExpenseLi
                      key={index}
                      name={key}
                      value={merge[key].amount}
                      date={formatDate(merge[key].date)}
                      onDelete={() => deleteItem(key)}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </AppContext.Provider>
    </>
  );
}

export default Expenses;
