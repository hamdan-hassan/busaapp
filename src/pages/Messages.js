import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardBody } from "@windmill/react-ui";
import { DeleteTwoTone } from "@material-ui/icons";
import { UserDetails } from "../userDetails";
import {baseUrl} from '../api/busa-api.js'
import { Button } from "@material-ui/core";

const Messages = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    axios
      .post(
        `${baseUrl.baseUrl}/get-messages`,
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
        setData(res.data.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);

  const handleDelete = (row) => {
    axios
      .delete(`${baseUrl.baseUrl}/delete-message/` + row.sno)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mt-12 md:mt-2">
      {data.length > 0 ? (
        data.map((item, i) => {
          return (
            <Card className='mt-3' key={i}>
              <CardBody>
                <div className='flex justify-between'>
                  <p className='mb-4 font-semibold text-green-600 dark:text-green-300'>
                    Re: {item.subject}
                  </p>
                  <Button onClick={() => handleDelete(item)}>
                    <DeleteTwoTone className='fill-blue-500' />
                  </Button>
                </div>
                <span className='mb-3 dark:text-gray-200'>
                  {`${item.date} ${item.time}`}
                </span>
                <p className='text-gray-600 dark:text-gray-400'>
                  {item.message}
                </p>
              </CardBody>
            </Card>
          );
        })
      ) : (
        <h1 className='text-center text-xl mt-5 dark:text-gray-200'>
          No New Messages. Replies from Complain will appear hear
        </h1>
      )}
    </div>
  );
};

export default Messages;
