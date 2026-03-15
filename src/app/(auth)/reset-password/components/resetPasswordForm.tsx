"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useFormik } from "formik";
import Yup from "@/lib/yup";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "@/actions/authActions";
import { useState } from "react";
import { statusCodes } from "@/lib/utils";

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string().required().min(6),
  password_confirmation: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "As senhas não conferem"),
});

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [isInvalidToken, setIsInvalidToken] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      password_confirmation: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      const result = await resetPassword({
        reset_password_token: token,
        ...values,
      });

      if (result.success) {
        toast.success("Senha redefinida com sucesso!");
        router.push("/login");
      } else if (result.status === statusCodes.notFound) {
        setIsInvalidToken(true);
      } else {
        toast.error("Token inválido ou expirado. Solicite um novo link.");
      }
    },
  });

  if (!token || isInvalidToken) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-sm text-destructive">
          Link de redefinição inválido ou expirado.
        </p>
        <Link
          href="/forgot-password"
          className="text-sm text-primary hover:underline"
        >
          Solicitar novo link
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">Nova senha</Label>
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
        <Label htmlFor="password_confirmation">Confirmar nova senha</Label>
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
        {formik.isSubmitting ? "Salvando..." : "Redefinir senha"}
      </Button>
    </form>
  );
}
