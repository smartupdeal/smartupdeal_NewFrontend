import React from "react";
import { Input,Label } from "reactstrap";
export const CustomInput = ({ field, form, ...props }) => {
  return <Input {...field} {...props} />;
};
export const CustomDateInput = ({ field, form, ...props }) => {
  return <Input type="date" {...field} {...props} />;
};
export const CustomInputSelect = ({ field, form, ...props }) => {
  const { options, ...rest } = props;
  return (
    <Input type="select" {...field} {...rest}>
      <option value="" hidden></option>
      {options?.map((item, index) => (
        <option key={index} value={item?.value}>
          {item?.label}
        </option>
      ))}
    </Input>
  );
};

export const CustomCheckboxInput = ({ label,field, form, ...props }) => {
  return (
    <>
      <Input type="checkbox" {...field} {...props} />
      <Label check>{label}</Label>
    </>
  );
};
export const CustomTextArea = ({ field, form, ...props }) => {
  return <Input type="textarea" {...field} {...props} />;
};