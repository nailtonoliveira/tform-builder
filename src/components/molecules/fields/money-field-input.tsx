"use client";

import { Control, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

import { FieldSchema } from "~/types/form";
import { InputAdornment } from "@mui/material";
import { maskCurrency } from "~/lib/masks";

interface Props {
  field: FieldSchema;
  control: Control;
  error?: string;
  columns?: number;
}

export function MoneyFieldInput({
  field,
  control,
  error,
  columns = 12,
}: Props) {
  return (
    <Grid size={{ xs: 12, sm: columns }}>
      <Controller
        name={field.name}
        control={control}
        defaultValue=""
        render={({ field: rhfField }) => (
          <TextField
            {...rhfField}
            type="text"
            label={field.label}
            placeholder={field.placeholder}
            error={!!error}
            helperText={error}
            fullWidth
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              input: {
                startAdornment: (
                  <InputAdornment position="start">R$</InputAdornment>
                ),
              },
            }}
            onChange={(e) => {
              const input = e.target.value;
              rhfField.onChange(maskCurrency(input));
            }}
          />
        )}
      />
    </Grid>
  );
}
