const mongoose = require("mongoose");
const yup = require("yup");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 25,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 70,
    },
    password: {
      type: String,
      required: true,
      match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@$!#%*?&]{8,}$/,
    },
    profilePic: {
      type: String,
      default: "https://i.ibb.co/xhbZ5fQ/download.png",
    },
  },
  { timestamps: true }
);

// adding id in schema 
userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
userSchema.set("toJSON", {
  virtuals: true,
});

// yup validation
const userValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(3, "Full name should be at least 3 characters long")
    .max(25, "Full name should not exceed 25 characters"),

  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password should be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@$!#%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  profilePic: yup.string().default("https://i.ibb.co/xhbZ5fQ/download.png"),
});

const validateUser = async (userData) => {
  try {
    await userValidationSchema.validate(userData, { abortEarly: false });
    return { isValid: true };
  } catch (error) {
    return { isValid: false, error: error.errors };
  }
};

const User = mongoose.model("User", userSchema);
module.exports = { User, validateUser };
