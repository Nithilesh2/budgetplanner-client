import React from "react";

export default function ExpenseLi(props) {
  return (
    <>
      <li>
        <span className="expenseName">{props.name}</span>
        <span className="expenseCost">{props.value}</span>
        <span className="expenseAction">
          <i className="fa-solid fa-trash" onClick={props.onDelete}></i>
        </span>

        <span className="expenseDate">
          {props.date.toLocaleString("default", {
            dateStyle: "short",
            timeStyle: "short",
          })}
        </span>
      </li>
    </>
  );
}
