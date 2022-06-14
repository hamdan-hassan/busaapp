import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../context/SidebarContext";
import Male from "../assets/img/male.png";
import Female from "../assets/img/female.png";
import Logo from "../assets/img/logo.png";
import {
  MoonIcon,
  SunIcon,
  MenuIcon,
  OutlinePersonIcon,
  OutlineLogoutIcon,
  BellIcon,
} from "../icons";
import {
  Avatar,
  Badge,
  Dropdown,
  DropdownItem,
  WindmillContext,
} from "@windmill/react-ui";

import { Link } from "react-router-dom";
import axios from "axios";
import {baseUrl} from '../api/busa-api.js'
import { UserDetails } from "../userDetails";


function Header() {
  const [loading,setLoading] = useState(true)
  const { mode, toggleMode } = useContext(WindmillContext);
  const { toggleSidebar } = useContext(SidebarContext);
  const [img, setimg] = useState("");

  const [message, setMessage] = useState(0);
  // const [receiver, setReceiver] = useState("")
  const [newMessage, setNewMessage] = useState(false);
  const [complains, setComplains] = useState(0);


  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
  }

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }

  useEffect(() => {

    if (window.localStorage.getItem("role")) {

      switch (window.localStorage.getItem("role")) {

        case 'admin':
          window.localStorage.setItem("receiver", "Busa")
          break;
        case 'marketing':
          window.localStorage.setItem("receiver", "Department of Procurement and Marketing")
          break;
        case 'management':
          window.localStorage.setItem("receiver", "Department of Management Studies")
          break;
        case 'banking and finance':
          window.localStorage.setItem("receiver", "Department of Banking and Finance")
          break;
        case 'accountancy':
          window.localStorage.setItem("receiver", "Department of Accountancy")
          break;

      }

      axios
        .post(`${baseUrl.baseUrl}/get-complains-count`,
          {
            Receiver: window.localStorage.getItem("receiver")
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data)
          if (res.data[0].count > 0) {
            setNewMessage(true);
          }
          setimg(Logo)
          setLoading(false)
          setComplains(res.data[0].count);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    else {
      axios
        .post(
          `${baseUrl.baseUrl}/get-message-count`,
          { Id: UserDetails.studentId },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data[0].count > 0) {
            setNewMessage(true);
          }
          setMessage(res.data[0].count);

        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .post(
          `${baseUrl.baseUrl}/img`,
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
          setLoading(false)
        })
        .catch((err) => {
          console.log(err);
        });
    }

  }, []);

  const removeAdminNewMessage = () => {
    axios
      .delete(`${baseUrl.baseUrl}/remove-complains-count/` + window.localStorage.getItem("receiver"))
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeNewMessage = () => {
    axios
      .put(
        `${baseUrl.baseUrl}/reset-messages-count`,
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
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <header className='z-40 py-4 bg-white shadow-bottom dark:bg-gray-800 fixed w-full md:relative'>
      <div className='container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300'>
        {/* <!-- Mobile hamburger --> */}
        <button

          className='p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple'
          onClick={toggleSidebar}
          aria-label='Menu'>
          <MenuIcon
            style={{ color: "green" }}
            className='w-6 h-6' aria-hidden='true' />
        </button>
        {/* <!-- Search input --> */}
        <div className='flex justify-center flex-1 lg:mr-32'></div>
        <ul className='flex items-center flex-shrink-0 space-x-6'>
          {/* <!-- Notifications menu --> */}
          <li className='relative'>
            <button
              className='relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple'
              onClick={handleNotificationsClick}
              aria-label='Notifications'
              aria-haspopup='true'>
              <BellIcon
                style={{ color: "green" }}
                className='w-5 h-5' aria-hidden='true' />
              {/* <!-- Notification badge --> */}

              {newMessage && (
                <span
                  aria-hidden='true'
                  className='absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800'></span>
              )}
            </button>

            <Dropdown
              align='right'
              onClick={
                (window.localStorage.getItem("admin") &&
                  removeAdminNewMessage) ||
                (window.localStorage.getItem("auth") && removeNewMessage)
              }
              isOpen={isNotificationsMenuOpen}
              onClose={() => setIsNotificationsMenuOpen(false)}>
              <Link
                to={
                  (window.localStorage.getItem("auth") && "/app/messages") ||
                  (window.localStorage.getItem("admin") && "/app/complains")
                }>
                <DropdownItem className='justify-between'>
                  {window.localStorage.getItem("auth") && <span>Messages</span>}
                  {window.localStorage.getItem("admin") && (
                    <span>Complains</span>
                  )}
                  {window.localStorage.getItem("auth") && (
                    <Badge type='danger'>{message}</Badge>
                  )}
                  {window.localStorage.getItem("admin") && (
                    <Badge type='danger'>{complains}</Badge>
                  )}
                </DropdownItem>
              </Link>
            </Dropdown>
          </li>
          {/* <!-- Theme toggler --> */}
          <li className='flex'>
            <button
              className='rounded-md focus:outline-none focus:shadow-outline-purple'
              onClick={toggleMode}
              aria-label='Toggle color mode'>
              {mode === "dark" ? (
                <SunIcon className='w-5 h-5' aria-hidden='true' />
              ) : (
                <MoonIcon
                  style={{ color: "green" }}
                  className='w-5 h-5' aria-hidden='true' />
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
              {loading && <p>Loading...</p>}
              {!loading && <Avatar
                className='align-middle'
                src={img || (UserDetails.gender !== "Male" ? Female : Male)}
                alt=''
                aria-hidden='true'
              />}
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
                      window.localStorage.removeItem("admin") || window.localStorage.removeItem("role");
                    window.localStorage.removeItem("receiver")
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
