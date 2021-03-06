import React,{useState,useEffect} from "react";
import { Card, CardBody,HelperText, } from "@windmill/react-ui";
import PageTitle from "../components/Typography/PageTitle";
import Hamdan from "../assets/img/hamdan.jpg";
import Osman from "../assets/img/osman.jpg";
import { ReactComponent as WhatsApp } from "../assets/img/whatsapp.svg";
import { ReactComponent as Linkedin } from "../assets/img/linkedin.svg";
import { ReactComponent as Gmail } from "../assets/img/gmail.svg";
import Loader from "../loader/loader";

const Developers = () => {
  const [loading,setLoading] = useState(true)

const loaded = () => {
  setLoading(false)
}

	return (
 <>
 <div className="mt-12 md:mt-2">
  <PageTitle>Developers</PageTitle>
   <div className='grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4 text-center'>
  <Card
    className='flex-col h-25'
   >
   {loading && <div className="mt-16 md:mt-2"><Loader /></div>}
    <img
      style={{
        height: "60%",
        width: "100%",
      }}
      className='object-cover'
      src={Osman}
      alt='Osman'
      onLoad={loaded}
       />
       <CardBody className='dark:text-gray-200'>
       <h1>Mr. Osman Abdul Kareem</h1>
          <HelperText><strong>Web Designer</strong></HelperText>
          <div
           style={{
            display: "flex",
            justifyContent: "center"
          }}>
            <a href="https://wa.me/+233549299655" target="_blank"><WhatsApp /></a>
             <a href="https://www.linkedin.com/in/osman-kareem-014156b7" target="_blank"><Linkedin /></a>
             <a href="mailto:osmankareem41@yahoo.com" target="_blank"><Gmail /></a>

          </div>
          
	    </CardBody>
	  </Card>
	  <Card
    className='flex-col h-25'
    >
    {loading && <div className="mt-16 md:mt-2"><Loader /></div>}
    <img
      style={{
        height: "60%",
        width: "100%",
      }}
      className='object-cover'
      src={Hamdan}
      alt='Hamdan'
      onLoad={loaded}
       />
       <CardBody className='dark:text-gray-200'>
       <h1>Mr. Hamdan M Hassan</h1>
          <HelperText><strong>Software Engineer/Full-Stack Engineer</strong></HelperText>
          <div
           style={{
            display: "flex",
            justifyContent: "center"
          }}>
            <a href="https://wa.me/+233543169240" target="_blank"><WhatsApp /></a>
             <a href="https://www.linkedin.com/in/hamdan-hassan-004234190" target="_blank"><Linkedin /></a>
            <a href="mailto:hassanmohammad922@gmail.com" target="_blank"><Gmail /></a>
          </div>
	    </CardBody>
	  </Card>
	  </div>
    </div>
  </>


)
}


export default Developers