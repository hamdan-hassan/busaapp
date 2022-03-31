import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Admin = lazy(() => import("../pages/Admin.js"));
const Article = lazy(() => import("../pages/Article"));
const Stats = lazy(() => import("../pages/Statistics.js"));
const Complains = lazy(() => import("../pages/Complains"));

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
        path: "/stats", // the url
        component: Stats, // view rendered
    },
    {
        path: "/article", // the url
        component: Article, // view rendered
    },

    {
        path: "/complains",
        component: Complains,
    },

];

export default routes;
