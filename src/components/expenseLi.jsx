import React
// , { useEffect, useState }
  from "react"

export default function ExpenseLi(props) {
  // const [date, setDate] = useState("")

  // const today = new Date().toISOString().split("T")[0]

  // useEffect(() => {
  //   setDate(today)
  // }, [today])

  // const dateInputChange = (eve) => {
  //   setDate(eve.target.value)
  // }
  return (
    <>
      <li>
        <span className="expenseName">{props.name}</span>
        <span className="expenseCost">{props.value}</span>
        <span className="expenseAction expenseActionSpan">
          <i
            className="fa-solid fa-trash expenseActionActive"
            onClick={props.onDelete}
          ></i>
        </span>
        <i
          className="fa-solid fa-trash expenseActionDeactive"
          onClick={props.onDelete}
        ></i>

        <span className="expenseDate">
          {/* {props.date.toLocaleString("default", {
            dateStyle: "short",
            timeStyle: "short",
          })} */}
          <input
            className="expenseDate"
            type="date"
            // value={date}
            // onChange={dateInputChange}
          />
        </span>
      </li>
    </>
  )
}
