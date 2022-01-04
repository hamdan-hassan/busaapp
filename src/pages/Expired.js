import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@windmill/react-ui";
import Expired from "../assets/img/expired.png";

function ResetPassword() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}>
      <img
        src={Expired}
        alt=''
        width='150px'
        height='150px'
        style={{ marginTop: "150px" }}
      />
      <h1 style={{ fontSize: "30px" }}>Oops the Link has expired</h1>
      <Button tag={Link} to='/'>
        Go Back to Login
      </Button>
    </div>
  );
}

export default ResetPassword;
