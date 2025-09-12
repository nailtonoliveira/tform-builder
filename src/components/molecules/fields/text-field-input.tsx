"use client";

import { Control, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

import { FieldSchema } from "~/types/form";

interface Props {
  field: FieldSchema;
  control: Control;
  error?: string;
}

export function TextFieldInput({ field, control, error }: Props) {
  return (
    <Controller
      name={field.id}
      control={control}
      defaultValue=""
      render={({ field: rhfField }) => (
        <TextField
          {...rhfField}
          label={field.label}
          placeholder={field.placeholder}
          error={!!error}
          helperText={error}
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
      )}
    />
  );
}
