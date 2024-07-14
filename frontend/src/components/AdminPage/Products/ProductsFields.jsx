import React, {useEffect, useState} from 'react';
import InputField from '../../../utility/products.utils/productFields/InputFIeld';
import ImageField from '../../../utility/products.utils/productFields/ImageField';
import TextAreaField from '../../../utility/products.utils/productFields/TextAreaField';

const ProductFields = ({ field, productDetails, handleInputChange, errors, register, trigger }) => {
  return (
    <div className="mb-2">
      <label className="block font-medium" >{field.label}</label>
      { field.name !== "image" && field.name !== "description" &&
        <InputField
          field={field}
          errors={errors}
          register={register}
          handleInputChange={handleInputChange}
          trigger={trigger}
          productDetails={productDetails}
        />
      }

      { field.name === "image" &&
        <ImageField
          field={field}
          errors={errors}
          register={register}
          handleInputChange={handleInputChange}
          trigger={trigger}
          productDetails={productDetails}
        />
      }

      { field.name === "description" &&
        <TextAreaField
          field={field}
          errors={errors}
          register={register}
          handleInputChange={handleInputChange}
          trigger={trigger}
          productDetails={productDetails}
        />
      }

      {errors[field.name] && (
        <div className="w-full flex justify-end">
          <span className="font-normal text-xs leading-4 tracking-wide text-left text-[#D32F2F]">
            {errors[field.name].message}
          </span>
        </div>
      )}

      {field.name === 'image' && productDetails.image && productDetails.image.path && (
        <img
          src={productDetails.image.path}
          alt="Preview"
          className="w-16 h-16 object-cover mt-2"
        />
      )}
    </div>
  );
};

export default ProductFields;