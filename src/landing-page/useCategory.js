import CategoryServices from "@/services/categoryService";
import { useQuery } from "@tanstack/react-query";

const getCategory = () => {
   return CategoryServices.getCategory();
};
const getSubCategory = (id) => {
   return CategoryServices.getSubCategory(id);
};
const getChildCategory = (id) => {
   return CategoryServices.getChildCategory(id);
};

export const useGetCategory = () => {
   return useQuery([`get-category`], getCategory);
};
export const useGetSubCategory = (id, onSuccess = (res) => res) => {
   return useQuery([`get-SubCategory`, id], () => getSubCategory(id), {
      onSuccess,
      enabled: !!id,
   });
};
export const useGetChildCategory = (id, onSuccess = (res) => res) => {
   return useQuery([`get-ChildCategory`, id], () => getChildCategory(id), {
      onSuccess,
      enabled: !!id,
   });
};
