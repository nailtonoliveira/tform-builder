import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import { faker } from "@faker-js/faker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { FieldSchema, FieldType } from "~/types/form";

import { FormField } from "./form-field";

function Wrapper({ field }: { field: FieldSchema }) {
  const methods = useForm({
    defaultValues: {
      [field.name]: field.type === "date" ? null : "",
    },
  });
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormProvider {...methods}>
        <FormField field={field} control={methods.control} />
      </FormProvider>
    </LocalizationProvider>
  );
}

test("should render a TextFieldInput when type is text", () => {
  const field: FieldSchema = {
    id: faker.string.uuid(),
    name: "product_name",
    type: "text",
    label: "Product Name",
    placeholder: "Enter product name",
    validation: { required: true },
    columns: 12,
  };

  render(<Wrapper field={field} />);

  expect(screen.getByLabelText(/Product Name/i)).toBeInTheDocument();
});

test("should render a MoneyFieldInput when type is money", () => {
  const field: FieldSchema = {
    id: faker.string.uuid(),
    name: "price",
    type: "money",
    label: "Price",
    placeholder: "0,00",
    validation: { required: true },
    columns: 12,
  };

  render(<Wrapper field={field} />);

  expect(screen.getByText("R$")).toBeInTheDocument();
});

test("should render a DateFieldInput when type is date", () => {
  const field: FieldSchema = {
    id: faker.string.uuid(),
    name: "releaseDate",
    type: "date",
    label: "Release Date",
    placeholder: "",
    validation: { required: true, allowPastDates: false },
    columns: 12,
  };

  render(<Wrapper field={field} />);
  const [, input] = screen.getAllByLabelText(/Release Date/i);

  expect(input).toBeInTheDocument();
});

test("should return null when type is unknown", () => {
  const field: FieldSchema = {
    id: faker.string.uuid(),
    name: "unknownField",
    type: "unknown" as FieldType,
    label: "Unknown",
    placeholder: "",
    validation: {},
    columns: 12,
  };

  const { container } = render(<Wrapper field={field} />);

  expect(container.firstChild).toBeNull();
});
