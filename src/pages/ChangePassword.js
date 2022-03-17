import React, { useState, useEffect } from "react";

import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import { Input, Label, HelperText } from "@windmill/react-ui";
import { Checkmark } from "react-checkmark";
import { Card, CardBody } from "@windmill/react-ui";
import Icon from "../assets/img/male.png";


import Modal from "./Modal";
import axios from "axios";
import { UserDetails } from "../userDetails";

const ChangePassword = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/uploaded-key-people")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className='text-center'>
        <PageTitle>Management</PageTitle>
      </div>
      <div className='grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4'>
        {data.map((item, i) => {
          if (
            item.position === "Patron" ||
            item.position === "Dean, School of Business" ||
            item.position.includes("HOD")
          ) {
            return (
              <Card
                key={i}
                className='flex-col h-25'
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <img
                  style={{
                    borderRadius: "50%",
                    height: "200px",
                    width: "200px",
                  }}
                  className='object-cover'
                  src={item.img_data || Icon}
                  alt='card'
                />

                <CardBody className='dark:text-gray-200'>
                  <h1>{item.name}</h1>
                  <h1>{item.position}</h1>
                </CardBody>
              </Card>
            );
          }
          return null;
        })}
      </div>

      <hr className='mt-5 mb-5' />

      <div className='text-center'>
        <PageTitle>Meet your Executives</PageTitle>
      </div>
      <div className='grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4'>
        {data.map((item, i) => {
          if (
            item.position !== "Patron" &&
            item.position !== "Dean, School of Business"
          ) {
            return (
              <Card
                key={i}
                className='flex-col h-25'
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <img
                  style={{
                    borderRadius: "50%",
                    height: "200px",
                    width: "200px",
                  }}
                  className='object-cover'
                  src={item.img_data || Icon}
                  alt='card'
                />

                <CardBody className='dark:text-gray-200'>
                  <h1>{item.name}</h1>
                  <h1>{item.position}</h1>
                </CardBody>
              </Card>
            );
          }
          return null;
        })}
      </div>
    </>
  );
};

export default ChangePassword;
