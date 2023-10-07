// import CategoryServices from "@/services/categoryService";
// import { useQuery } from "@tanstack/react-query";

// const getCategory = () => {
//    return CategoryServices.getCategory();
// };
// const getSubCategory = (id) => {
//    return CategoryServices.getSubCategory(id);
// };
// const getChildCategory = (id) => {
//    return CategoryServices.getChildCategory(id);
// };

// export const useGetCategory = () => {
//    return useQuery([`get-category`], getCategory);
// };
// export const useGetSubCategory = (id, onSuccess = (res) => res) => {
//    return useQuery([`get-SubCategory`, id], () => getSubCategory(id), {
//       onSuccess,
//       enabled: !!id,
//    });
// };
// export const useGetChildCategory = (id, onSuccess = (res) => res) => {
//    return useQuery([`get-ChildCategory`, id], () => getChildCategory(id), {
//       onSuccess,
//       enabled: !!id,
//    });
// };
import CategoryServices from "@/services/categoryService";
import { useQuery } from "@tanstack/react-query";

const getAllCategories = () => {
   return CategoryServices.getAllCategories();
};
const getProperties = (id) => {
   return CategoryServices.getProperties(id);
};
const getChildOptions = (id) => {
   return CategoryServices.getChildOptions(id);
};

export const useGetAllCategories = () => {
   return useQuery([`get-category`], getAllCategories);
};
export const useGetProperties = (id, onSuccess = (res) => res) => {
   return useQuery([`get-SubCategory`, id], () => getProperties(id), {
      onSuccess,
      enabled: !!id,
   });
};
export const useGetPropertiesChildren = (id, onSuccess = (res) => res) => {
   return useQuery([`get-ChildCategory`, id], () => getChildOptions(id), {
      onSuccess,
      enabled: !!id,
   });
};
