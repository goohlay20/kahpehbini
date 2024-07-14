import React from "react";

const TextAreaField =  ({ field, productDetails, errors, register, handleInputChange, trigger }) => {
  return (
    <textarea
    name={field.name}
    defaultValue={productDetails[field.name] || ''}
    className="border p-1 w-full"
    {...register(field.name, field.validation(field.name, handleInputChange, trigger))}
  />
  )
};

export default TextAreaField;