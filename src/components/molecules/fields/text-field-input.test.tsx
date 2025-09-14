import { test, expect, afterEach, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm, FormProvider } from "react-hook-form";
import { faker } from "@faker-js/faker";

import { FieldSchema } from "~/types/form";

import { TextFieldInput } from "./text-field-input";

function Wrapper({ field, error }: { field: FieldSchema; error?: string }) {
  const methods = useForm({
    defaultValues: {
      [field.name]: "",
    },
  });
  return (
    <FormProvider {...methods}>
      <TextFieldInput field={field} control={methods.control} error={error} />
    </FormProvider>
  );
}

afterEach(() => {
  vi.clearAllMocks();
  cleanup();
});

test("should render with label and placeholder correctly", () => {
  const field: FieldSchema = {
    id: faker.string.uuid(),
    name: "product_name",
    type: "text",
    label: "Nome do Produto",
    placeholder: "Digite o nome",
    validation: { required: true },
    columns: 12,
  };

  render(<Wrapper field={field} />);

  expect(screen.getByLabelText(/Nome do Produto/i)).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText(/Digite o nome/i) as HTMLInputElement
  ).toBeInTheDocument();
});

test("should allows type and update valur correctly", async () => {
  const user = userEvent.setup();
  const field: FieldSchema = {
    id: faker.string.uuid(),
    name: "product_name",
    type: "text",
    label: "Nome do Produto",
    placeholder: "Digite o nome",
    validation: { required: true },
    columns: 12,
  };

  render(<Wrapper field={field} />);

  const input = screen.getByLabelText(/Nome do Produto/i);
  const valor = faker.commerce.productName();

  await user.type(input, valor);

  expect(input).toHaveValue(valor);
});

test("should show error message when error prop is passed", () => {
  const field: FieldSchema = {
    id: faker.string.uuid(),
    name: "product_name",
    type: "text",
    label: "Nome do Produto",
    placeholder: "Digite o nome",
    validation: { required: true },
    columns: 12,
  };

  render(<Wrapper field={field} error="This field is required" />);

  expect(screen.getByText(/This field is required/i)).toBeInTheDocument();
});
