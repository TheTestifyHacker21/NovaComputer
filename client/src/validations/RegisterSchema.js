import * as yup from "yup";

export const RegisterSchema = yup.object().shape({
  uname: yup.string().required("username is required"),
  email: yup.string().email("Not valid email").required("Email is Required"),
  password: yup
    .string()
    .required("Password is Required")
    .min(4, "Minimum 4 characters required")
    .max(8, "Maximum 8 characters required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  profilepic: yup.string().notRequired(),
});
