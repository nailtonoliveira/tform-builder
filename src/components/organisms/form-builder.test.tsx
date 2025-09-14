import { test, expect, vi, afterEach, beforeAll, afterAll } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { Toaster } from "sonner";

import { FormSchema } from "~/types/form";
import { QueryClientWrapperMock } from "~/test-helpers/query-client-wrapper.mock";

import { FormBuilder } from "./form-builder";

const handlers = [
  http.post("/api/save", () => {
    return HttpResponse.json({ success: true }, { status: 200 });
  }),
];

const server = setupServer(...handlers);

const mockedRouterPush = vi.fn();
const mockedRouterBack = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockedRouterPush,
    back: mockedRouterBack,
  }),
}));

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  vi.clearAllMocks();
  cleanup();
});

afterAll(() => {
  server.close();
});

test("should render fields from formSchema", () => {
  const formSchema: FormSchema = {
    id: faker.string.uuid(),
    title: "Test Form",
    slug: "TestForm",
    description: "desc",
    fields: [
      {
        id: faker.string.uuid(),
        name: "product_name",
        type: "text",
        label: "Product Name",
        placeholder: "Enter product name",
      },
      {
        id: faker.string.uuid(),
        name: "price",
        type: "money",
        label: "Price",
        placeholder: "0,00",
      },
      {
        id: faker.string.uuid(),
        name: "releaseDate",
        type: "date",
        label: "Release Date",
        placeholder: "",
      },
    ],
    actions: [
      {
        id: faker.string.uuid(),
        type: "rest",
        label: "Save",
        endpoint: "/api/save",
        method: "POST",
      },
    ],
  };

  render(
    <QueryClientWrapperMock>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormBuilder formSchema={formSchema} />
      </LocalizationProvider>
    </QueryClientWrapperMock>
  );

  expect(screen.getByLabelText(/Product Name/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument();
});

test("should call mutate with form data when submit", async () => {
  const formSchema: FormSchema = {
    id: faker.string.uuid(),
    title: "Test Form",
    slug: "TestForm",
    description: "desc",
    fields: [
      {
        id: faker.string.uuid(),
        name: "product_name",
        type: "text",
        label: "Product Name",
        placeholder: "Enter product name",
        columns: 12,
      },
    ],
    actions: [
      {
        id: faker.string.uuid(),
        type: "rest",
        label: "Save",
        endpoint: "/api/save",
        method: "POST",
      },
    ],
  };

  render(
    <QueryClientWrapperMock>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormBuilder formSchema={formSchema} />
        <Toaster />
      </LocalizationProvider>
    </QueryClientWrapperMock>
  );

  const input = screen.getByLabelText(/Product Name/i);
  await userEvent.type(input, "Test Product");

  const button = screen.getByRole("button", { name: /Save/i });
  await userEvent.click(button);

  expect(
    await screen.findByText(
      `Sucesso ao submeter o formulário ${formSchema.title}`
    )
  ).toBeInTheDocument();

  await waitFor(() => {
    expect(mockedRouterBack).toHaveBeenCalledTimes(1);
  });
});

test("should redirect correctly when on_success_route is set after form submit", async () => {
  const formSchema: FormSchema = {
    id: faker.string.uuid(),
    title: "Test Form",
    slug: "TestForm",
    description: "desc",
    fields: [
      {
        id: faker.string.uuid(),
        name: "product_name",
        type: "text",
        label: "Product Name",
        placeholder: "Enter product name",
        columns: 12,
      },
    ],
    actions: [
      {
        id: faker.string.uuid(),
        type: "rest",
        label: "Save",
        endpoint: "/api/save",
        method: "POST",
        on_success_route: "/success-submit",
      },
    ],
  };

  render(
    <QueryClientWrapperMock>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormBuilder formSchema={formSchema} />
        <Toaster />
      </LocalizationProvider>
    </QueryClientWrapperMock>
  );

  const input = screen.getByLabelText(/Product Name/i);
  await userEvent.type(input, "Test Product");

  const button = screen.getByRole("button", { name: /Save/i });
  await userEvent.click(button);

  expect(
    await screen.findByText(
      `Sucesso ao submeter o formulário ${formSchema.title}`
    )
  ).toBeInTheDocument();

  await waitFor(() => {
    expect(mockedRouterPush).toHaveBeenCalledTimes(1);
    expect(mockedRouterPush).toHaveBeenCalledWith("/success-submit");
  });
});
