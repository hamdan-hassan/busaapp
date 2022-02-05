import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../context/SidebarContext";
import Male from "../assets/img/male.png";
import Female from "../assets/img/female.png";
import {
  MoonIcon,
  SunIcon,
  MenuIcon,
  OutlinePersonIcon,
  OutlineLogoutIcon,
} from "../icons";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  WindmillContext,
} from "@windmill/react-ui";

import { Link } from "react-router-dom";
import axios from "axios";
import { UserDetails } from "../userDetails";

function Header() {
  const { mode, toggleMode } = useContext(WindmillContext);
  const { toggleSidebar } = useContext(SidebarContext);
  const [img, setimg] = useState("");

  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
  }

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }

  useEffect(() => {
    axios
      .post(
        "http://localhost:3000/api/img",
        {
          Id: UserDetails.studentId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.length > 0) {
          setimg(res.data[0].img_data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <header className='z-40 py-4 bg-white shadow-bottom dark:bg-gray-800'>
      <div className='container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300'>
        {/* <!-- Mobile hamburger --> */}
        <button
          className='p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple'
          onClick={toggleSidebar}
          aria-label='Menu'>
          <MenuIcon className='w-6 h-6' aria-hidden='true' />
        </button>
        {/* <!-- Search input --> */}
        <div className='flex justify-center flex-1 lg:mr-32'></div>
        <ul className='flex items-center flex-shrink-0 space-x-6'>
          {/* <!-- Theme toggler --> */}
          <li className='flex'>
            <button
              className='rounded-md focus:outline-none focus:shadow-outline-purple'
              onClick={toggleMode}
              aria-label='Toggle color mode'>
              {mode === "dark" ? (
                <SunIcon className='w-5 h-5' aria-hidden='true' />
              ) : (
                <MoonIcon className='w-5 h-5' aria-hidden='true' />
              )}
            </button>
          </li>

          {/* <!-- Profile menu --> */}
          <li className='relative'>
            <button
              className='rounded-full focus:shadow-outline-purple focus:outline-none'
              onClick={handleProfileClick}
              aria-label='Account'
              aria-haspopup='true'>
              <Avatar
                className='align-middle'
                src={img || (UserDetails.gender !== "Male" ? Male : Female)}
                alt=''
                aria-hidden='true'
              />
            </button>
            <Dropdown
              align='right'
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}>
              <DropdownItem tag='a'>
                <OutlinePersonIcon
                  className='w-4 h-4 mr-3'
                  aria-hidden='true'
                />
                <Link to='/app/profile'>
                  <span>Profile</span>
                </Link>
              </DropdownItem>

              <DropdownItem>
                <OutlineLogoutIcon
                  className='w-4 h-4 mr-3'
                  aria-hidden='true'
                />
                <Link
                  to='/login'
                  onClick={() => {
                    window.localStorage.removeItem("auth") ||
                      window.localStorage.removeItem("admin");

                    window.localStorage.removeItem("id");
                    window.localStorage.removeItem("level");
                  }}>
                  {" "}
                  <span>Log out</span>
                </Link>
              </DropdownItem>
            </Dropdown>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
