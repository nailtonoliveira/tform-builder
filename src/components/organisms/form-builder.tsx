"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";

import { useFormSchema } from "~/hooks/useFormSchema";
import { FormSchema } from "~/types/form";

import { FormActions } from "./form-actions";
import { FormField } from "./form-field";

interface Props {
  formSchema: FormSchema;
}

export function FormBuilder({ formSchema }: Props) {
  const schemaZod = useFormSchema(formSchema.fields);

  const defaultValues = formSchema.fields.reduce((acc, field) => {
    switch (field.type) {
      case "text":
      case "money":
        acc[field.id] = "";
        break;
      case "date":
        acc[field.id] = null;
        break;
    }
    return acc;
  }, {} as Record<string, unknown>);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaZod),
    defaultValues,
  });

  const onSubmit = (data: Record<string, unknown>) => {
    console.log("Form values:", data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      {formSchema.fields.map((field) => (
        <FormField
          key={field.id}
          field={field}
          control={control}
          error={errors[field.id]?.message as string}
        />
      ))}

      <FormActions actions={formSchema.actions} />
    </Box>
  );
}
