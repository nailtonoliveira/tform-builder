"use client";

import { Box, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { FormBuilder } from "~/components";
import { FormSchema } from "~/types/form";

const formSchema: FormSchema = {
  id: "simple-form",
  title: "Cadastro de Produto",
  description: "Preencha os dados abaixo para cadastrar um novo produto.",
  fields: [
    {
      id: "name",
      name: "name",
      type: "text",
      label: "Nome do Produto",
      placeholder: "Digite o nome do produto",
      validation: { required: true, maxLength: 50 },
      columns: 7,
    },
    {
      id: "price",
      name: "price",
      type: "money",
      label: "Valor",
      placeholder: "0,00",
      validation: { required: true, minValue: 0.01, maxValue: 10000.0 },
      columns: 5,
    },
    {
      id: "releaseDate",
      name: "releaseDate",
      type: "date",
      label: "Data de Lançamento",
      validation: { required: true, allowPastDates: false },
    },
  ],
  actions: [
    {
      id: "save",
      type: "rest",
      label: "Salvar",
      endpoint: "/api/produtos",
      method: "POST",
    },
    {
      id: "cancel",
      type: "route",
      label: "Cancelar",
      route: "/",
    },
  ],
};

export default function SimpleForm() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: "flex", flexDirection: "column", rowGap: 4, py: 6 }}>
        <Box>
          <Typography variant="h5" fontWeight="bold">
            {formSchema.title}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {formSchema.description}
          </Typography>
        </Box>
        <FormBuilder formSchema={formSchema} />
      </Box>
    </LocalizationProvider>
  );
}
