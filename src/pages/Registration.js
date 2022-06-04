import React, { useState, useLayoutEffect } from "react";
import Confetti from "react-confetti";

import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import { Input, Label, Select, HelperText } from "@windmill/react-ui";
import { Checkmark } from "react-checkmark";
import TextAnimation from "../animations/TextAnimation";
import Loader from "../loader/loader";
import Modal from "./Modal";
import {baseUrl} from '../api/busa-api.js'
import axios from "axios";
import { UserDetails } from "../userDetails";

function Registration() {
  const [loading,setLoading] = useState(true)
  const [fName, setFName] = useState("");
  const [MName, setMName] = useState("");
  const [lName, setLName] = useState("");
  const [studId, setStudId] = useState("");
  const [gender, setGender] = useState("Male");
  const [size, setSize] = useState("Small");
  const [resgisterd, setRegistered] = useState(false);
  const [wrongId, setWrongId] = useState(false);
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(false);

  useLayoutEffect(() => {
    axios
      .get(`${baseUrl.baseUrl}/isRegistered/` + UserDetails.studentId)
      .then((res) => {
        setUserName(res.data[0].first_name);
        if (res.data[0].registered === "true") {
          setRegistered(true);

        }
        setLoading(false)
      })
      .catch((err) => console.log(err));
  }, []);

  let isValid = false;
  const handleSubmit = () => {
    if (
      /^ *$/.test(fName) ||
      /^ *$/.test(lName) ||
      studId.length === 0 ||
      gender.length === 0 ||
      0
    ) {
      return setError(true);
    }

    if (studId === UserDetails.studentId) {
      isValid = true;
      setRegistered(true);
    }

    console.log(isValid);

    axios
      .put(
        `${baseUrl.baseUrl}/register`,
        {
          FirstName: fName,
          MiddleName: MName,
          LastName: lName,
          StudentID: studId,
          Level: UserDetails.level,
          Gender: gender,
          Size: UserDetails.level === 100 ? size : "",
          isValid: isValid,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data === "wrong id") {
          return setWrongId(true);
        }
        setUserName(fName);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
    {loading && <Loader />}
      {!loading && (resgisterd ? (
              <div style={{ marginTop: "60px" }}>
                <h1
                  className='dark:text-gray-200'
                  style={{
                    fontSize: 30,
                    textAlign: "center",
                    fontFamily: '"Pacifico", cursive',
                  }}>
                  Congratulations, you are now a member
                </h1>
                <Checkmark size='xxLarge' />
                <h1
                  className='dark:text-gray-200'
                  style={{
                    fontFamily: '"Pacifico", cursive',
                    fontSize: 30,
                    textAlign: "center",
                    marginTop: "15px",
                  }}>
                  {`Hello, ${userName} Welcome to Busa`}
                </h1>
                <TextAnimation />
                <Confetti />
              </div>
            ) : (
              <div>
                <PageTitle>Register Membership</PageTitle>
      
                <SectionTitle>Enter Details</SectionTitle>
      
                <div className='px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800'>
                  <Label>
                    <span>First Name</span>
                    <Input
                      className='mt-1'
                      placeholder='Jane'
                      onChange={(e) => setFName(e.target.value)}
                    />
                  </Label>
                  <Label>
                    <span>Middle Name (Optional)</span>
                    <Input
                      className='mt-1'
                      placeholder=''
                      onChange={(e) => setMName(e.target.value)}
                    />
                  </Label>
                  <Label>
                    <span>Last Name</span>
                    <Input
                      className='mt-1'
                      placeholder='Doe'
                      onChange={(e) => setLName(e.target.value)}
                    />
                  </Label>
                  <Label>
                    <span>Student ID</span>
                    <Input
                      className='mt-1'
                      placeholder='UGxxxxxx'
                      onChange={(e) => setStudId(e.target.value.toUpperCase())}
                    />
                  </Label>
                  <HelperText valid={false}>
                    {wrongId && "Student id do not match"}
                  </HelperText>
      
                  <Label className='mt-4'>
                    <span>Select Gender</span>
                    <Select
                      className='mt-1'
                      onChange={(e) => setGender(e.target.value)}>
                      <option>Male</option>
                      <option>Female</option>
                    </Select>
                  </Label>
                  {UserDetails.level === 100 && <Label className='mt-4'>
                    <span>Select T-Shirt size</span>
                    <Select
                      className='mt-1'
                      onChange={(e) => setSize(e.target.value)}>
                      <option>Small</option>
                      <option>Medium</option>
                      <option>Large</option>
                      <option>X-Large</option>
                      <option>XX-Large</option>
                    </Select>
                    <HelperText valid={false}>
                      PLease choose your tshirt size wisely as it cannot be edited
                      later
                    </HelperText>
                  </Label>}
                  <Label>
                    <Modal
                      ModalTitle={"Register"}
                      ModalHead={"Details Confirmation"}
                      ModalContent={
                        "Please confirm all details are correct before submission."
                      }
                      handleClick={handleSubmit}
                    />
                  </Label>
                  <HelperText valid={false}>
                    {error && "Please dont leave any field empty"}
                  </HelperText>
                </div>
              </div>
            ))}
    </>
  );
}

export default Registration;
