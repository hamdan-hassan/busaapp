import React, { useState, useEffect } from "react";

import { Card, CardBody,Button } from "@windmill/react-ui";
import Image from "../assets/img/announcement.jpg";
import axios from "axios";
import Loader from "../loader/loader";
import { useHistory } from "react-router-dom";
import {baseUrl} from '../api/busa-api.js'
import PageTitle from "../components/Typography/PageTitle";
import "./Articles.css";

function Articles() {
  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(true)
  const [offset,setOffset] = useState(0)
  const [limit,setLimit] = useState(10)
  // const [totalArticles,setTotalArtticles]

  let history = useHistory();

  // Fetch Published Announcement
  useEffect(() => {

 // axios
 //    .get(`${baseUrl.baseUrl}/count-articles`)
 //      .then((res) =>
 //      {
 //        console.log(res)
 //      }
       

 //       )
 //      .catch((err) => console.log(err));

    axios
      .get(`${baseUrl.baseUrl}/getArticles`)
      .then((res) =>
      {
        setData(res.data.rows)
        setLoading(false)
      }
       

       )
      .catch((err) => console.log(err));
  }, []);

  const handleClick = (id,title) => {

    history.push(`article/${id}/${title}`)

  }

  return (
    <>
    {loading && <div className="mt-16 md:mt-2"><Loader /></div>}
      {!loading && (<div className='announcement-container mt-12 md:mt-1'>
                    <PageTitle>Articles</PageTitle>
                    <div
                      className='grid gap-6 mb-8 md:grid-cols-1 xl:grid-cols-1'
                      >
            
                      {data.map(article => {
                        return(
                        <Card className='flex-col h-70' key={article.article_id}>
                      
                        <p
                          className='dark:text-gray-200'
                          style={{
                            fontSize: "11px",
                            fontWeight: 600,
            
                            margin: "20px",
                          }}>
                          {article.date}
                        </p>
                        <h1
                          onClick={() => handleClick(article.article_id,article.title)}
                          className='dark:text-gray-200'
                          style={{ margin: "20px", fontSize: 20, fontWeight: 800,cursor: "pointer"}}>
                          {article.title}
                        </h1>
                      </Card>)
                      })}
            
                      <div className="flex justify-center">
                      {data.length > 10 && <Button className="w-1/2" style={{background: "green"}}>Load More</Button>}
                      </div>
                    </div>
                  </div>)
      }
    </>
  );
}

export default Articles;
