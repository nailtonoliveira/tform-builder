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
  columns?: number;
}

export function FormField({ field, control, error, columns }: Props) {
  switch (field.type) {
    case "text":
      return (
        <TextFieldInput
          field={field}
          control={control}
          error={error}
          columns={columns}
        />
      );
    case "money":
      return (
        <MoneyFieldInput
          field={field}
          control={control}
          error={error}
          columns={columns}
        />
      );
    case "date":
      return (
        <DateFieldInput
          field={field}
          control={control}
          error={error}
          columns={columns}
        />
      );
    default:
      return null;
  }
}
