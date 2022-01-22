import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Logo from "../assets/img/logo.png";

import axios from "axios";
import { Checkmark } from "react-checkmark";
import { Label, Input, Button } from "@windmill/react-ui";

import Auth from "../auth";

function ResetPassword() {
  const { id, token } = useParams();
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showText, setText] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [minPass, setMinPass] = useState(false);
  let history = useHistory();

  const handleSubmit = () => {
    if (newPass === confirmPass) {
      if (newPass.length < 6) {
        return setMinPass(true);
      }

      axios
        .post(`http://localhost:3000/reset/${id}/${newPass}/${token}`)
        .then((res) => {
          if (res.data === "expired") {
            Auth.expired(() => {
              history.push("/expired-link");
            });

            return;
          }
          setText(false);
          setUpdated(true);
          window.localStorage.removeItem("reset");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setText(true);
    }
  };

  return (
    <div className='flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900'>
      {!updated ? (
        <div className='flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800'>
          <div className='flex flex-col overflow-y-auto md:flex-row'>
            <div className='h-32 md:h-auto md:w-1/2'>
              <img
                aria-hidden='true'
                className='object-cover w-full h-full'
                src={Logo}
                alt='Office'
              />
            </div>
            <main className='flex items-center justify-center p-6 sm:p-12 md:w-1/2'>
              <div className='w-full'>
                <h1 className='mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200'>
                  Reset Password
                </h1>
                <Label>
                  <span>New Password</span>
                  <Input
                    className='mt-1'
                    type='password'
                    placeholder='***************'
                    onChange={(e) => setNewPass(e.target.value)}
                  />
                </Label>

                <Label className='mt-4'>
                  <span>Confirm Password</span>
                  <Input
                    className='mt-1'
                    type='password'
                    placeholder='***************'
                    onChange={(e) => setConfirmPass(e.target.value)}
                  />
                </Label>

                <Button className='mt-4' block onClick={handleSubmit}>
                  Reset
                </Button>

                <p
                  style={{
                    color: "red",
                    display: !showText ? "none" : "block",
                  }}>
                  Password do not match
                </p>
                <p
                  style={{
                    color: "red",
                    display: !minPass ? "none" : "block",
                  }}>
                  Password should be at least 6 characters long
                </p>
              </div>
            </main>
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <h1 style={{ marginBottom: "20px", fontSize: 30 }}>
            Password updated
          </h1>
          <Checkmark size='xxLarge' />
          <Button style={{ marginTop: "20px" }} tag={Link} to='/'>
            Back to Login
          </Button>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
