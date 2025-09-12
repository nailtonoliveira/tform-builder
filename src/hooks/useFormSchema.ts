import { z } from "zod";

import { FieldSchema } from "~/types/form";

export const useFormSchema = (fields: FieldSchema[]) => {
  const fieldSchemas: Record<string, unknown> = {};

  fields.forEach((field) => {
    if (field.type === "text") {
      let validator = z.string();
      if (field.validation?.required)
        validator = validator.min(1, "Campo obrigatório");
      if (field.validation?.maxLength)
        validator = validator.max(
          field.validation.maxLength,
          `Máximo de ${field.validation.maxLength} caracteres`
        );
      fieldSchemas[field.id] = validator;
    }

    if (field.type === "money") {
      let validator = z.preprocess(
        (value) =>
          value === "" || value === undefined || value === null
            ? undefined
            : Number(value),
        z.number().optional()
      );
      if (field.validation?.required)
        validator = validator.refine(
          (val) => !!val || Number(val) === 0,
          "Campo obrigatório"
        );
      if (field.validation?.minValue !== undefined)
        validator = validator.refine(
          (value) =>
            value === undefined ||
            (typeof value === "number" && value >= field.validation?.minValue!),
          `Valor mínimo de ${field.validation.minValue}`
        );
      if (field.validation?.maxValue !== undefined)
        validator = validator.refine(
          (value) =>
            value === undefined ||
            (typeof value === "number" && value <= field.validation?.maxValue!),
          `Valor máximo de ${field.validation.maxValue!}`
        );
      fieldSchemas[field.id] = validator;
    }

    if (field.type === "date") {
      let validator = z.preprocess(
        (value) => (value === null || value === undefined ? undefined : value),
        z.date().optional()
      );
      if (field.validation?.required) {
        validator = validator.refine(
          (value) => value !== undefined,
          "Campo obrigatório"
        );
      }

      if (field.validation?.allowPastDates === false) {
        validator = validator.refine(
          (value) => !value || (value as Date) >= new Date(),
          "Data não pode ser passada"
        );
      }
      fieldSchemas[field.id] = validator;
    }
  });

  return z.object(fieldSchemas);
};
