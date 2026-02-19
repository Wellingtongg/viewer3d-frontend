"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Yup from "@/lib/yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/actions/authActions";
import { setErrors } from "@/lib/utils";
import { LoginParams } from "@/types/auth";

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
    <form onSubmit={formik.handleSubmit} className="space-y-4">
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
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Senha</Label>
          <Link
            href="/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            Esqueci minha senha
          </Link>
        </div>
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

      <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? "Entrando..." : "Entrar"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Não tem uma conta?{" "}
        <Link href="/signup" className="text-primary hover:underline">
          Cadastre-se
        </Link>
      </p>
    </form>
  );
}
