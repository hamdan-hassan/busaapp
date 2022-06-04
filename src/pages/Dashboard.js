import React, { useState, useEffect } from "react";

import Souvenirs from "../assets/img/souvenirs2.png";
import Cedis from "../assets/img/cedis2.png";
import Stats from "../assets/img/statistics.png";
import ID from "../assets/img/images_600x600.png";
import Members from "../assets/img/members.svg";
import Article from "../assets/img/article.png";
import Executives from "../assets/img/executives.png";
import Register from "../assets/img/register1.png";
import User from "../assets/img/user2.png";
import Announcements from "../assets/img/announcements.png";
import Handout from "../assets/img/handout.png";
import Question from "../assets/img/question.png";
import Complains from "../assets/img/complains.png";
import PageTitle from "../components/Typography/PageTitle";

import Card from "../components/Card/Card";
import {baseUrl} from '../api/busa-api.js'
import axios from "axios";

function Dashboard() {
  const [complains, setComplains] = useState(0);
  const [receiver, setReceiver] = useState("")

  useEffect(() => {
    if (window.localStorage.getItem("role")) {

      switch (window.localStorage.getItem("role")) {

        case 'admin':
          setReceiver("Busa")
          break;
        case 'marketing':
          setReceiver("Department of Procurement and Marketing")
          break;
        case 'management':
          setReceiver("Department of Management Studies")
          break;
        case 'banking and finance':
          setReceiver("Department of Banking and Finance")
          break;
        case 'accountancy':
          setReceiver("Department of Accountancy")
          break;

      }

      axios
        .post(`${baseUrl.baseUrl}/get-complains-count`,
          {
            Receiver: receiver
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          const result = res.data[0].count;
          setComplains(result);
          console.log(result)

        })
        .catch((err) => {
          console.log(err);
        });

    }


  });

  const removeNewMessage = () => {
    axios
      .delete(`${baseUrl.baseUrl}/remove-complains-count/` + receiver)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <PageTitle>Dashboard</PageTitle>

      {/* <!-- Cards --> */}
      {



        window.localStorage.getItem("admin") ? (

          (window.localStorage.getItem("role") === 'admin' ? <div className='grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4'>
            <Card
              image={Members}
              title='Registered Students'
              link='/app/admin'
            />
            <Card
              image={Article}
              title='Publish an article'
              link='/app/article'
            />
            <Card image={Stats} title='View Students Stats' link='/app/stats' />
            <Card
              image={Handout}
              title='Upload Handouts'
              link='/app/upload-handouts'
            />
            <Card
              image={Question}
              title='Upload Past Questions'
              link='/app/upload-past-questions'
            />
            <Card image={ID} title='Upload Student IDs' link='/app/uploadids' />
            <Card
              image={Executives}
              title='Executives and Patrons'
              link='/app/uploadexecutivesandpatrons'
            />
            <div className='relative'>
              <div className='absolute bottom-0 right-0 h-16 w-20 text-center text-white'>
                <p
                  className='bg-red-600'
                  style={{
                    height: "25px",
                    width: "25px",
                    borderRadius: "50%",
                  }}>
                  {complains}
                </p>
              </div>
              <Card
                image={Complains}
                title='Complains'
                link='/app/complains'
                handleClick={removeNewMessage}
              />
            </div>
          </div> : <div className='grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4'>
            <Card
              image={Members}
              title='Registered Students'
              link='/app/admin'
            />
            <Card
              image={Article}
              title='Publish an article'
              link='/app/article'
            />
            <Card image={Stats} title='View Students Stats' link='/app/stats' />

            <div className='relative'>
              <div className='absolute bottom-0 right-0 h-16 w-20 text-center text-white'>
                <p
                  className='bg-red-600'
                  style={{
                    height: "25px",
                    width: "25px",
                    borderRadius: "50%",
                  }}>
                  {complains}
                </p>
              </div>
              <Card
                image={Complains}
                title='Complains'
                link='/app/complains'
                handleClick={removeNewMessage}
              />
            </div>
          </div>)


        ) : (
          // User route
          <div className='grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4'>
            <Card
              image={Register}
              title='Register Membership'
              link='/app/registration'
            />
            <Card
              image={User}
              title='View and Edit Profile'
              link='/app/profile'
            />
            <Card image={Cedis} title='Dues' link='/app/dues' />
            <Card
              image={Souvenirs}
              title='Sourvernirs'
              link='/app/souvernirs'
            />
            <Card
              image={Announcements}
              title='Announcements'
              link='/app/announcements'
            />
            <Card
              image={Executives}
              title='Management'
              link='/app/executivesandpatrons'
            />
            <Card image={Handout} title='Handouts' link='/app/handouts' />
            <Card
              image={Question}
              title='Past Questions'
              link='/app/past-questions'
            />
          </div>
        )
      }
    </>
  );
}

export default Dashboard;
