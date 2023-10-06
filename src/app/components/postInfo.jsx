import { Card, Col, Row } from "antd";
import React from "react";

const PostInfo = () => {
   return (
      <Card>
         <Row className="date-section" align="middle" justify="space-between">
            <Col className="date-string">تاريخ البث</Col>
            <Col className="date">22-1-2022</Col>
         </Row>
         <Row gutter={[6, 12]}>
            <Col xs={24} sm={24} md={24} lg={12}>
               <Row justify="center" className="current-value">
                  <Col span={24}>
                     <Row className="date-string-col-cur" justify="center">
                        {" "}
                        القيمة الحالية للمزاد{" "}
                     </Row>
                  </Col>
                  <Col span={24}>
                     <Row justify="center">
                        <span className="date-string-num regular-color">
                           5050
                        </span>{" "}
                        <span className="curacy regular-color">$</span>
                     </Row>
                  </Col>
                  <div className="attach">
                     {" "}
                     <span>أحمد الرائد</span>{" "}
                  </div>
               </Row>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12}>
               <Row justify="center" className="current-value-after-tax">
                  <Col span={24}>
                     <Row
                        className="date-string-col active-color"
                        justify="center"
                     >
                        {" "}
                        القيمة الحالية بعد الضريبة
                     </Row>
                  </Col>
                  <Col span={24}>
                     <Row justify="center">
                        <span className="date-string-num active-color">
                           5050
                        </span>{" "}
                        <span className="curacy active-color">$</span>
                     </Row>
                  </Col>
               </Row>
            </Col>
            <Col></Col>
         </Row>
      </Card>
   );
};

export default PostInfo;
