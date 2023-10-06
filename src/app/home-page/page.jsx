import "./styles.css";

import SearchHeader from "../components/searchHeader";
import NavHeader from "../components/navHeader";
import { Col, Row } from "antd";
import Post from "../components/post";
import SellerMsg from "../components/sellerMsg";
import PostInfo from "../components/postInfo";
import Comparators from "../components/Comparators";
import MonyList from "../components/monyList";
import Swiper from "../components/swiper";
import SwiperComponent from "../components/swiper";
const Page = () => {
   return (
      <div className="landing-container">
         <SearchHeader />
         <NavHeader />
         <div className="container body-container ">
            <Row gutter={16}>
               <Col xs={24} sm={24} md={2} lg={2}>
                  <SwiperComponent />
               </Col>
               <Col xs={24} sm={24} md={15} lg={15}>
                  <Row gutter={[0, 34]}>
                     <Col span={24}>
                        <Post />
                     </Col>
                     <Col span={24}>
                        <SellerMsg />
                     </Col>
                  </Row>
               </Col>
               <Col xs={24} sm={24} md={7} lg={7}>
                  <Row gutter={[0, 23]}>
                     <Col span={24}>
                        <PostInfo />
                     </Col>
                     <Col span={24}>
                        <Comparators />
                     </Col>
                     <Col span={24}>
                        <MonyList />
                     </Col>
                  </Row>
               </Col>
            </Row>
         </div>
      </div>
   );
};

export default Page;
