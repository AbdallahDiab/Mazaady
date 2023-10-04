"use client";
import React, { useEffect, useState } from "react";
import {
   useGetCategory,
   useGetChildCategory,
   useGetSubCategory,
} from "./useCategory";
import axios from "axios";
import fetch from "../assets/FetchInterceptor";
import { useQuery } from "@tanstack/react-query";
import { Form, Input } from "antd";
import CustomSelect from "@/app/sharedComponents/customSelect";

const CategoriesComponent = () => {
   const [subCategoryList, setSubCategoryList] = useState([]);

   const [option, setOption] = useState();

   const [selectedSubCategory, setSelectedSubCategory] = useState();
   const { data, isLoading: categoryLoading } = useGetCategory();
   const { data: subCategory, isLoading: subcategoryLoading } =
      useGetSubCategory(selectedSubCategory);

   const { data: childCategory, isLoading: childCategoryLoading } =
      useGetChildCategory(option?.val);
   const [subCategoryState, setSubCategoryState] = useState(
      subCategory?.data.data
   );
   useEffect(() => {
      if (subCategory) {
         setSubCategoryState(subCategory?.data.data);
      }
   }, [subCategory]);

   return (
      <Form layout="vertical">
         <Form.Item label="Category">
            <CustomSelect
               arr={data?.data.data.categories}
               loading={categoryLoading}
               placeholder="Select Category"
               onChange={(val, option) => {
                  setSubCategoryList(option.children);
               }}
            />
         </Form.Item>
         <Form.Item label="Category">
            <CustomSelect
               arr={subCategoryList}
               loading={categoryLoading}
               placeholder="Select Subcategory"
               onChange={(val) => setSelectedSubCategory(val)}
            />
         </Form.Item>

         {subCategoryState &&
            subCategoryState.map((dropdown) => {
               return (
                  <div key={dropdown.id}>
                     {" "}
                     <Form.Item label={dropdown.name} name={dropdown.name}>
                        <CustomSelect
                           arr={[
                              { id: `${dropdown.id}-other`, name: "Other" },
                              ...dropdown.options,
                           ]}
                           onChange={(val) => {
                              setOption({ val: val, id: dropdown.id });
                              if (val === -1) {
                              }
                              console.log(val, dropdown, option, "dsdfsdfsdf");
                           }}
                        />
                     </Form.Item>
                     {console.log(option, "ffff")}
                     {option?.val === `${dropdown.id}-other` && (
                        <Form.Item name={dropdown.name + " " + "[other]"}>
                           <Input />
                        </Form.Item>
                     )}
                  </div>
               );
            })}
      </Form>
   );
};

export default CategoriesComponent;
