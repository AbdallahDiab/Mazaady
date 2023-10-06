import { SendIcon } from "@/assets/icons";
import { Card, Col, Input, Row } from "antd";
import React from "react";

const SellerMsg = () => {
   return (
      <Card>
         <h2 style={{ color: "#414141" }}>ارسال رسالة الى البائع</h2>
         <h3> يمكنك في وقت البث المباشر ارسال رسالة الى البائع للاستفسار</h3>
         <Row gutter={4} align="middle">
            <Col span={22}>
               {" "}
               <Input className="msg-input" placeholder="اكتب سؤالك"></Input>
            </Col>
            <Col span={2} className="send-btn">
               {" "}
               <SendIcon />
            </Col>
         </Row>
      </Card>
   );
};

export default SellerMsg;
