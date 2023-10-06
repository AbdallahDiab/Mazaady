import { Avatar, Card, Col, Row } from "antd";
import React from "react";
import avatar from "../../assets/imges/avatar2.png";

const Comparators = () => {
   var arr = new Array(5).fill("DefaultValue");
   const paintCard = () => {
      return (
         <Col span={24}>
            <Row justify="space-between">
               <Col>
                  <Row gutter={[8, 8]} align="middle">
                     <Col>
                        <Avatar src={avatar.src} size={44}></Avatar>
                     </Col>
                     <Col>
                        <Row className="com-name">اسم المزايد</Row>
                        <Row className="com-time">13:59:00</Row>
                     </Col>
                  </Row>
               </Col>
               <Col>
                  <Row className="com-num" align="middle" justify="center">
                     20+
                  </Row>
               </Col>
            </Row>
         </Col>
      );
   };
   return (
      <Card>
         <h2>المتنافسون</h2>
         <Row gutter={[0, 12]}>
            {arr.map((item) => {
               return paintCard();
            })}
         </Row>
      </Card>
   );
};

export default Comparators;
