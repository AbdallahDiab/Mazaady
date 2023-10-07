"use client";
import React, { useEffect, useState } from "react";
import {
   useGetAllCategories,
   useGetPropertiesChildren,
   useGetProperties,
} from "./useCategory";
import { Button, Col, Form, Input, Row, Table, Select } from "antd";
import Link from "next/link";

const CategoriesComponent = () => {
   const [form] = Form.useForm();

   // handle table state
   const [tableArr, setTableArr] = useState([]);
   const [tableValues, setTableValues] = useState({});
   const dataSource = [tableValues];
   const handleTableArray = (obj) => {
      let arr = [];
      Object.entries(obj).map(([key]) => {
         arr.push({ title: key, dataIndex: key, key: key });
      });

      setTableArr(arr);
   };

   // get all categories
   const { data: categoriesRes, isLoading: categoriesIsloading } =
      useGetAllCategories();
   const baseSelectProps = (label, slug, id) => ({
      ...(id && { id }), // if id exist, then add it to the object
      slug: slug || label.toLowerCase(),
      label: label.charAt(0).toUpperCase() + label.slice(1),
      fieldNames: { label: "name", value: "id" },
      style: { width: "400px" },
      options: [],
      value: null,
      placeholder: `Select a ${label.toLowerCase()}`,
   });
   const [mainCategory, setmainCategory] = useState({
      ...baseSelectProps("Main category", "mainCategory"),
      rules: [{ required: true }],
      onChange: (val, option) => {
         setmainCategory((prev) => ({
            ...prev,
            value: val,
            name: option.name,
         }));
         setSubCategory((prev) => ({
            ...prev,
            value: null,
            options: option.children,
         }));
      },
   });
   const [subCategory, setSubCategory] = useState({
      ...baseSelectProps("sub category", "subCategory"),
      rules: [{ required: true }],
      onChange: (val, option) => {
         setSubCategory((prev) => ({ ...prev, value: val, name: option.name }));
      },
   });

   // update mainCategory options
   useEffect(() => {
      if (categoriesRes && !categoriesIsloading)
         setmainCategory({
            ...mainCategory,
            options: categoriesRes.data.data.categories,
         });
   }, [categoriesRes]);

   const [selectedPropertyChild, setSelectedPropertyChild] = useState(null);
   // get properties of selected sub category based on subCategory.value
   const { data: propertiesRes, isLoading: propertiesIsLoading } =
      useGetProperties(subCategory?.value);
   const {
      data: propertiesChildrenRes,
      isLoading: propertiesChildrenIsLoading,
   } = useGetPropertiesChildren(selectedPropertyChild?.id);
   const [allCategoryNestedChildren, setAllCategoryNestedChildren] = useState(
      []
   );

   console.log(selectedPropertyChild, allCategoryNestedChildren, "sdjofs;df");

   const generateCategoryNastedChildObj = (childObj) => ({
      ...baseSelectProps(childObj.name, childObj.slug, childObj.id),
      options: [
         {
            id: `${childObj.slug}_other-option`,
            name: "Other",
            parent: childObj.id,
         },
         ...childObj.options,
      ],
      onChange: (val, option) => {
         let insertIndex;
         setAllCategoryNestedChildren((prev) => [
            ...prev.map((child, i) => {
               if (child.id === option.parent) {
                  insertIndex = i + 1;
                  return { ...child, value: val, name: option.name };
               }
               return child;
            }),
         ]);
         if (option?.id && option?.child) {
            setSelectedPropertyChild({ id: option?.id, insertIndex });
         }
      },
   });

   useEffect(() => {
      if (propertiesChildrenRes && !propertiesChildrenIsLoading) {
         const arr = [...allCategoryNestedChildren];
         let newChildindex = selectedPropertyChild?.insertIndex;
         const isNewChildExist = (child) => {
            return arr.find((itm, i) => {
               if (itm.slug === child.slug) {
                  newChildindex = i;
                  return true;
               }
               return false;
            });
         };

         propertiesChildrenRes?.data?.data.map((child) => {
            if (isNewChildExist(child)) {
               // if there's a match, then replace the old child with the new one.

               arr.splice(
                  newChildindex,
                  1,
                  generateCategoryNastedChildObj(child)
               );
            } else {
               // if there's no match, then add the new child to the array.
               arr.splice(
                  newChildindex,
                  0,
                  generateCategoryNastedChildObj(child)
               );
            }
         });
         setAllCategoryNestedChildren(arr);
      }
   }, [propertiesChildrenRes]);

   // update allCategoryNestedChildren options
   useEffect(() => {
      if (propertiesRes && !propertiesIsLoading)
         setAllCategoryNestedChildren(
            propertiesRes?.data?.data?.map((child) => ({
               ...generateCategoryNastedChildObj(child),
            }))
         );
   }, [propertiesRes]);

   const onFinish = (values) => {
      let tableObject = Object.assign(
         {
            mainCategory: mainCategory.name,
            subCategory: subCategory.name,
            ...values,
         },
         ...allCategoryNestedChildren.map((x) => ({ [x.label]: x.name }))
      );
      setTableValues(tableObject);
      handleTableArray(tableObject);
      form.resetFields();
   };

   return (
      <Row gutter={60}>
         <Form layout="vertical" onFinish={onFinish} form={form}>
            <Form.Item label={mainCategory?.label} rules={mainCategory?.rules}>
               <Select {...mainCategory} />
            </Form.Item>
            <Form.Item label={subCategory?.label} rules={subCategory?.rules}>
               <Select {...subCategory} />
            </Form.Item>
            {allCategoryNestedChildren?.length > 0 &&
               allCategoryNestedChildren.map((child) => (
                  <React.Fragment key={child?.slug}>
                     <Form.Item label={child?.label}>
                        <Select {...child} />
                     </Form.Item>
                     {child?.value === `${child?.slug}_other-option` && (
                        <Form.Item name={`${child?.slug}_other-option`}>
                           <Input
                              placeholder="Enter Other Option"
                              style={{ border: "2px solid #9B0257" }}
                           />
                        </Form.Item>
                     )}
                  </React.Fragment>
               ))}
            <Row justify="end" style={{ marginBottom: "30px" }} gutter={16}>
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

// "use client";
// import React, { useEffect, useState } from "react";
// import {
//    useGetCategory,
//    useGetChildCategory,
//    useGetSubCategory,
// } from "./useCategory";
// import { Button, Col, Form, Input, Row, Skeleton, Table } from "antd";
// import CustomSelect from "@/app/sharedComponents/customSelect";
// import Link from "next/link";

// const CategoriesComponent = () => {
//    const [subCategoryList, setSubCategoryList] = useState([]);
//    const [tableValues, setTableValues] = useState({});
//    const [tableArr, setTableArr] = useState([]);
//    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
//    const { data, isLoading: categoryLoading } = useGetCategory();
//    const { data: subCategory, isLoading: subcategoryLoading } =
//       useGetSubCategory(selectedSubCategory);
//    const [selectedChildId, setSelectedChildId] = useState(null);
//    const [selectedDropdown, setSelectedDropdown] = useState(null);

//    const onSuccess = (res) => {
//       setSubCategoryState([
//          ...subCategoryState.map((itm) => {
//             if (itm.id === selectedDropdown.id) {
//                return {
//                   ...selectedDropdown,
//                   value_id: selectedChildId,
//                   children: res.data.data,
//                };
//             }
//             return itm;
//          }),
//       ]);
//    };
//    const { isLoading: childCategoryLoading } = useGetChildCategory(
//       selectedChildId,
//       onSuccess
//    );
//    const [subCategoryState, setSubCategoryState] = useState(
//       subCategory?.data.data
//    );

//    useEffect(() => {
//       if (subCategory) {
//          const updatedSubCategory = [
//             ...subCategory?.data.data.map((item) => {
//                return {
//                   id: item.id,
//                   name: item.name,
//                   slug: item.slug,
//                   options: [
//                      { id: `${item.id}-other`, name: "Other" },
//                      ...item.options,
//                   ],
//                   value_id: null,
//                   children: [],
//                };
//             }),
//          ];
//          setSubCategoryState(updatedSubCategory);
//       }
//    }, [subCategory]);

//    const onChange = async (val, opt, dropdown) => {
//       setSelectedChildId(val.split("-")[0]);
//       setSelectedDropdown({ ...dropdown, value_id: val.split("-")[0] });

//       setSubCategoryState([
//          ...subCategoryState.map((itm) => {
//             if (itm.id === dropdown.id) {
//                return { ...dropdown, value_id: val.split("-")[0] };
//             }
//             return itm;
//          }),
//       ]);
//    };

//    const onFinish = (values) => {
//       setTableValues(values);
//       handleTableArray(values);
//    };
//    const dataSource = [tableValues];
//    const handleTableArray = (obj) => {
//       let arr = [];
//       Object.entries(obj).map(([key, value]) => {
//          arr.push({ title: key, dataIndex: key, key: key });
//       });

//       setTableArr(arr);
//    };

//    return (
//       <Row gutter={60}>
//          <Col>
//             <Form layout="vertical" onFinish={onFinish}>
//                <Form.Item
//                   label="Category"
//                   name="category"
//                   rules={[
//                      {
//                         required: true,
//                      },
//                   ]}
//                >
//                   <CustomSelect
//                      arr={data?.data.data.categories}
//                      loading={categoryLoading}
//                      placeholder="Select Category"
//                      onChange={(val, option) => {
//                         setSubCategoryList(option.children);
//                      }}
//                   />
//                </Form.Item>
//                <Form.Item
//                   label="Sub Category"
//                   name="subCategory"
//                   rules={[
//                      {
//                         required: true,
//                      },
//                   ]}
//                >
//                   <CustomSelect
//                      arr={subCategoryList}
//                      loading={categoryLoading}
//                      placeholder="Select Subcategory"
//                      onChange={(val) =>
//                         setSelectedSubCategory(val.split("-")[0])
//                      }
//                   />
//                </Form.Item>

//                {subcategoryLoading && selectedSubCategory ? (
//                   <Row gutter={[0, 16]}>
//                      <Col span={24}>
//                         {" "}
//                         <Skeleton.Button
//                            active={true}
//                            size="large"
//                            shape="default"
//                            block={true}
//                         />
//                      </Col>
//                      <Col span={24}>
//                         <Skeleton.Button
//                            active={true}
//                            size="large"
//                            shape="default"
//                            block={true}
//                         />
//                      </Col>
//                   </Row>
//                ) : (
//                   <>
//                      {" "}
//                      {subCategoryState &&
//                         subCategoryState.map((dropdown) => {
//                            return (
//                               <div key={dropdown.id}>
//                                  {" "}
//                                  <Form.Item
//                                     label={dropdown.name}
//                                     name={dropdown.name}
//                                  >
//                                     <CustomSelect
//                                        arr={dropdown.options}
//                                        onChange={(val, opt) => {
//                                           onChange(val, opt, dropdown);
//                                        }}
//                                     />
//                                  </Form.Item>
//                                  {dropdown.value_id == dropdown.id ? (
//                                     <Form.Item
//                                        name={dropdown.name + " " + "[other]"}
//                                     >
//                                        <Input
//                                           placeholder="Enter Other Option"
//                                           style={{
//                                              border: "2px solid #9B0257",
//                                           }}
//                                        />
//                                     </Form.Item>
//                                  ) : (
//                                     dropdown.children.map((child) => (
//                                        <Form.Item
//                                           name={child.name}
//                                           label={child.name}
//                                           key={child.id}
//                                        >
//                                           <CustomSelect
//                                              arr={child.options}
//                                              loading={childCategoryLoading}
//                                              placeholder="Select Child Category"
//                                           />
//                                        </Form.Item>
//                                     ))
//                                  )}
//                               </div>
//                            );
//                         })}
//                   </>
//                )}

//                <Row justify="end" style={{ marginBottom: "30px" }} gutter={16}>
//                   <Col>
//                      <Button htmlType="submit" type="primary">
//                         Submit
//                      </Button>
//                   </Col>
//                   <Col>
//                      <Link href="/home-page">
//                         <Button>Home Page</Button>
//                      </Link>
//                   </Col>
//                </Row>
//             </Form>
//          </Col>
//          <Col span={24}>
//             {tableArr.length > 0 && (
//                <Table
//                   pagination={false}
//                   dataSource={dataSource}
//                   columns={tableArr}
//                />
//             )}
//          </Col>
//       </Row>
//    );
// };

// export default CategoriesComponent;
