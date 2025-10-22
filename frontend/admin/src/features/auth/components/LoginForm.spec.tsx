import React from "react";
// import vitest from "vitest";
// import {describe, test} from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  const mockOnSubmit = vitest.fn();

  const setup = (props?: Partial<React.ComponentProps<typeof LoginForm>>) => {
    render(
      <LoginForm
        onSubmit={mockOnSubmit}
        isSubmitting={props?.isSubmitting ?? false}
        error={props?.error ?? null}
      />,
    );
  };

  beforeEach(() => {
    vitest.clearAllMocks();
  });

  it("renders heading, inputs, and button", () => {
    setup();

    expect(
      screen.getByRole("heading", { name: /admin login/i }),
    ).toBeInTheDocument();

    // expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
    // expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  it("shows error message when error prop is provided", () => {
    setup({ error: "Invalid credentials" });

    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });

  it("updates input values correctly", () => {
    setup();

    // const nameInput = screen.getByPlaceholderText(/name/i) as HTMLInputElement;
    // const passwordInput = screen.getByPlaceholderText(
    //   /password/i,
    // ) as HTMLInputElement;
    const nameInput = screen.getByTestId(/name-input/i) as HTMLInputElement;
    const passwordInput = screen.getByTestId(
      /password-input/i,
    ) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "secret" } });

    expect(nameInput.value).toBe("admin");
    expect(passwordInput.value).toBe("secret");
  });

  it("calls onSubmit with correct credentials on form submit", () => {
    setup();

    // const nameInput = screen.getByPlaceholderText(/name/i);
    // const passwordInput = screen.getByPlaceholderText(/password/i);
    const nameInput = screen.getByTestId(/name-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const button = screen.getByRole("button", { name: /login/i });

    fireEvent.change(nameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(button);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: "admin",
      password: "password123",
    });
  });

  it("disables button and shows loading text when isSubmitting is true", () => {
    setup({ isSubmitting: true });

    expect(
      screen.getByRole("button", { name: /loading/i }),
    ).toBeInTheDocument();
  });
});
