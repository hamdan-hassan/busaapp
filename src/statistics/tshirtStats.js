import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Card, CardBody } from "@windmill/react-ui";
import PageTitle from "../components/Typography/PageTitle";
import axios from "axios";

const TShirtStats = () => {
  useEffect(() => {
    axios
      .get("http://localhost:3000/tshirtStats")
      .then((res) => setCourse(res.data));
  }, []);
  const [course, setCourse] = useState([]);

  let result = course.map((item) => {
    return item.count;
  });

  const data = {
    labels: ["Small", "Medium", "Large", "X-Large", "XX-Large"],
    datasets: [
      {
        label: "# of Votes",
        data: [result[0], result[1], result[2], result[3], result[4]],
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
        <PageTitle>T-Shirts sizes</PageTitle>
        <Pie data={data} title='hjkl' />
      </CardBody>
    </Card>
  );
};
export default TShirtStats;
