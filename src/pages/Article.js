import React, { useState } from "react";
import { Textarea, Label, Input } from "@windmill/react-ui";
import Modal from "./Modal";
import { Checkmark } from "react-checkmark";
import {baseUrl} from '../api/busa-api.js'
import axios from "axios";

const Article = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);

  // Publish Article
  const handleSubmit = () => {
    console.log(content);
    setPublished(false);
    axios
      .put(
        `${baseUrl.baseUrl}/article`,
        {
          Title: title,
          Content: content,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);

        // setTitle("");
        // setContent("");
        setPublished(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='mt-6'>
      <h1 style={{ color: "green" }}>Write Article</h1>
      <Label>
        <span>Title</span>
        <Input
          className='mt-1'
          placeholder='Busa week celebration'
          onChange={(e) => setTitle(e.target.value)}
        />
      </Label>
      <Textarea
        valid
        className='mt-1'
        rows='10'
        placeholder='...'
        onChange={(e) =>
          setContent(
            e.target.value
              .split("")
              .map((item) => {
                if (item === "'") {
                  return item + "'";
                }
                return item;
              })
              .join("")
          )
        }
      />

      <Modal
        ModalTitle={"Publish Article"}
        handleClick={handleSubmit}
        ModalHead={"Publish Article"}
        ModalContent={"Are you sure you want to publish the article?"}
      />
      {published && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}>
          <h1
            style={{
              fontSize: 40,
            }}>
            Published
            <Checkmark size='100' />
          </h1>
        </div>
      )}
    </div>
  );
};

export default Article;
