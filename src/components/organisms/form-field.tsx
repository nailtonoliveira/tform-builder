"use client";

import { Control } from "react-hook-form";

import { FieldSchema } from "~/types/form";
import {
  DateFieldInput,
  MoneyFieldInput,
  TextFieldInput,
} from "../molecules/fields";

interface Props {
  field: FieldSchema;
  control: Control;
  error?: string;
}

export function FormField({ field, control, error }: Props) {
  switch (field.type) {
    case "text":
      return <TextFieldInput field={field} control={control} error={error} />;
    case "money":
      return <MoneyFieldInput field={field} control={control} error={error} />;
    case "date":
      return <DateFieldInput field={field} control={control} error={error} />;
    default:
      return null;
  }
}
