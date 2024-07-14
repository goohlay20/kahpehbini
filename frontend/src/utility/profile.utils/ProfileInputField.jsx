import React from "react";

const ProfileInputField = ({ profile, fieldName, type, formEditable, register, validation, handleInputChange, trigger, errors }) => {
  return(
    <input
    type={type}
    name={fieldName}
    defaultValue={profile[fieldName] || ''}
    id={fieldName}
    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
    disabled={!formEditable}
    aria-invalid={errors[fieldName] ? "true" : "false"}
    {...register(fieldName, validation(fieldName, handleInputChange, trigger))}
  />
  )
}

export default ProfileInputField;

{/* <ProfileInputField
profile={profile}
fieldName={"email"}
type={"email"}
formEditable={formEditable}
register={register}
validation={emailValidation}
handleInputChange={handleInputChange}
trigger={trigger}
errors={errors}
/> */}