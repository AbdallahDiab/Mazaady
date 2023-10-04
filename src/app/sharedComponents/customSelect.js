import { Select } from "antd";

const CustomSelect = ({
   arr,
   onChange,
   placeholder,
   loading,
   disabled,
   allowClear,
   style,
}) => {
   let options = [];

   arr?.forEach((item) => {
      options.push({
         label: item.name,
         value: item.id,
         children: item.children,
      });
   });

   return (
      <Select
         allowClear={allowClear}
         options={options}
         placeholder={placeholder}
         onChange={onChange}
         loading={loading}
         disabled={disabled}
         style={{ width: "400px" }}
         filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
         }
         showSearch
         optionFilterProp="children"
      />
   );
};

export default CustomSelect;
