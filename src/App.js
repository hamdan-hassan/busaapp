import React, { lazy } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";
import ProtectedExpired from "./ProtectedExpired";
import ProtectedRoute from "./ProtectedRoute";
import { UserDetailsContextProvider } from "./context/UserDetailsContext";

const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));
const Page404 = lazy(() => import("./pages/404"));
const CreateAccount = lazy(() => import("./pages/CreateAccount"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword.js"));
const Expired = lazy(() => import("./pages/Expired.js"));

function App() {
  return (
    <>
      <UserDetailsContextProvider>
        <Router>
          <AccessibleNavigationAnnouncer />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/create-account" component={CreateAccount} />
            <Route path="/forgot-password" component={ForgotPassword} />
            {window.localStorage.getItem("reset") && (
              <Route path="/reset/:id/:token" component={ResetPassword} />
            )}

            <ProtectedExpired path={"/expired-link"} component={Expired} />
            <ProtectedRoute path="/app" component={Layout} />

            <Redirect exact from="/" to="/login" />
            <Route path="*" component={Page404} />
          </Switch>
        </Router>
      </UserDetailsContextProvider>
    </>
  );
}

export default App;
