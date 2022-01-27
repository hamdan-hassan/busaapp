import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Logo from "../assets/img/logo.png";
import auth from "../auth";
import { UserDetails } from "../userDetails";
import Loader from "../loader/loader";
import axios from "axios";

import { Label, Input, Button } from "@windmill/react-ui";
import Particles from "react-tsparticles";

function Login() {
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const [showText, setText] = useState(null);
  const handleSubmit = () => {
    setLoading(true);
    axios
      .post(
        "http://localhost:3000/api/login",
        {
          email: email.toLowerCase(),
          password: pass,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data === "not found") {
          setLoading(false);
          return setText(true);
        }
        if (response.data.role === "admin") {
          auth.admin(() => {
            history.push("/app");
          });
        } else {
          auth.login(() => {
            console.log(response);
            window.localStorage.setItem("id", response.data[0].std_id);
            window.localStorage.setItem("level", response.data[0].level);
            UserDetails.studentId = response.data[0].std_id;
            UserDetails.level = response.data[0].level;

            history.push("/app");
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
        setText(true);
      });
  };
  return (
    <div
      className='flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900'
      style={{
        background: "linear-gradient(89deg, #02aab0 0%, #00cdac 100%)",
      }}>
      <Particles
        className='particles'
        id='tsparticles'
        options={{
          fpsLimit: 100,
          interactivity: {
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
              },
              push: {
                quantity: 2,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },

            move: {
              direction: "none",
              enable: true,
              outMode: "out",
              random: false,
              speed: 1,
              straight: false,
            },

            number: {
              density: {
                enable: true,
                value_area: 900,
              },
              value: 90,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 5,
            },
          },
          detectRetina: true,
        }}
      />
      <div className='flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800'>
        <div className='flex flex-col overflow-y-auto md:flex-row'>
          <div className='h-32 md:h-auto md:w-1/2'>
            <img
              aria-hidden='true'
              className='object-cover w-full h-full '
              src={Logo}
              alt='Office'
            />
          </div>
          <main className='flex items-center justify-center p-6 sm:p-12 md:w-1/2'>
            {!loading && (
              <div className='w-full'>
                <h1 className='mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200'>
                  Login
                </h1>
                <Label>
                  <span>Email</span>
                  <Input
                    className='mt-1'
                    type='email'
                    placeholder='example@gmail.com'
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  />
                </Label>

                <Label className='mt-4'>
                  <span>Password</span>
                  <Input
                    className='mt-1'
                    type='password'
                    placeholder='***************'
                    onChange={(e) => setPass(e.target.value)}
                  />
                </Label>

                <Button className='mt-4' block onClick={() => handleSubmit()}>
                  Log in
                </Button>

                <p
                  style={{
                    color: "red",
                    display: !showText ? "none" : "block",
                  }}>
                  Wrong Email or Password
                </p>

                <p className='mt-4'>
                  <Link
                    className='text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline'
                    to='/forgot-password'>
                    Forgot your password?
                  </Link>
                </p>
                <p className='mt-1'>
                  <Link
                    className='text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline'
                    to='/create-account'>
                    Create account
                  </Link>
                </p>
              </div>
            )}
            {loading && <Loader />}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Login;
