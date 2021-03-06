import React, { useState, useEffect } from "react";
import { Card, CardBody } from "@windmill/react-ui";
import PageTitle from "../components/Typography/PageTitle";
import {baseUrl} from '../api/busa-api.js'
import axios from "axios";

const Summary = () => {
  useEffect(() => {
    axios
      .get(`${baseUrl.baseUrl}/tshirtStats`)
      .then((res) => setCourse(res.data));
  }, []);

  useEffect(() => {
    axios
      .get(`${baseUrl.baseUrl}/totalStduents`)
      .then((res) => setStd(res.data[0].count));
  }, []);

  useEffect(() => {
    axios
      .get(`${baseUrl.baseUrl}/registered-students`)
      .then((res) => setRegistered(res.data[0].count));
  }, []);

  useEffect(() => {
    axios
      .get(`${baseUrl.baseUrl}/not-registered-students`)
      .then((res) => setNotRegistered(res.data[0].count));
  }, []);
  const [course, setCourse] = useState([]);
  const [std, setStd] = useState([]);
  const [registered, setRegistered] = useState([]);
  const [notRegisteered, setNotRegistered] = useState([]);

  let result = course.map((item) => {
    return item.count;
  });
  return (
    <Card className='flex-col h-70 dark:text-gray-200'>
      <CardBody>
        <PageTitle>Summary</PageTitle>
        <div>
          <h1 style={{ marginBottom: "10px" }}>Total students: {std}</h1>
          <h1 style={{ marginBottom: "10px" }}>
            Registered Students: {registered}
          </h1>
          <h1 style={{ marginBottom: "10px" }}>
            Not Registered Students: {notRegisteered}
          </h1>
          <h1 style={{ marginBottom: "10px" }}>
            Total number of Programmmes: {9}
          </h1>
          <h1 style={{ marginBottom: "10px" }}>
            Student T-Shirt size(Small): {result[0]}
          </h1>
          <h1 style={{ marginBottom: "10px" }}>
            Student T-Shirt size(Medium): {result[1]}
          </h1>
          <h1 style={{ marginBottom: "10px" }}>
            Student T-Shirt size(Large): {result[2]}
          </h1>
          <h1 style={{ marginBottom: "10px" }}>
            Student T-Shirt size(X-Large): {result[3]}
          </h1>
          <h1 style={{ marginBottom: "10px" }}>
            Student T-Shirt size(XX-Large): {result[4]}
          </h1>
        </div>
      </CardBody>
    </Card>
  );
};

export default Summary;
