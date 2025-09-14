"use client";

import { Control, Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Grid from "@mui/material/Grid";

import { FieldSchema } from "~/types/form";

interface Props {
  field: FieldSchema;
  control: Control;
  error?: string;
  columns?: number;
}

export function DateFieldInput({ field, control, error, columns = 12 }: Props) {
  return (
    <Grid size={{ xs: 12, sm: columns }}>
      <Controller
        name={field.name}
        control={control}
        defaultValue={null}
        render={({ field: rhfField }) => (
          <DatePicker
            {...rhfField}
            label={field.label}
            disablePast={field.validation?.allowPastDates === false}
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
    </Grid>
  );
}
