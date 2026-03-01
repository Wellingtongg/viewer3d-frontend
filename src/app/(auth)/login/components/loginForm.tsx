"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Yup from "@/lib/yup";
import { Button } from "@/components/ui/button";
import { login } from "@/actions/authActions";
import { setErrors } from "@/lib/utils";
import { LoginParams } from "@/types/auth";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { SSOButtons, SSODivider } from "@/components/auth/ssoButtons";
import Input from "@/components/input";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6),
});

export function LoginForm() {
  const router = useRouter();

  const formik = useFormik<LoginParams>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, formikBag) => {
      const result = await login(values);

      if (result.success && result.data) {
        router.push("/admin");
        router.refresh();
      } else {
        setErrors<LoginParams>(result.data, formikBag);
      }
    },
  });

  return (
    <>
      <SSOButtons />
      <SSODivider />
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="seu@email.com"
          leftIcon={<Mail />}
          formik={formik}
        />

        <Input
          id="password"
          type="password"
          label="Senha"
          placeholder="••••••"
          leftIcon={<Lock />}
          formik={formik}
        />

        <Button
          type="submit"
          className="h-10 w-full gap-2"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Conectando...
            </>
          ) : (
            <>
              Fazer Login
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </>
  );
}
