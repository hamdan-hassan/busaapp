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
    path: "/app/article",
    icon: "FormsIcon",
    name: "Article",
  },
  {
    path: "/app/stats",
    icon: "Stats",
    name: "Statistics",
  },
  {
    path: "/app/upload-handouts",
    icon: "Handout",
    name: "Upload Handouts",
  },
  {
    path: "/app/upload-past-questions",
    icon: "Questions",
    name: "Upload Past Questions",
  },
  {
    path: "/app/uploadids",
    icon: "IDs",
    name: "Upload Student IDs",
  },
];

export default routes;
