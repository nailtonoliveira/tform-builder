import { test, expect, afterEach, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ActionSchema } from "~/types/form";

import { FormActions } from "./form-actions";

afterEach(() => {
  vi.clearAllMocks();
  cleanup();
});

test("should render a submit button for rest actions", () => {
  const actions: ActionSchema[] = [
    {
      id: "1",
      type: "rest",
      label: "Save",
      endpoint: "/api/save",
      method: "POST",
    },
  ];

  render(<FormActions actions={actions} />);

  const button = screen.getByRole("button", { name: /Save/i });
  expect(button).toBeInTheDocument();
  expect(button).toHaveAttribute("type", "submit");
});

test("should render a button for route actions and navigate on click", async () => {
  const user = userEvent.setup();
  const actions: ActionSchema[] = [
    {
      id: "2",
      type: "route",
      label: "Back",
      route: "/home",
    },
  ];

  const originalHref = window.location.href;
  Object.defineProperty(window, "location", {
    value: { href: "" },
    writable: true,
  });

  render(<FormActions actions={actions} />);

  const button = screen.getByRole("button", { name: /Back/i });
  expect(button).toBeInTheDocument();
  expect(button).toHaveAttribute("type", "button");

  await user.click(button);

  expect(window.location.href).toBe("/home");

  window.location.href = originalHref;
});

test("should disable buttons when isLoading is true", () => {
  const actions: ActionSchema[] = [
    {
      id: "1",
      type: "rest",
      label: "Save",
      endpoint: "/api/save",
      method: "POST",
    },
    {
      id: "2",
      type: "route",
      label: "Back",
      route: "/home",
    },
  ];

  render(<FormActions actions={actions} isLoading={true} />);

  const buttons = screen.getAllByRole("button");
  buttons.forEach((btn) => expect(btn).toBeDisabled());
});
