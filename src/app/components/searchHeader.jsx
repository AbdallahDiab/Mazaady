import React from "react";
import {
   HeartIcon,
   NotificationIcon,
   PriceIcon,
   SearchIcon,
} from "@/assets/icons";
import logo from "../../assets/imges/logo.png";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, Input, Row, Space } from "antd";
const SearchHeader = () => {
   const items = [
      {
         label: "1st menu item",
         key: "1",
         icon: <UserOutlined />,
      },
      {
         label: "2nd menu item",
         key: "2",
         icon: <UserOutlined />,
      },
      {
         label: "3rd menu item",
         key: "3",
         icon: <UserOutlined />,
      },
      {
         label: "4rd menu item",
         key: "4",
         icon: <UserOutlined />,
      },
   ];
   const menuProps = {
      items,
   };
   return (
      <header>
         <div className="container">
            <div className="search-container">
               <Row style={{ width: "100%" }}>
                  <Col>
                     <Dropdown menu={menuProps}>
                        <Button className="drop-btn">
                           <Space>
                              مزاد مباشر متعدد
                              <DownOutlined />
                           </Space>
                        </Button>
                     </Dropdown>
                  </Col>
                  <Col style={{ width: "60%" }}>
                     {" "}
                     <Input className="search-input" placeholder="ابحث هنا" />
                  </Col>
                  <Col style={{ marginRight: "-1px" }}>
                     <Button className="search-btn">
                        <SearchIcon />
                     </Button>
                  </Col>
               </Row>
            </div>

            <section>
               <img src={logo.src} alt="logdfgo" />
            </section>
         </div>
      </header>
   );
};

export default SearchHeader;
