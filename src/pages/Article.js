import React, { useState, useEffect } from "react";
import { useParams,useHistory,Redirect,  } from "react-router-dom";
import { Card, CardBody,Button } from "@windmill/react-ui";
import {baseUrl} from '../api/busa-api.js'
import Image from "../assets/img/announcement.jpg";
import Loader from "../loader/loader";
import axios from "axios";
import './Article.css';
 

const Article = () => {
const { id } = useParams();
const [data, setData] = useState([]);
const [loading,setLoading] = useState(true)

let history = useHistory();

 useEffect(() => {
    axios
      .get(`${baseUrl.baseUrl}/get-article/${id}`)
      .then((res) =>
      {
      	if(res.data.rows[0] === undefined) {
        setLoading(false)
        return
      	}
        setData(res.data.rows[0])
        setLoading(false)
      }
       

       )
      .catch((err) => console.log(err));
  }, []);

	
	
	return (
<>
     {loading && <div className="mt-16 md:mt-2"><Loader /></div>}
     {!loading && (<div className='article-container mt-12 md:mt-1'>
                  <div
                    className='grid gap-6 mb-8 md:grid-cols-1 xl:grid-cols-1'
                    style={{ marginTop: "50px" }}>
                    <Card className='flex-col h-70'>
                      <img className='object-cover md:w-1/2 article-img' src={Image} alt=''/>
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
                        style={{ margin: "20px", fontSize: 20 }}>
                        {data.title}
                      </h1>
                      <CardBody>
                        <p
                          className='dark:text-gray-200'
                          style={{
                            paddingBottom: "40px",
                            fontSize: 15,
                            lineHeight: 1.8,
                            whiteSpace: "pre-wrap"
                          }}>
                          {data.content}
                        </p>
                      </CardBody>
                    </Card>
          
                  </div>
                </div>)}
      </>
	)
}

export default Article