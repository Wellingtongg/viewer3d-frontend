import { Errors, ResponseWithErrors } from "@/types/general";
import { clsx, type ClassValue } from "clsx";
import { FormikHelpers } from "formik";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function setErrors<T>(data: ResponseWithErrors | null | undefined, formikBag: FormikHelpers<T>) {
  setFormikErrors<T>(data?.errors, formikBag);
  if (data?.error) {
    toast.error(data.error);
  }
}

export function setFormikErrors<T>(
  errors: Errors | undefined,
  formikBag: FormikHelpers<T>,
) {
  if (errors && formikBag) {
    Object.entries(errors).map((error) => {
      const [fieldName, errorMessage] = error;
      if (errorMessage?.[0] && typeof errorMessage[0] === "string") {
        formikBag.setFieldError(fieldName, capitalize(errorMessage[0]));
      } else {
        formikBag.setFieldError(fieldName, errorMessage);
      }
      formikBag.setFieldTouched(fieldName, true, false);
    });
  }
}

export const SESSION_COOKIE = "_viewer3d_session";

export const statusCodes = {
  ok: 200,
  created: 201,
  noContent: 204,
  unprocessableEntity: 422,
  unauthorized: 401,
  payment_required: 402,
  forbidden: 403,
};
