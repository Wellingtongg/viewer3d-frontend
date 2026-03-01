"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Yup from "@/lib/yup";
import { Button } from "@/components/ui/button";
import { login } from "@/actions/authActions";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { setErrors } from "@/lib/utils";
import { LoginParams } from "@/types/auth";
import { Mail, Lock, ArrowRight, Apple, Loader2 } from "lucide-react"; // Importei Apple aqui
import { SSOButtons, SSODivider } from "@/components/auth/ssoButtons";

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
        <Field
          data-invalid={
            formik.touched.email && formik.errors.email ? "true" : false
          }
        >
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={formik.values.email}
              onChange={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
            />
            <InputGroupAddon>
              <InputGroupText>
                <Mail />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          {formik.touched.email && formik.errors.email && (
            <FieldDescription className="text-xs text-destructive">
              {formik.errors.email}
            </FieldDescription>
          )}
        </Field>

        <Field
          data-invalid={
            formik.touched.password && formik.errors.password ? "true" : false
          }
        >
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="password"
              type="password"
              placeholder="••••••"
              value={formik.values.password}
              onChange={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
            />
            <InputGroupAddon>
              <InputGroupText>
                <Mail />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          {formik.touched.password && formik.errors.password && (
            <FieldDescription className="text-xs text-destructive">
              {formik.errors.password}
            </FieldDescription>
          )}
        </Field>

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
