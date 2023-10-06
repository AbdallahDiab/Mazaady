import React from "react";
import carPhoto from "../../assets/imges/front-left-side-47.webp";
import { Col, Row } from "antd";
const SwipeList = () => {
   var arr = new Array(5).fill("DefaultValue");
   return (
      <div>
         <Row gutter={[0, 6]}>
            {" "}
            {arr.map((item, index) => (
               <Col key={index}>
                  <img
                     className="car-photo"
                     width="78"
                     height="78"
                     src={carPhoto.src}
                  />
               </Col>
            ))}
         </Row>
      </div>
   );
};

export default SwipeList;
