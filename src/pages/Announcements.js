import React, { useState, useEffect } from "react";

import { Card, CardBody } from "@windmill/react-ui";
import Image from "../assets/img/announcement.jpg";
import axios from "axios";
import "./Announcements.css";

function Announcements() {
  const [data, setData] = useState("");

  // Fetch Published Announcement
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/getArticle")
      .then((res) => setData(res.data.rows[0]))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className='announcement-container' style={{}}>
        <div
          className='grid gap-6 mb-8 md:grid-cols-1 xl:grid-cols-1'
          style={{ marginTop: "50px" }}>
          <Card className='flex-col h-70'>
            <img className='object-cover w-1/1' src={Image} alt='' />
            <p
              className='dark:text-gray-200'
              style={{
                fontSize: "11px",
                fontWeight: 600,

                margin: "20px",
              }}>
              {data.date}
            </p>
            <h1
              className='dark:text-gray-200'
              style={{ margin: "20px", fontSize: 25 }}>
              {data.title}
            </h1>
            <CardBody>
              <p
                className='dark:text-gray-200'
                style={{
                  paddingBottom: "40px",
                  fontSize: 20,
                  lineHeight: 1.8,
                }}>
                {data.content}
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Announcements;
