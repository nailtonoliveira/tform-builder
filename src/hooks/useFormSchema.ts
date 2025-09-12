import { z } from "zod";
import { Dayjs } from "dayjs";

import { FieldSchema } from "~/types/form";
import { formatCurrencyInput, parseCurrencyToNumber } from "~/lib/formatters";

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

      fieldSchemas[field.name] = validator;
    }

    if (field.type === "money") {
      let validator = z.preprocess((value) => {
        if (value === "" || value === undefined || value === null)
          return undefined;

        return parseCurrencyToNumber(value as string);
      }, z.number().optional());

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
          `Valor mínimo de R$${formatCurrencyInput(
            field.validation.minValue.toString()
          )}`
        );

      if (field.validation?.maxValue !== undefined)
        validator = validator.refine(
          (value) =>
            value === undefined ||
            (typeof value === "number" && value <= field.validation?.maxValue!),
          `Valor máximo de R$${formatCurrencyInput(
            field.validation.maxValue.toString()
          )!}`
        );

      fieldSchemas[field.name] = validator;
    }

    if (field.type === "date") {
      let validator = z.preprocess(
        (value) => {
          if (value == null || value === "") return undefined;

          let d: Date;
          if (typeof value === "object" && (value as Dayjs).toDate) {
            d = (value as Dayjs).toDate();
          } else {
            d = value as Date;
          }

          const year = d.getFullYear();
          const month = String(d.getMonth() + 1).padStart(2, "0");
          const day = String(d.getDate()).padStart(2, "0");
          return `${year}-${month}-${day}`;
        },
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida")
          .optional()
      );

      if (field.validation?.required) {
        validator = validator.refine(
          (value) => value !== undefined,
          "Campo obrigatório"
        );
      }

      if (field.validation?.allowPastDates === false) {
        validator = validator.refine((value) => {
          if (!value) return true;
          const [y, m, d] = (value as string).split("-").map(Number);
          const chosen = new Date(y, m - 1, d);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          chosen.setHours(0, 0, 0, 0);
          return chosen.getTime() >= today.getTime();
        }, "Data não pode ser no passado");
      }

      fieldSchemas[field.name] = validator;
    }
  });

  return z.object(fieldSchemas);
};
