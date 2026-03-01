"use client";

import { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import Yup from "@/lib/yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPassword } from "@/actions/authActions";
import { ForgotPasswordParams } from "@/types/auth";

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email().required(),
});

export function ForgotPasswordForm() {
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik<ForgotPasswordParams>({
    initialValues: { email: "" },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      await forgotPassword(values);
      setSubmitted(true);
    },
  });

  if (submitted) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-sm text-muted-foreground">
          Se este e-mail estiver cadastrado, você receberá as instruções para
          redefinir sua senha em breve.
        </p>
        <Link href="/login" className="text-sm text-primary hover:underline">
          Voltar para o login
        </Link>
      </div>
    );
  }

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

      <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? "Enviando..." : "Enviar Link"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Lembrou a senha?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Entrar
        </Link>
      </p>
    </form>
  );
}
