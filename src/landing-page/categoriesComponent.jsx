"use client";
import React, { useEffect, useState } from "react";
import {
   useGetCategory,
   useGetChildCategory,
   useGetSubCategory,
} from "./useCategory";
import { Button, Col, Form, Input, Row, Table } from "antd";
import CustomSelect from "@/app/sharedComponents/customSelect";
import Link from "next/link";

const CategoriesComponent = () => {
   const [subCategoryList, setSubCategoryList] = useState([]);
   const [tableValues, setTableValues] = useState({});
   const [tableArr, setTableArr] = useState([]);
   console.log(tableArr, "tableArr");

   const [selectedSubCategory, setSelectedSubCategory] = useState();
   const { data, isLoading: categoryLoading } = useGetCategory();
   const { data: subCategory, isLoading: subcategoryLoading } =
      useGetSubCategory(selectedSubCategory);
   const [selectedChildId, setSelectedChildId] = useState(null);
   const [selectedDropdown, setSelectedDropdown] = useState(null);

   const onSuccess = (res) => {
      setSubCategoryState([
         ...subCategoryState.map((itm) => {
            if (itm.id === selectedDropdown.id) {
               return {
                  ...selectedDropdown,
                  value_id: selectedChildId,
                  children: res.data.data,
               };
            }
            return itm;
         }),
      ]);
   };
   const { isLoading: childCategoryLoading } = useGetChildCategory(
      selectedChildId,
      onSuccess
   );
   const [subCategoryState, setSubCategoryState] = useState(
      subCategory?.data.data
   );

   useEffect(() => {
      if (subCategory) {
         const updatedSubCategory = [
            ...subCategory?.data.data.map((item) => {
               return {
                  id: item.id,
                  name: item.name,
                  slug: item.slug,
                  options: [
                     { id: `${item.id}-other`, name: "Other" },
                     ...item.options,
                  ],
                  value_id: null,
                  children: [],
               };
            }),
         ];
         setSubCategoryState(updatedSubCategory);
      }
   }, [subCategory]);

   const onChange = async (val, opt, dropdown) => {
      setSelectedChildId(val.split("-")[0]);
      setSelectedDropdown({ ...dropdown, value_id: val.split("-")[0] });

      setSubCategoryState([
         ...subCategoryState.map((itm) => {
            if (itm.id === dropdown.id) {
               return { ...dropdown, value_id: val.split("-")[0] };
            }
            return itm;
         }),
      ]);
   };

   const onFinish = (values) => {
      console.log(values, "sdcsdc");
      setTableValues(values);
      handleTableArray(values);
   };
   //tableValues
   const dataSource = [tableValues];

   const handleTableArray = (obj) => {
      let arr = [];
      Object.entries(obj).map(([key, value]) => {
         arr.push({ title: key, dataIndex: key, key: key });
      });

      setTableArr(arr);
   };

   console.log(tableArr, "tableArr");

   return (
      <Row gutter={60}>
         <Col>
            <Form layout="vertical" onFinish={onFinish}>
               <Form.Item
                  label="Category"
                  name="category"
                  rules={[
                     {
                        required: true,
                     },
                  ]}
               >
                  <CustomSelect
                     arr={data?.data.data.categories}
                     loading={categoryLoading}
                     placeholder="Select Category"
                     onChange={(val, option) => {
                        setSubCategoryList(option.children);
                     }}
                  />
               </Form.Item>
               <Form.Item
                  label="Sub Category"
                  name="subCategory"
                  rules={[
                     {
                        required: true,
                     },
                  ]}
               >
                  <CustomSelect
                     arr={subCategoryList}
                     loading={categoryLoading}
                     placeholder="Select Subcategory"
                     onChange={(val) =>
                        setSelectedSubCategory(val.split("-")[0])
                     }
                  />
               </Form.Item>

               {subCategoryState &&
                  subCategoryState.map((dropdown) => {
                     console.log(
                        dropdown.value_id == dropdown.id,
                        dropdown.value_id,
                        dropdown.id,
                        "sdfsdf"
                     );
                     return (
                        <div key={dropdown.id}>
                           {" "}
                           <Form.Item
                              label={dropdown.name}
                              name={dropdown.name}
                           >
                              <CustomSelect
                                 arr={dropdown.options}
                                 onChange={(val, opt) => {
                                    onChange(val, opt, dropdown);
                                 }}
                              />
                           </Form.Item>
                           {dropdown.value_id == dropdown.id ? (
                              <Form.Item name={dropdown.name + " " + "[other]"}>
                                 <Input
                                    placeholder="Enter Other Option"
                                    style={{ border: "2px solid #9B0257" }}
                                 />
                              </Form.Item>
                           ) : (
                              dropdown.children.map((child) => (
                                 <Form.Item
                                    name={child.name}
                                    label={child.name}
                                    key={child.id}
                                 >
                                    <CustomSelect
                                       arr={child.options}
                                       loading={childCategoryLoading}
                                       placeholder="Select Child Category"
                                    />
                                 </Form.Item>
                              ))
                           )}
                        </div>
                     );
                  })}
               <Row justify="end" gutter={16}>
                  <Col>
                     <Button htmlType="submit" type="primary">
                        Submit
                     </Button>
                  </Col>
                  <Col>
                     <Link href="/home-page">
                        <Button>Home Page</Button>
                     </Link>
                  </Col>
               </Row>
            </Form>
         </Col>
         <Col span={24}>
            {tableArr.length > 0 && (
               <Table
                  pagination={false}
                  dataSource={dataSource}
                  columns={tableArr}
               />
            )}
         </Col>
      </Row>
   );
};

export default CategoriesComponent;
