import React from "react";

const SignUpFields = ({ field, register, handleInputChange, trigger, errors, userDetails }) => {
    return (
    <>
        { field.type === "text" &&
            <div className="w-full lg:w-1/2">
                <label 
                    htmlFor={field.name} 
                    className="block text-sm font-medium text-gray-700">
                    {field.label}
                </label>
                <input 
                    type={field.type}
                    id={field.name} 
                    name={field.name} className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" 
                    defaultValue={userDetails[field.name] || ''}
                    aria-invalid={errors[field.name] ? "true" : "false"}
                    {...register(field.name, field.validation(field.name, handleInputChange, trigger))}
                /> 
                {errors[field.name] && (
                    <div className="w-full flex justify-end mt-1">
                    <span className="font-normal text-xs leading-4 tracking-wide text-left text-[#D32F2F]">
                        {errors[field.name].message}
                    </span>
                    </div>
                )}   
            </div>
        }  

        { field.type !== "text" && 
            <div className="mt-3">
                <label 
                    htmlFor={field.name} 
                    className="block text-sm font-medium text-gray-700">
                    {field.label}
                </label>
                <input 
                    type={field.type}
                    id={field.name} 
                    name={field.name} 
                    className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" 
                    defaultValue={userDetails[field.name] || ''}
                    aria-invalid={errors[field.name] ? "true" : "false"}
                    {...register(field.name, field.validation(field.name, handleInputChange, trigger))}
                />
                {errors[field.name] && (
                    <div className="w-full flex justify-end mt-1">
                    <span className="font-normal text-xs leading-4 tracking-wide text-left text-[#D32F2F]">
                        {errors[field.name].message}
                    </span>
                    </div>
                )}
            </div>
        } 
    </>
    )
}
export default SignUpFields;