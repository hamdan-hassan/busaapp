/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
    {
        path: "/app/dashboard", // the url
        icon: "HomeIcon", // the component being exported from icons/index.js
        name: "Dashboard", // name that appear in Sidebar
    },
    {
        path: "/app/admin",
        icon: "Admin",
        name: "Admin",
    },

    {
        path: "/app/stats",
        icon: "Stats",
        name: "Statistics",
    },
    {
        path: "/app/upload-article",
        icon: "FormsIcon",
        name: "Article",
    },

    {
        path: "/app/complains",
        icon: "Complain",
        name: "Complains",
    },

];

export default routes;
