import React from "react";

const ImageField = ({ field, productDetails, errors, register, handleInputChange, trigger }) => {
  return(
    <input
    type={field.type}
    name={field.name}
    id={field.name}
    className="border p-1 w-full"
    aria-invalid={errors[field.name] ? "true" : "false"}
    {...register(field.name, field.validation(field.name, handleInputChange, trigger, productDetails))}
  />
  )
}

export default ImageField;