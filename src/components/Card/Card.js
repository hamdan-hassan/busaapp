import React from "react";
import { Card, CardBody, Button } from "@windmill/react-ui";
import { Link } from "react-router-dom";

function InfoCard({ image, title, link }) {
  return (
    <Card className='flex-col h-70'>
      <img className='object-cover w-1/1' src={image} />
      <CardBody>
        <Button className=''>
          <Link to={link}>{title}</Link>
        </Button>
      </CardBody>
    </Card>
  );
}

export default InfoCard;
