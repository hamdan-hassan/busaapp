import { HorizontalBar } from "react-chartjs-2";
import React, { useLayoutEffect, useState } from "react";
import axios from "axios";
import {baseUrl} from '../api/busa-api.js'
import { Card, CardBody } from "@windmill/react-ui";
import PageTitle from "../components/Typography/PageTitle";

const options = {
  scales: {
    xAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const CourseStats = () => {
  useLayoutEffect(() => {
    axios.get(`${baseUrl.baseUrl}/courseStats`).then((res) => {
      setCourse(res.data);
      console.log(res);
    });
  }, []);
  const [course, setCourse] = useState([]);

  let result = course.map((item) => {
    return item.count;
  });

  const data = {
    labels: [
      "BCom(Human Resource Management)",
      "BCom(Accounting)",
      "BCom(Banking and Finance)",
      "BCom(Marketing)",
      "BCom(Procurement and Supply Chain Management)",
      "Bsc Accounting",
      "Bsc Accounting and Finance",
      "BA Integrated Business Studies (Accounting)",
      "BA Integrated Business Studies (Management)",
      "BA Management",
      "Diploma in Business Studies"
    ],
    datasets: [
      {
        label: "Number of students",
        data: [
          result[0],
          result[1],
          result[2],
          result[3],
          result[4],
          result[5],
          result[6],
          result[7],
          result[8],
          result[9],
          result[10],
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card className='flex-col h-70'>
      <CardBody>
        <PageTitle>Programme Statistics</PageTitle>
        <HorizontalBar data={data} options={options} />
      </CardBody>
    </Card>
  );
};

export default CourseStats;
