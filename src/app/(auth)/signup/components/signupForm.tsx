"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Input from "@/components/input";
import Yup from "@/lib/yup";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { signup } from "@/actions/authActions";
import { setErrors } from "@/lib/utils";
import { SignupParams } from "@/types/auth";
import { SSOButtons, SSODivider } from "@/components/auth/ssoButtons";
import { Building2, Lock, Mail, User } from "lucide-react";

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
    <>
      <SSOButtons />
      <SSODivider />
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Input
            id="first_name"
            type="text"
            label="Nome"
            placeholder="João"
            leftIcon={<User />}
            formik={formik}
          />

          <Input
            id="last_name"
            type="text"
            label="Sobrenome"
            placeholder="Silva"
            leftIcon={<User />}
            formik={formik}
          />
        </div>

        <Input
          id="name"
          type="text"
          label="Nome da Empresa"
          placeholder="Sua empresa"
          leftIcon={<Building2 />}
          formik={formik}
        />

        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="seu@email.com"
          leftIcon={<Mail />}
          formik={formik}
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            id="password"
            type="password"
            label="Senha"
            placeholder="••••••••"
            leftIcon={<Lock />}
            formik={formik}
          />

          <Input
            id="password_confirmation"
            type="password"
            label="Confirmar senha"
            placeholder="••••••••"
            leftIcon={<Lock />}
            formik={formik}
          />
        </div>

        <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Criando conta..." : "Criar conta"}
        </Button>
      </form>
    </>
  );
}
