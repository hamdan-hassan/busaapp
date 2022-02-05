import React from "react";

import Souvenirs from "../assets/img/souvenirs.png";
import Cedis from "../assets/img/cedis.png";
import Stats from "../assets/img/statistics.png";
import ID from "../assets/img/images_600x600.png";
import Members from "../assets/img/members.svg";
import Article from "../assets/img/article.png";
import Executives from "../assets/img/executives.png";
import Register from "../assets/img/register.png";
import User from "../assets/img/user.png";
import Announcements from "../assets/img/announcements.png";
import Password from "../assets/img/password.png";
import Handout from "../assets/img/handout.png";
import Question from "../assets/img/question.png";
import PageTitle from "../components/Typography/PageTitle";

import Card from "../components/Card/Card";

function Dashboard() {
  return (
    <>
      <PageTitle>Dashboard</PageTitle>

      {/* <!-- Cards --> */}
      {
        // Admin route
        window.localStorage.getItem("admin") ? (
          <div className='grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4'>
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
          </div>
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
              title='Sourverneirs'
              link='/app/souverniers'
            />
            <Card
              image={Announcements}
              title='Announcements'
              link='/app/announcements'
            />
            <Card
              image={Executives}
              title='Executives and Patrons'
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
