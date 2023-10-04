import axios from "axios";

const CategoryServices = {};
const headers = {
   "private-key": "3%o8i}_;3D4bF]G5@22r2)Et1&mLJ4?$@+16",
};
const baseUrl = "https://staging.mazaady.com/api/v1/";

CategoryServices.getCategory = function () {
   return axios.get(`${baseUrl}get_all_cats`, {
      headers: headers,
   });
};
CategoryServices.getSubCategory = function (id) {
   return axios.get(`${baseUrl}properties?cat=${id}`, {
      headers: headers,
   });
};
CategoryServices.getChildCategory = function (id) {
   return axios.get(`${baseUrl}get-options-child/${id}`, {
      headers: headers,
   });
};
export default CategoryServices;
