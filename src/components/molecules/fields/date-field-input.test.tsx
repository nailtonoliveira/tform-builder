import { test, expect, afterEach, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm, FormProvider, Control } from "react-hook-form";
import { faker } from "@faker-js/faker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/pt-br";

import { FieldSchema } from "~/types/form";

import { DateFieldInput } from "./date-field-input";

function Wrapper({ field, error }: { field: FieldSchema; error?: string }) {
  const methods = useForm({
    defaultValues: {
      [field.name]: null,
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <FormProvider {...methods}>
        <DateFieldInput
          field={field}
          control={methods.control as Control}
          error={error}
        />
      </FormProvider>
    </LocalizationProvider>
  );
}

afterEach(() => {
  vi.clearAllMocks();
  cleanup();
});

test("should render with label", () => {
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

  const [, input] = screen.getAllByLabelText(
    /Release Date/i
  ) as HTMLInputElement[];

  expect(input).toBeInTheDocument();
});

test("should show error message when error prop is passed", () => {
  const field: FieldSchema = {
    id: faker.string.uuid(),
    name: "releaseDate",
    type: "date",
    label: "Release Date",
    placeholder: "",
    validation: { required: true, allowPastDates: false },
    columns: 12,
  };

  render(<Wrapper field={field} error="This date is required" />);

  expect(screen.getByText(/This date is required/i)).toBeInTheDocument();
});

test("should allow selecting a date value (simulate change)", async () => {
  const user = userEvent.setup();
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
  const [, input] = screen.getAllByLabelText(
    /Release Date/i
  ) as HTMLInputElement[];

  const testDate = "09092025";
  await user.type(input, testDate);

  expect(input.value).toContain("09/09/2025");
});
