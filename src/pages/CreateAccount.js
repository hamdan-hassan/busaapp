import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Logo from "../assets/img/ubids6.jpeg";
import axios from "axios";
import Loader from "../loader/loader";
import Particles from "react-tsparticles";

// import ImageDark from "../assets/img/create-account-office-dark.jpeg";

import { Input, Label, Button, Select, HelperText } from "@windmill/react-ui";

function CreateAccount() {
  const [fName, setFName] = useState("");
  const [MName, setMName] = useState("");
  const [lName, setLName] = useState("");
  const [studId, setStudId] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("Male");
  const [level, setLevel] = useState("100");
  const [programme, setProgramme] = useState("BCom(Human Resource Management)");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [programmeType, setProgrammeType] = useState("Degree")
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [wrongId, setWrongId] = useState(false);
  const [wrongEmail, setWrongEmail] = useState(false);
  const [wrongPhone, setWrongPhone] = useState(false);
  const [minPass, setMinPass] = useState(false);
  const [removeLevel, setRemoveLevel] = useState(false)
  const [exist, setExist] = useState(false);
  const [loading, setLoading] = useState(false);
  const emailValidation =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  // const idValidation = /^(UG0|UD0)[0-9]{4}(19|20|21|22)$/i;
  const phoneValidation = /^[0-9]{10}$/;

  let history = useHistory();

  const handleSubmit = () => {
    setError(false);
    setWrongEmail(false);
    setWrongId(false);
    setExist(false);
    setWrongPhone(false);
    setLoading(true);
    if (
      /^ *$/.test(fName) ||
      /^ *$/.test(lName) ||
      studId.length === 0 ||
      dob.length === 0 ||
      gender.length === 0 ||
      level.length === 0 ||
      programme.length === 0 ||
      phone.length === 0 ||
      email.length === 0 ||
      password.length === 0
    ) {
      setLoading(false);
      return setError(true);
    }

    // if (idValidation.test(studId) === false) {
    //   setError(true);
    //   return setWrongId(true);
    // }

    if (emailValidation.test(email) === false) {
      setLoading(false);
      setError(true);
      return setWrongEmail(true);
    }

    if (phoneValidation.test(phone) === false) {
      setLoading(false);
      setError(true);
      return setWrongPhone(true);
    }
    if (password.length < 6) {
      setLoading(false);
      return setMinPass(true);
    }

    if (email === 'info.busa99@gmail.com'
    ) {
      setLoading(false)
      return setExist(true)
    }

    if (email === 'd.accountancy@gmail.com') {
      setLoading(false)
      return setExist(true)
    }

    if (email === 'd.bankingfinance@gmail.com') {
      setLoading(false)
      return setExist(true)
    }

    if (email === 'd.management@gmail.com') {
      setLoading(false)
      return setExist(true)
    }

    if (email === 'd.marketing@gmail.com') {
      setLoading(false)
      return setExist(true)
    }
    axios
      .post(
        "http://localhost:3000/api/validateid",
        {
          ID: studId,

        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {

        if (res.data === "false") {
          setLoading(false);
          setError(true);
          return setWrongId(true);
        } else {

          axios
            .post(
              "http://localhost:3000/api/create-account",
              {
                FirstName: fName,
                MiddleName: MName,
                LastName: lName,
                StudentID: studId,
                DateOfBirth: dob,
                Gender: gender,
                Level: level,
                PhoneNumber: phone,
                Email: email,
                Password: password,
                Programme: programme,
                ProgrammeType: programmeType
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then((response) => {
              if (response.data === "already exist") {
                setLoading(false);
                return setExist(true);
              }
              setLoading(false);
              window.localStorage.setItem("level", level);
              window.localStorage.setItem("gender", gender);
              history.push("/login");
              setError(false);
              axios
                .post(
                  "http://localhost:3000/api/create-profile-img",
                  { StudentID: studId, Level: level, ProgrammeType: programmeType },
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                )
                .then((res) => {
                  setLoading(false);
                  console.log(res);
                })
                .catch((err) => {
                  setLoading(false);
                  console.log(err);
                });

              axios
                .post(
                  "http://localhost:3000/api/create-registration",
                  {
                    FirstName: fName,
                    MiddleName: MName,
                    LastName: lName,
                    StudentID: studId,
                    Gender: gender,
                    Level: level,
                    ProgrammeType: programmeType
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                )
                .then((res) => {
                  setLoading(false);
                  console.log(res);
                })
                .catch((err) => {
                  setLoading(false);
                  console.log(err);
                });
            })
            .catch((error) => {
              setLoading(false);
              setError(true);
              console.log(error);
            });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
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
          <div className='h-25 md:h-auto md:w-1/2'>
            <img
              aria-hidden='true'
              className='object-cover w-full h-full'
              src={Logo}
              alt='Office'
            />
          </div>
          <main className='flex items-center justify-center p-6 sm:p-12 md:w-1/2'>
            {!loading && (
              <div className='w-full'>
                <h1 className='mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200'>
                  Create account
                </h1>
                <Label>
                  <span>First Name</span>
                  <Input
                    className='mt-1'
                    value={fName}
                    required
                    type='text'
                    placeholder='John'
                    onChange={(e) => setFName(e.target.value)}
                  />
                </Label>
                <Label>
                  <span>Middle Name (Optional)</span>
                  <Input
                    className='mt-1'
                    value={MName}
                    type='text'
                    placeholder=''
                    onChange={(e) => setMName(e.target.value)}
                  />
                </Label>
                <Label>
                  <span>Last Name</span>
                  <Input
                    className='mt-1'
                    value={lName}
                    type='text'
                    placeholder='Doe'
                    onChange={(e) => setLName(e.target.value)}
                  />
                </Label>
                <Label>
                  <span>Student ID</span>
                  <Input
                    className='mt-1'
                    value={studId}
                    type='text'
                    placeholder='UGxxxxx'
                    onChange={(e) =>
                      setStudId(e.target.value.toUpperCase().trim())
                    }
                  />
                </Label>
                <HelperText valid={false}>
                  {wrongId &&
                    `Student ID ${studId} not found.`}
                </HelperText>
                <Label>
                  <span>Date of Birth</span>
                  <Input
                    className='mt-1'
                    value={dob}
                    type='date'
                    placeholder='john@doe.com'
                    onChange={(e) => setDob(e.target.value)}
                  />
                </Label>
                <Label className='mt-4'>
                  <span>Select Gender</span>
                  <Select
                    value={gender}
                    className='mt-1'
                    onChange={(e) => setGender(e.target.value)}>
                    <option>Male</option>
                    <option>Female</option>
                  </Select>
                </Label>
                <Label className='mt-4'>
                  <span>Select Level</span>
                  <Select
                    value={level}
                    className='mt-1'
                    onChange={(e) => setLevel(e.target.value)}>
                    <option>100</option>
                    <option>200</option>
                    {!removeLevel && <option>300</option>}
                    {!removeLevel && <option>400</option>}
                  </Select>
                </Label>
                <Label className='mt-4'>
                  <span>Select Programme</span>
                  <Select
                    value={programme}
                    className='mt-1'
                    onChange={(e) => {

                      setProgramme(e.target.value)
                      if (e.target.value !== "Diploma in Business Studies") {
                        setProgrammeType("Degree")
                        setRemoveLevel(false)
                      }
                      else {
                        setProgrammeType("Diploma")
                        setRemoveLevel(true)
                      }
                    }}>
                    <option>BCom(Human Resource Management)</option>
                    <option>BCom(Accounting)</option>
                    <option>BCom(Banking and Finance)</option>
                    <option>BCom(Marketing)</option>
                    <option>BCom(Procurement and Supply Chain Management)</option>
                    <option>Bsc Accounting</option>
                    <option>Bsc Accounting and Finance</option>
                    <option>BA Management</option>
                    <option>Diploma in Business Studies</option>
                  </Select>
                </Label>
                <Label>
                  <span>Phone Number</span>
                  <Input
                    value={phone}
                    className='mt-1'
                    type='number'
                    placeholder='0547645986'
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Label>
                <HelperText valid={false}>
                  {wrongPhone && "Please enter a valid Phone number"}
                </HelperText>
                <Label>
                  <span>Email</span>
                  <Input

                    className='mt-1'
                    type='email'
                    placeholder='example@gmail.com'
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  />
                </Label>
                <HelperText valid={false}>
                  {wrongEmail && "Please enter a valid email"}
                </HelperText>
                <Label className='mt-4'>
                  <span>Password</span>
                  <Input
                    value={password}
                    className='mt-1'
                    placeholder='***************'
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <HelperText valid={false}>
                    {minPass && "Password have atleast 6 characters"}
                  </HelperText>
                </Label>
                <HelperText valid={false}>
                  {error && "Please fill in your information correctly"}
                </HelperText>
                <HelperText valid={false}>
                  {exist && "Email or Student ID already exist"}
                </HelperText>

                <Button
                  style={{ background: "green" }}
                  block
                  className='mt-4'
                  onClick={() =>
                    handleSubmit(
                      fName,
                      MName,
                      lName,
                      studId,
                      dob,
                      gender,
                      level,
                      programme,
                      phone,
                      email,
                      password
                    )
                  }>
                  Create account
                </Button>

                <hr className='my-8' />

                <p className='mt-4'>
                  <Link
                    className='text-sm font-medium text-green-600 dark:text-green-400 hover:underline'
                    to='/login'>
                    Already have an account? Login
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

export default CreateAccount;
