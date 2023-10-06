import React from "react";
import { Avatar, Card, Col, Row } from "antd";

const MonyList = () => {
   const arr = [
      { id: 1, title: "القيمة الابتدائية" },
      { id: 2, title: "القيمة التقريبية" },
      { id: 3, title: "العربون" },
      { id: 4, title: "سعر الشراء الفورى" },
      { id: 5, title: "قيمة ذيادة المزاد" },
   ];

   const paintCard = (item) => {
      return (
         <Col key={item.id} span={24} className="mony-container">
            <Row justify="space-between" align="middle">
               <Col className="title"> {item.title} </Col>
               <Col className="value">5000</Col>
            </Row>
         </Col>
      );
   };
   return (
      <Card>
         <Row gutter={[0, 11]}>
            {arr.map((item) => {
               return paintCard(item);
            })}
         </Row>
      </Card>
   );
};

export default MonyList;
