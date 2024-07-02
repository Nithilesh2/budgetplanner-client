import style from "../css/expensesLi.css"
import React, { useEffect, useState } from "react"

export default function ExpenseLi(props) {
  const [date, setDate] = useState()

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]
    setDate(today)
  }, [])

  const dateInputChange = (eve) => {
    setDate(eve.target.value)
  }
  return (
    <>
      <li>
        <span className="expenseName">{props.name}</span>
        <span className="expenseCost">{props.value}</span>
        <span className="expenseAction">
          <i className="fa-solid fa-trash" onClick={props.onDelete}></i>
        </span>

        <span className="expenseDate">
          {/* {props.date.toLocaleString("default", {
            dateStyle: "short",
            timeStyle: "short",
          })} */}
          <input
            className="expenseDate"
            type="date"
            value={date}
            onChange={dateInputChange}
          />
        </span>
      </li>
    </>
  )
}
