import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Mail } from "lucide-react";

export default function Input({ formik }) {
  return (
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
  );
}
