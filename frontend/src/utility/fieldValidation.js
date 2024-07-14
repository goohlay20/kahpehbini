// required field
export const requiredValidation = (fieldName, handleInputChange, trigger) => ({
  onChange: (e)=> {
    handleInputChange(e, fieldName);
    trigger(fieldName);
  },
  required: 'This field is required.',
});

// required field
export const emailValidation = (fieldName, handleInputChange, trigger) => ({
  onChange: (e) => {
    handleInputChange(e, fieldName);
    trigger(fieldName);
  },
  required: 'This field is required.',
    pattern: {
      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: 'Invalid email address',
    },
});

// minlength field
export const minLengthValidation = (fieldName, handleInputChange, trigger) => ({
  onChange: (e) => {
    handleInputChange(e, fieldName);
    trigger(fieldName);
  },
  required: 'This field is required.',
  minLength: {
    value: 3,
    message: 'Must be 3 or more characters.'
  }
});

// password field
export const passwordValidation = (fieldName, handleInputChange, trigger) => ({
  onChange: (e) => {
    handleInputChange(e, fieldName);
    trigger(fieldName);
  },
  required: 'This field is required.',
  minLength: {
    value: 8,
    message: 'Must be 8 or more characters.'
  }
});

// Currency field
export const currencyValidation = (fieldName, handleInputChange, trigger) => ({
  onChange: (e) => {
    handleInputChange(e, fieldName);
    trigger(fieldName);
  },
  required: 'This field is required.',
  validate: {
    validCurrency: (value) => {
      const regex = /^\d+(\.\d{1,2})?$/;
      return regex.test(value) || 'Invalid currency format.';
    }
  }
});

// upload image
export const imageValidation = (fieldName, handleInputChange, trigger, productDetails) => ({
  onChange: (e)=> {
    handleInputChange(e, fieldName);
    trigger(fieldName);
  },
  required: {
    value: productDetails.image !== undefined ? false : true,
    message: 'Please upload an image.',
  },          
  validate: {
    fileType: (value) => {
      if(productDetails.image !== undefined){
        if (productDetails.image.filename !== undefined && value.length === undefined) {
          return true;
        } else if (value.length === 0){
          return 'Please upload an image.'
        }
      }
      return value[0] && ['image/jpeg', 'image/png'].includes(value[0].type) || 'Unsupported file type.';
    },
  },
});

// region field
export const regionValidation = (fieldName, handleRegionChange, setSelectedRegion, regions, trigger) => ({
  onChange: (e)=> {
    setSelectedRegion(e.target.value)
    handleRegionChange(e.target.value, regions, true)
    trigger(fieldName);
  },
  required: 'Please select a Region',
});

// profile password case
export const profilePasswordValidation = (fieldName, handleInputChange, trigger) => ({
  onChange: (e) => {
    handleInputChange(e, fieldName);
    trigger(fieldName);
  },
  validate: {
    minLength: (value) => value === '' || value.length >= 8 || 'Must be 8 or more characters.'
  }
});