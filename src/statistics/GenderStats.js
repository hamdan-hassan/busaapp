import { Bar } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import { Card, CardBody } from "@windmill/react-ui";
import PageTitle from "../components/Typography/PageTitle";
import axios from "axios";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const GenderStats = () => {
  useEffect(() => {
    axios
      .get("http://localhost:3000/genderStats")
      .then((res) => setCourse(res.data));
  }, []);
  const [course, setCourse] = useState([]);

  let result = course.map((item) => {
    return item.count;
  });
  const data = {
    labels: ["Males", "Females"],
    datasets: [
      {
        label: "Number of students",
        data: [result[0], result[1]],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Card className='flex-col h-70'>
      <CardBody>
        <PageTitle>Gender Statistics</PageTitle>
        <Bar data={data} options={options} />
      </CardBody>
    </Card>
  );
};

export default GenderStats;
