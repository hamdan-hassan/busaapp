import React from "react";
import routes from "../../routes/sidebar";
import routes2 from "../../adminroutes/sidebar";
import routes3 from '../../hodroutes/sidebar'

import { Link, NavLink, Route } from "react-router-dom";
import * as Icons from "../../icons";
import SidebarSubmenu from "./SidebarSubmenu";
import { Button, Avatar } from "@windmill/react-ui";
import Logo from "../../assets/img/logo.png";

function Icon({ icon, ...props }) {
  const Icon = Icons[icon];
  return <Icon {...props} />;
}

function SidebarContent() {
  return (
    <div className='py-4 text-gray-500 dark:text-gray-400'>
      <Link to='/app'>
        <div className='ml-6 text-lg font-bold text-gray-800 dark:text-gray-200'>
          <Avatar
            className='align-middle mr-3'
            src={Logo}
            alt=''
            aria-hidden='true'
          />
          BUSA
          <div className="text-sm">2021/2022 Administration</div>
        </div>
      </Link>
      <ul className='mt-6'>
        {(window.localStorage.getItem("auth") ? routes : (window.localStorage.getItem("role") === 'admin') ? routes2 : routes3).map((route) =>
          route.routes ? (
            <SidebarSubmenu route={route} key={route.name} />
          ) : (
            <li className='relative px-6 py-3' key={route.name}>
              <NavLink
                exact
                to={route.path}
                className='inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200'
                activeClassName='text-gray-800 dark:text-gray-100'>
                <Route path={route.path} exact={route.exact}>
                  <span
                    style={{ background: "green" }}
                    className='absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg'
                    aria-hidden='true'></span>
                </Route>
                <Icon
                  className='w-5 h-5'
                  aria-hidden='true'
                  icon={route.icon}
                />
                <span className='ml-4'>{route.name}</span>
              </NavLink>
            </li>
          )
        )}
      </ul>
      <div className='px-6 my-6'>
        <Link to='/login'>
          {" "}
          <Button
            style={{ background: "green" }}
            onClick={() => {
              window.localStorage.removeItem("auth") ||
                window.localStorage.removeItem("admin");

              window.localStorage.removeItem("role")
              window.localStorage.removeItem("receiver")
              window.localStorage.removeItem("id");
              window.localStorage.removeItem("level");
            }}>
            Logout
          </Button>
        </Link>
      </div>
      
    </div>
  );
}

export default SidebarContent;
