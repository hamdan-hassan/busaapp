import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Admin = lazy(() => import("../pages/Admin.js"));
const Article = lazy(() => import("../pages/Article"));
const Stats = lazy(() => import("../pages/Statistics.js"));
const UploadHandouts = lazy(() => import("../pages/UploadHandouts"));
const UploadPastQuestions = lazy(() => import("../pages/UpoadPastQuestions"));
const UploadIDs = lazy(() => import("../pages/UploadIDs"));
const UploadExecutivesAndPatrons = lazy(() =>
  import("../pages/UploadExecutivesAndPatrons")
);

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
    path: "/admin", // the url
    component: Admin, // view rendered
  },
  {
    path: "/article", // the url
    component: Article, // view rendered
  },
  {
    path: "/stats", // the url
    component: Stats, // view rendered
  },
  {
    path: "/upload-handouts", // the url
    component: UploadHandouts, // view rendered
  },
  {
    path: "/upload-past-questions", // the url
    component: UploadPastQuestions, // view rendered
  },

  {
    path: "/uploadids", // the url
    component: UploadIDs, // view rendered
  },
  {
    path: "/uploadexecutivesandpatrons",
    component: UploadExecutivesAndPatrons,
  },
];

export default routes;
