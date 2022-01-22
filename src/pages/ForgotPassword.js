import React, { useState } from "react";

import ImageLight from "../assets/img/forgot-password-office.jpeg";
import ImageDark from "../assets/img/forgot-password-office-dark.jpeg";
import { Label, Input, Button, Card, CardBody } from "@windmill/react-ui";
import axios from "axios";
import auth from "../auth";
import { Checkmark } from "react-checkmark";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [showText, setText] = useState(null);
  const [sent, setSent] = useState(false);
  const handleSubmit = () => {
    axios
      .post(
        "http://localhost:3000/forgot-password",
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data === "Email does not exist") {
          setText(true);
          return;
        }
        auth.reset(() => {
          setText(false);
          console.log(res.data);
          setSent(true);
          console.log(auth.isReset());
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900'>
      <div className='flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800'>
        {!sent ? (
          <div className='flex flex-col overflow-y-auto md:flex-row'>
            <div className='h-32 md:h-auto md:w-1/2'>
              <img
                aria-hidden='true'
                className='object-cover w-full h-full dark:hidden'
                src={ImageLight}
                alt='Office'
              />
              <img
                aria-hidden='true'
                className='hidden object-cover w-full h-full dark:block'
                src={ImageDark}
                alt='Office'
              />
            </div>
            <main className='flex items-center justify-center p-6 sm:p-12 md:w-1/2'>
              <div className='w-full'>
                <h1 className='mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200'>
                  Forgot password
                </h1>

                <Label>
                  <span>Email</span>
                  <Input
                    className='mt-1'
                    placeholder='example@gmail.com'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Label>

                <Button block className='mt-4' onClick={handleSubmit}>
                  Recover password
                </Button>
                <p
                  style={{
                    color: "red",
                    display: !showText ? "none" : "block",
                  }}>
                  Email does not exist
                </p>
              </div>
            </main>
          </div>
        ) : (
          <Card>
            <CardBody>
              <p className='mb-4 font-semibold text-gray-600 dark:text-gray-300'>
                Email sent
              </p>
              <p className='text-gray-600 dark:text-gray-400'>
                A one time link has been sent to your email. Please check your
                email. If you didnt receive any email check your spam. Please
                note the link will expire in 30 minutes.
              </p>
              <Checkmark />
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
