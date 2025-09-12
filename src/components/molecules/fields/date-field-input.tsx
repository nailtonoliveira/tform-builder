"use client";

import { Control, Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { FieldSchema } from "~/types/form";

interface Props {
  field: FieldSchema;
  control: Control;
  error?: string;
}

export function DateFieldInput({ field, control, error }: Props) {
  return (
    <Controller
      name={field.id}
      control={control}
      defaultValue={null}
      render={({ field: rhfField }) => (
        <DatePicker
          {...rhfField}
          label={field.label}
          slotProps={{
            textField: {
              error: !!error,
              helperText: error,
              fullWidth: true,
              InputLabelProps: {
                shrink: true,
              },
            },
          }}
        />
      )}
    />
  );
}
