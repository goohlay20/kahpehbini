import { Schema, model } from 'mongoose';

const userSchema =  new Schema(
  {
    username: {
      type: String
    },
    email: {
      type: String,
      required: [ true, "Email field is required." ],
    },
    password: {
      type: String,
      required: [ true, "Password field is required." ],
    },
    fullname: {
      firstName:{
        type: String,
        required: [true, "First name field is required."],
      },
      lastName:{
        type: String,
        required: [true, "Last name field is required."],
      }
    },
    address: {
      address:{
        type: String,
      },
      barangay:{
        type: String,
      },
      city:{
        type: String,
      },
      province:{
        type: String,
      },
      region:{
        type: String,
      },
      zipCode:{
        type: Number,
      },
    },
    role: {
      type: String,
      required: [ true, "Role field is required." ],
    },
    isDeleted: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
export default User;