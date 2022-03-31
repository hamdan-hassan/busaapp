import React from "react";
import { Card, CardBody, Button } from "@windmill/react-ui";
import { Link } from "react-router-dom";

function InfoCard({ image, title, link, handleClick }) {
  return (
    <Card
      className='flex-col h-25'
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <img
        className='object-cover'
        src={image}
        width={150}
        height={20}
        alt='card'
      />
      <CardBody>
        <Button
          style={{ background: "green" }}
          onClick={handleClick}>
          <Link to={link}>{title}</Link>
        </Button>
      </CardBody>
    </Card>
  );
}

export default InfoCard;
