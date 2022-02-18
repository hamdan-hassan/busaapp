import React, { useState, useEffect } from "react";

import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import { Input, Label, HelperText } from "@windmill/react-ui";
import { Checkmark } from "react-checkmark";
import { Card, CardBody } from "@windmill/react-ui";
import Icon from "../assets/img/male.png";
import Dean from "../assets/img/dean.jpg";
import Patron from "../assets/img/patron.jpg";
import President from "../assets/img/president.jpg";
import Vice from "../assets/img/vice.jpg";
import FinancialSec from "../assets/img/financial sec.jpg";
import Treasurer from "../assets/img/treasurer.jpg";
import Organiser from "../assets/img/organiser.jpg";
import Genearal from "../assets/img/general sec.jpg";
import PRO from "../assets/img/pro.jpg";
import Wocom from "../assets/img/wocom.jpg";

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
        <PageTitle>Key People</PageTitle>
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
        {/* <Card
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
            src={Dean}
            alt='card'
          />

          <CardBody className='dark:text-gray-200'>
            <h1>Prof. Awudu Asare</h1>
            <h1>Dean, School of Business</h1>
          </CardBody>
        </Card>
        <Card
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
            src={Patron}
            width={150}
            height={20}
            alt='card'
          />
          <CardBody className='dark:text-gray-200'>
            <h1>Dr. John Akpare</h1>
            <h1>Patron</h1>
          </CardBody>
        </Card>
        <Card
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
            src={Icon}
            width={150}
            height={20}
            alt='card'
          />
          <CardBody className='dark:text-gray-200'>
            <h1>Patron</h1>
          </CardBody>
        </Card>
        <Card
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
            src={Icon}
            width={150}
            height={20}
            alt='card'
          />
          <CardBody className='dark:text-gray-200'>
            <h1>HOD</h1>
          </CardBody>
        </Card> */}
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

        {/* <Card
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
            src={Vice}
            width={150}
            height={20}
            alt='card'
          />
          <CardBody className='dark:text-gray-200'>
            <h1>Simon Ambion</h1>
            <h1>Vice President</h1>
          </CardBody>
        </Card>
        <Card
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
            src={FinancialSec}
            width={150}
            height={20}
            alt='card'
          />
          <CardBody className='dark:text-gray-200'>
            <h1>Anonomous</h1>
            <h1>Financial Secretary</h1>
          </CardBody>
        </Card>
        <Card
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
            src={Treasurer}
            width={150}
            height={20}
            alt='card'
          />
          <CardBody className='dark:text-gray-200'>
            <h1>Anonomous</h1>
            <h1>Financial Treasurer</h1>
          </CardBody>
        </Card>
        <Card
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
            src={Organiser}
            width={150}
            height={20}
            alt='card'
          />

          <CardBody className='dark:text-gray-200'>
            <h1>Anonomous</h1>
            <h1>Organiser</h1>
          </CardBody>
        </Card>
        <Card
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
            src={Genearal}
            width={150}
            height={20}
            alt='card'
          />
          <CardBody className='dark:text-gray-200'>
            <h1>Anonomous</h1>
            <h1>General Secretary</h1>
          </CardBody>
        </Card>
        <Card
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
            src={PRO}
            width={150}
            height={20}
            alt='card'
          />
          <CardBody className='dark:text-gray-200'>
            <h1>Anonomous</h1>
            <h1>PRO</h1>
          </CardBody>
        </Card>
        <Card
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
            src={Wocom}
            width={150}
            height={20}
            alt='card'
          />
          <CardBody className='dark:text-gray-200'>
            <h1>Anonomous</h1>
            <h1>Wocom</h1>
          </CardBody>
        </Card> */}
      </div>
    </>
  );
};

export default ChangePassword;
