"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { toast } from "sonner";

import { useFormSchema } from "~/hooks/useFormSchema";
import { useSubmitForm } from "~/hooks/useSubmitForm";
import { FormSchema } from "~/types/form";
import { formatDate } from "~/lib/date";

import { FormActions } from "./form-actions";
import { FormField } from "./form-field";

interface Props {
  formSchema: FormSchema;
}

export function FormBuilder({ formSchema }: Props) {
  const router = useRouter();
  const schemaZod = useFormSchema(formSchema.fields);

  const defaultValues = formSchema.fields.reduce((acc, field) => {
    switch (field.type) {
      case "text":
      case "money":
        acc[field.name] = "";
        break;
      case "date":
        acc[field.name] = null;
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

  const submitMutation = useSubmitForm();

  const onSubmit = (data: Record<string, unknown>) => {
    const restAction = formSchema.actions.find((a) => a.type === "rest");
    if (!restAction || !restAction.endpoint || !restAction.method) return;

    submitMutation.mutate(
      {
        endpoint: restAction.endpoint,
        method: restAction.method,
        payload: data,
      },
      {
        onSuccess: () => {
          toast.success(`Sucesso`, {
            description: `Sucesso ao submeter o formulário ${formSchema.title}`,
          });

          if (restAction.on_success_route) {
            router.push(restAction.on_success_route);
            return;
          }

          router.back();
        },
      }
    );
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          p: 4,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "text.disabled",
          borderRadius: 2,
        }}
      >
        {formSchema.fields.map((field) => (
          <FormField
            key={field.id}
            field={field}
            control={control}
            error={errors[field.name]?.message as string}
            columns={field.columns}
          />
        ))}
      </Grid>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="caption" color="textSecondary">
          Ultima alteração em{" "}
          {formatDate(
            formSchema.updated_at || formSchema.created_at,
            "DD/MM/YYYY [às] HH:mm"
          )}
        </Typography>

        <FormActions
          actions={formSchema.actions}
          isLoading={submitMutation.isPending}
        />
      </Box>
    </Box>
  );
}
