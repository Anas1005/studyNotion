import React, { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

export const InstructorChart = ({ courses }) => {
  const [currentChart, setCurrrentChart] = useState("students");
  const getRandomColors = (num) => {
    const colors = [];
    for (let i = 0; i < num; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
        Math.random() * 256
      )},${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  // Create Data for Chart Displaying Student Info
  const chartDataForStudents = {
    labels: courses?.map((course) => course?.courseName),
    datasets: [
      {
        data: courses.map((course) => course?.totalStudentsEnrolled),
        backgroundColor: getRandomColors(courses?.length),
      },
    ],
  };

  const chartDataForIncome = {
    labels: courses?.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalRevenueGenerated),
        backgroundColor: getRandomColors(courses?.length),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 12,
          },
        },
      },
      maintainAspectRatio: false,
    },
  };

  // Create Options
  return (
    <div className="text-white bg-richblack-800 w-[60%] p-4 rounded-lg ">
      <p className="text-xl font-semibold mb-4">Visualize</p>
      <div className="flex mb-2 ">
        <button
          className={`px-2 py-1 rounded-lg  mr-4 transition-all duration-300 ${
            currentChart === "students" ? "font-semibold bg-[#ffffff1a] text-yellow-25" : " bg-transparent  text-white"
          }`}
          onClick={() => setCurrrentChart("students")}
        >
          Students
        </button>
        <button
          className={` px-2 py-1 rounded-lg  transition-all duration-300 ${
            currentChart === "income" ? "font-semibold bg-[#ffffff1a] text-yellow-25" : " bg-transparent  text-white"
          }`}
          onClick={() => setCurrrentChart("income")}
        >
          Income
        </button>
      </div>
      <div className=" h-[83%]">
        {" "}
        <Pie
          className=" mx-auto"
          data={
            currentChart === "students"
              ? chartDataForStudents
              : chartDataForIncome
          }
          options={options}
        />
      </div>
    </div>
  );
};
