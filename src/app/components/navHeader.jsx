import React from "react";
import { HeartIcon, NotificationIcon, PriceIcon } from "@/assets/icons";
import { Select } from "antd";

const NavHeader = () => {
   return (
      <header className="nav-header">
         <div class="container">
            <nav>
               <div class="menu">
                  <span></span>
                  <span></span>
               </div>
               <ul>
                  <li>
                     <a href="#">الرئيسية</a>
                  </li>
                  <li>
                     <a href="#">التصنيفات</a>
                  </li>
                  <li>
                     <a href="#">مشترياتى</a>
                  </li>
                  <li>
                     <a href="#">حسابى</a>
                  </li>
               </ul>
            </nav>
            <section>
               <div class="icons">
                  <div class="icon">
                     <a href="#">
                        <PriceIcon />
                     </a>
                  </div>
                  <div class="icon">
                     <a href="#">
                        <HeartIcon />
                     </a>
                  </div>
                  <div class="icon">
                     <a href="#">
                        <NotificationIcon />
                     </a>
                  </div>
                  <div class="icon">
                     {" "}
                     <Select
                        options={[
                           { value: "1", label: "عربية" },
                           { value: "2", label: "English" },
                        ]}
                        className="lang-select"
                        placeholder="عربية"
                     ></Select>
                  </div>
               </div>
            </section>
         </div>
      </header>
   );
};

export default NavHeader;
