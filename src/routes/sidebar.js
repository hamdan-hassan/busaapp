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
    path: "/app/registration",
    icon: "FormsIcon",
    name: "Registration",
  },
  {
    path: "/app/profile",
    icon: "Profile",
    name: "Profile",
  },
  {
    path: "/app/dues",
    icon: "Due",
    name: "Dues",
  },
  {
    path: "/app/souverniers",
    icon: "Gift",
    name: "Sourverniers",
  },
  {
    path: "/app/announcements",
    icon: "Announcements",
    name: "Announcements",
  },
  {
    path: "/app/change-password",
    icon: "Password",
    name: "Change Password",
  },
  {
    path: "/app/handouts",
    icon: "Handout",
    name: "Handouts",
  },
  {
    path: "/app/past-questions",
    icon: "Questions",
    name: "Past Questions",
  },
];

export default routes;
