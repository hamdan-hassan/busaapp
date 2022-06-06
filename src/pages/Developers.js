import React from "react";
import { Card, CardBody,HelperText, } from "@windmill/react-ui";
import PageTitle from "../components/Typography/PageTitle";
import Hamdan from "../assets/img/hamdan.jpg";
import Osman from "../assets/img/osman.jpg";
import { ReactComponent as WhatsApp } from "../assets/img/whatsapp.svg";
import { ReactComponent as Linkedin } from "../assets/img/linkedin.svg";
import { ReactComponent as Gmail } from "../assets/img/gmail.svg";

const Developers = () => {

	return (
 <>
  <PageTitle>Developers</PageTitle>
   <div className='grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4 text-center'>
  <Card
    className='flex-col h-25'
   >
    <img
      style={{
        height: "65%",
        width: "100%",
      }}
      className='object-cover'
      src={Osman}
      alt='card'
       />
       <CardBody className='dark:text-gray-200'>
          <HelperText>Web Designer</HelperText>
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
    <img
      style={{
        height: "65%",
        width: "100%",
      }}
      className='object-cover'
      src={Hamdan}
      alt='card'
       />
       <CardBody className='dark:text-gray-200'>
          <HelperText>Software Engineer</HelperText>
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
  </>


)
}


export default Developers