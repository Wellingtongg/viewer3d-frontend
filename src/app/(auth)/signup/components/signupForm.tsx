"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Yup from "@/lib/yup";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "@/actions/authActions";
import { setErrors } from "@/lib/utils";
import { SignupParams } from "@/types/auth";

export const signupSchema = Yup.object().shape({
  name: Yup.string().required().max(255),
  first_name: Yup.string().required().max(255),
  last_name: Yup.string().required().max(255),
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6),
  password_confirmation: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "As senhas não conferem"),
});

export function SignupForm() {
  const router = useRouter();

  const formik = useFormik<SignupParams>({
    initialValues: {
      name: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values, formikBag) => {
      const result = await signup(values);

      if (result.success && result.data) {
        toast.success("Conta criada com sucesso!");
        router.push("/admin");
        router.refresh();
      } else {
        setErrors<SignupParams>(result.data, formikBag);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome da Empresa</Label>
        <Input
          id="name"
          type="text"
          placeholder="Nome da sua empresa"
          value={formik.values.name}
          onChange={formik.handleChange("name")}
          onBlur={formik.handleBlur("name")}
          className={
            formik.touched.name && formik.errors.name
              ? "border-destructive"
              : ""
          }
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-sm text-destructive">{formik.errors.name}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="first_name">Nome</Label>
        <Input
          id="first_name"
          type="text"
          placeholder="Seu nome"
          value={formik.values.first_name}
          onChange={formik.handleChange("first_name")}
          onBlur={formik.handleBlur("first_name")}
          className={
            formik.touched.first_name && formik.errors.first_name
              ? "border-destructive"
              : ""
          }
        />
        {formik.touched.first_name && formik.errors.first_name && (
          <p className="text-sm text-destructive">{formik.errors.first_name}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="last_name">Sobrenome</Label>
        <Input
          id="last_name"
          type="text"
          placeholder="Seu sobrenome"
          value={formik.values.last_name}
          onChange={formik.handleChange("last_name")}
          onBlur={formik.handleBlur("last_name")}
          className={
            formik.touched.last_name && formik.errors.last_name
              ? "border-destructive"
              : ""
          }
        />
        {formik.touched.last_name && formik.errors.last_name && (
          <p className="text-sm text-destructive">{formik.errors.last_name}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={formik.values.email}
          onChange={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          className={
            formik.touched.email && formik.errors.email
              ? "border-destructive"
              : ""
          }
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-sm text-destructive">{formik.errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••"
          value={formik.values.password}
          onChange={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          className={
            formik.touched.password && formik.errors.password
              ? "border-destructive"
              : ""
          }
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-sm text-destructive">{formik.errors.password}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password_confirmation">Confirmar Senha</Label>
        <Input
          id="password_confirmation"
          type="password"
          placeholder="••••••"
          value={formik.values.password_confirmation}
          onChange={formik.handleChange("password_confirmation")}
          onBlur={formik.handleBlur("password_confirmation")}
          className={
            formik.touched.password_confirmation &&
            formik.errors.password_confirmation
              ? "border-destructive"
              : ""
          }
        />
        {formik.touched.password_confirmation &&
          formik.errors.password_confirmation && (
            <p className="text-sm text-destructive">
              {formik.errors.password_confirmation}
            </p>
          )}
      </div>

      <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? "Criando conta..." : "Criar conta"}
      </Button>
    </form>
  );
}
