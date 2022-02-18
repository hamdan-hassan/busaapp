import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Registration = lazy(() => import("../pages/Registration"));
const Profile = lazy(() => import("../pages/Profile"));
const Dues = lazy(() => import("../pages/Dues"));
const Souverniers = lazy(() => import("../pages/Souverniers"));
const Page404 = lazy(() => import("../pages/404"));
const Announcements = lazy(() => import("../pages/Announcements.js"));
const ChangePassword = lazy(() => import("../pages/ChangePassword.js"));
const Handouts = lazy(() => import("../pages/Handouts"));
const PastQuestions = lazy(() => import("../pages/PastQuestions"));
const Messages = lazy(() => import("../pages/Messages"));

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/registration",
    component: Registration,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/dues",
    component: Dues,
  },
  {
    path: "/souverniers",
    component: Souverniers,
  },
  {
    path: "/announcements",
    component: Announcements,
  },
  {
    path: "/executivesandpatrons",
    component: ChangePassword,
  },
  {
    path: "/handouts",
    component: Handouts,
  },
  {
    path: "/past-questions",
    component: PastQuestions,
  },
  {
    path: "/messages",
    component: Messages,
  },

  {
    path: "/404",
    component: Page404,
  },
];

export default routes;
