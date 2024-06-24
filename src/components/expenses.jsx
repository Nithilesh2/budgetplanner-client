import React, { useContext } from "react"
import AppContext from "../context/AppContext"
import "../css/expenses.css"
import Navbar from "./navbar"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ExpenseLi from "./expenseLi"

function Expenses() {
  const {
    AddExpenses,
    setCategory,
    category,
    handleKeyPress,
    setAmount,
    amount,
    enterKey,
    budget,
    changeBudget,
    spents,
    remaining,
    merge,
    formatDate,
    deleteItem,
  } = useContext(AppContext)

  return (
    <>
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
                    AddExpenses(category, amount)
                    setAmount("")
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
    </>
  )
}

export default Expenses
