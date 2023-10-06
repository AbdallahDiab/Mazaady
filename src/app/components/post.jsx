import {
   EmptyHeartIcon,
   EyeIcon,
   FlagIcon,
   LoveIcon,
   ShareIcon,
   StarIcon,
} from "@/assets/icons";
import { Avatar, Button, Card, Col, Input, Rate, Row } from "antd";
import React from "react";
import avatar from "../../assets/imges/avatar2.png";
import carPhoto from "../../assets/imges/rimac-nevera.jpg";

const Post = () => {
   return (
      <Row>
         <Col span={24}>
            <div className="hero-post-img">
               <Row justify="space-between">
                  <Col>
                     <Row>
                        <Col className="white-container"></Col>
                        <Col>
                           {" "}
                           <Row
                              justify="space-between"
                              className="timer-container"
                           >
                              <Col>
                                 <Row
                                    gutter={4}
                                    justify="center"
                                    align="middle"
                                 >
                                    <Col>
                                       <EyeIcon />
                                    </Col>
                                    <Col> 3000</Col>
                                 </Row>
                              </Col>
                              <Col className="divider"></Col>
                              <Col>
                                 <Row justify="center" align="middle">
                                    02:00
                                 </Row>
                              </Col>
                           </Row>
                        </Col>
                     </Row>
                  </Col>
                  <Col>
                     <Row gutter={12}>
                        <Col>
                           <Row
                              justify="center"
                              align="middle"
                              className="hero-actions"
                           >
                              <ShareIcon />
                           </Row>
                        </Col>{" "}
                        <Col>
                           <Row
                              justify="center"
                              className="hero-actions"
                              align="middle"
                           >
                              {" "}
                              <EmptyHeartIcon />
                           </Row>
                        </Col>{" "}
                        <Col>
                           <Row
                              justify="center"
                              className="hero-actions"
                              align="middle"
                           >
                              {" "}
                              <FlagIcon />
                           </Row>
                        </Col>
                     </Row>
                  </Col>
               </Row>
            </div>
         </Col>
         <Col span={24}>
            <Card>
               <Row className="rate-container">
                  <Col>
                     <Avatar src={avatar.src} size={44}></Avatar>
                     <div className="heart-icon">
                        <LoveIcon />
                     </div>
                  </Col>
                  <Col>
                     <Row className="seller-name">اسم البائع</Row>
                     <Row className="seller-phone">966598398+</Row>
                  </Col>
                  <Col>
                     <Rate
                        allowHalf
                        // character={<StarIcon />}
                        defaultValue={4}
                     />
                  </Col>
               </Row>
               <h2>شراء مجموعة من السيارات من موديلات1990</h2>
               <h5 className="code">code 1234</h5>
               <Row justify="space-between">
                  <Col>
                     <Row gutter={6}>
                        <Col>
                           <Row
                              justify="center"
                              align="middle"
                              className="statistic"
                           >
                              10020+
                           </Row>
                        </Col>
                        <Col>
                           <Row
                              justify="center"
                              align="middle"
                              className="statistic"
                           >
                              10020+
                           </Row>
                        </Col>
                        <Col>
                           <Row
                              justify="center"
                              align="middle"
                              className="statistic"
                           >
                              10020+
                           </Row>
                        </Col>
                     </Row>
                  </Col>
                  <Col>
                     <Row gutter={12}>
                        <Col>
                           <Input
                              placeholder="اكتب المبلغ"
                              className="price-input"
                           ></Input>
                        </Col>
                        <Col>
                           {" "}
                           <Button className="custom-btn">تأكيد</Button>
                        </Col>
                     </Row>
                  </Col>
               </Row>
            </Card>
         </Col>
      </Row>
   );
};

export default Post;
