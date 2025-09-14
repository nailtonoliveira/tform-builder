import { test, expect, vi, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm, FormProvider } from "react-hook-form";
import { faker } from "@faker-js/faker";

import { FieldSchema } from "~/types/form";

import { MoneyFieldInput } from "./money-field-input";

function Wrapper({ field, error }: { field: FieldSchema; error?: string }) {
  const methods = useForm({
    defaultValues: {
      [field.name]: "",
    },
  });
  return (
    <FormProvider {...methods}>
      <MoneyFieldInput field={field} control={methods.control} error={error} />
    </FormProvider>
  );
}

afterEach(() => {
  vi.clearAllMocks();
  cleanup();
});

test("should render with label, placeholder and currency adornment", () => {
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

  const input = screen.getByLabelText(/Price/i);
  expect(input).toBeInTheDocument();
  expect(input).toHaveAttribute("placeholder", "0,00");

  expect(screen.getByText("R$")).toBeInTheDocument();
});

test("should update value with masked currency when typing", async () => {
  const user = userEvent.setup();
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
  const input = screen.getByLabelText(/Price/i) as HTMLInputElement;

  await user.type(input, "123");

  expect(input.value).toContain("1,23");
});

test("should show error message when error prop is passed", () => {
  const field: FieldSchema = {
    id: faker.string.uuid(),
    name: "price",
    type: "money",
    label: "Price",
    placeholder: "0,00",
    validation: { required: true },
    columns: 12,
  };

  render(<Wrapper field={field} error="This field is required" />);

  expect(screen.getByText(/This field is required/i)).toBeInTheDocument();
});
