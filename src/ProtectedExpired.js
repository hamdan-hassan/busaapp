import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";

export const ProtectedExpired = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isExpired()) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
export default ProtectedExpired;
