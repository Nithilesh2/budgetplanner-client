import React, { useContext } from "react"
import Navbar from "./navbar"
import "../css/dashboard.css"
import { Bar, Pie } from "react-chartjs-2"
import "chart.js/auto"
import AppContext from "../context/AppContext"

function Dashboard() {
  const { catData, amoData, budget, decoded } = useContext(AppContext)

  const userData = {
    labels: catData,
    datasets: [
      {
        label: `Expenses(budget: ${budget})`,
        data: amoData,
        backgroundColor: [
          "rgba(219, 112, 147, 0.6)",
          "rgba(230, 230, 250, 0.6)",
          "rgba(255, 192, 203, 0.6)",
          "rgba(240, 128, 128, 0.6)",
          "rgba(218, 112, 214, 0.6)",
          "rgba(147, 112, 219, 0.6)",
        ],
        borderWidth: 2,
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  return (
    <>
      <main className="mainDashboard">
        <Navbar />
        <div className="totalData">
          <h1 className="greetings">
            
            {decoded
              ? `Welcome back, ${decoded}`
              : "Welcome back, User"}
          </h1>
          <div className="barChart">
            <div className="bar1">
              <Bar
                options={options}
                style={{ width: "200px", height: "250px" }}
                data={userData}
              />
            </div>
            <div className="bar2">
              <Pie
                options={options}
                style={{ width: "200px", height: "250px" }}
                data={userData}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Dashboard
