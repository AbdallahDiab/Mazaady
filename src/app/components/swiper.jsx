import { SwipeDownIcon, SwipeUpIcon } from "@/assets/icons";
import { Col, Row } from "antd";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import SwipeList from "./swipeList";
const SwiperComponent = () => {
   return (
      <Row justify="center">
         <Col span={12}>
            <Row className="swipe-btn up" justify="center" align="middle">
               <UpOutlined />
            </Row>
         </Col>
         <Col span={24}>
            <SwipeList />
         </Col>
         <Col span={12}>
            <Row className=" swipe-btn down" justify="center" align="middle">
               <DownOutlined />
            </Row>
         </Col>
      </Row>
   );
};

export default SwiperComponent;
