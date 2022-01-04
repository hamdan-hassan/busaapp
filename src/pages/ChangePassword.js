import React, { useState } from "react";

import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import { Input, Label, HelperText } from "@windmill/react-ui";
import { Checkmark } from "react-checkmark";

import Modal from "./Modal";
import axios from "axios";
import { UserDetails } from "../userDetails";

const ChangePassword = () => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [wrongPass, setWrongPass] = useState(false);
  const [passMatch, setPassMatch] = useState(false);
  const [updated, setUpdated] = useState(false);

  const handleUpdate = () => {
    axios
      .put(
        "http://localhost:3000/updatePassword",
        {
          id: UserDetails.studentId,
          password: oldPass,
          newPass: newPass,
          confirmPass: confirmPass,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        console.log(res);
        if (res.data === "wrong") {
          setWrongPass(false);
          return setPassMatch(true);
        }
        if (res.data === "wrong password") {
          setPassMatch(false);
          return setWrongPass(true);
        }
        if (res.data === "updated") {
          setWrongPass(false);
          setPassMatch(false);
          setUpdated(true);
          setTimeout(() => {
            setUpdated(false);
          }, 5000);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <PageTitle>Change Password</PageTitle>

      <SectionTitle>Enter Details</SectionTitle>

      <div className='px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800'>
        <Label>
          <span>Old Password</span>
          <Input
            type='password'
            className='mt-1'
            placeholder='*****'
            onChange={(e) => setOldPass(e.target.value)}
          />
        </Label>
        <Label>
          <span> New Password</span>
          <Input
            type='password'
            className='mt-1'
            placeholder='******'
            onChange={(e) => setNewPass(e.target.value)}
          />
        </Label>
        <Label>
          <span>Confirm New Password</span>
          <Input
            type='password'
            className='mt-1'
            placeholder='******'
            onChange={(e) => setConfirmPass(e.target.value)}
          />
        </Label>
        <HelperText valid={false}>
          {passMatch && "Password do not match"}
        </HelperText>
        <Label>
          <Label>
            <HelperText valid={false}>
              {wrongPass && "Wrong old Password"}
            </HelperText>
          </Label>
          <Modal handleClick={handleUpdate} ModalTitle={"Update"} />
        </Label>
        {updated && (
          <Label className='mt-4'>
            <Checkmark />
          </Label>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
