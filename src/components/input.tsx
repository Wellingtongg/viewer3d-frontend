import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { FormikHelpers } from "formik";

interface InputProps {
  formik: FormikHelpers<any>;
  label: string;
  leftIcon: React.ReactNode;
  placeholder: string;
  id: string;
  type: string;
}

export default function Input({
  formik,
  label,
  leftIcon,
  placeholder,
  id,
  type,
}: InputProps) {
  return (
    <Field
      data-invalid={formik.touched[id] && formik.errors[id] ? "true" : false}
    >
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id={id}
          type={type}
          placeholder={placeholder}
          value={formik.values[id]}
          onChange={formik.handleChange(id)}
          onBlur={formik.handleBlur(id)}
        />
        <InputGroupAddon>
          <InputGroupText>{leftIcon}</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      {formik.touched[id] && formik.errors[id] && (
        <FieldDescription className="text-xs text-destructive">
          {formik.errors[id]}
        </FieldDescription>
      )}
    </Field>
  );
}
