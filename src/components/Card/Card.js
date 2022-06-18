import React,{useState} from "react";
import { Card, CardBody, Button } from "@windmill/react-ui";
import { Link } from "react-router-dom";
import Loader from "../../loader/loader";

function InfoCard({ image, title, link, handleClick }) {

  const [loading,setLoading] = useState(true)

  const loaded = () => {
    setLoading(false)
  }

  return (
    <Card
      className='flex-col h-25'
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "2px solid #f9f047",
        boxShadow: "0px 10px 27px -15px rgba(0,0,0,0.75)"
      }}>
      {loading && <Loader />}
      <img
        className='object-cover'
        src={image}
        width={150}
        height={20}
        alt='card'
        onLoad={loaded}
      />
      
      <CardBody>
        <Button
          style={{ background: "#00B712",width: 200 }}
          onClick={handleClick}>
          <Link to={link}>{title}</Link>
        </Button>
      </CardBody>
    </Card>
  );
}

export default InfoCard;
