"use client";

import { Control, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

import { FieldSchema } from "~/types/form";

interface Props {
  field: FieldSchema;
  control: Control;
  error?: string;
  columns?: number;
}

export function TextFieldInput({ field, control, error, columns = 12 }: Props) {
  return (
    <Grid size={{ xs: 12, sm: columns }}>
      <Controller
        name={field.name}
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
            sx={{}}
          />
        )}
      />
    </Grid>
  );
}
