import Yup from "@/lib/yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6),
});

export const signupSchema = Yup.object().shape({
  first_name: Yup.string().required().max(255),
  last_name: Yup.string().required().max(255),
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6),
  password_confirmation: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "As senhas não conferem"),
});

export type LoginFormValues = Yup.InferType<typeof loginSchema>;
export type SignupFormValues = Yup.InferType<typeof signupSchema>;
