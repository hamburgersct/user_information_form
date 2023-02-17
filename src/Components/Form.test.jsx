import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./Form";

test("render the component", () => {
  render(<Form />);
});

test("All elements appears on the page", () => {
  render(<Form />);

  expect(screen.getByTestId("fname-input")).toBeInTheDocument();
  expect(screen.getByTestId("lname-input")).toBeInTheDocument();
  expect(screen.getByTestId("email-input")).toBeInTheDocument();
  expect(screen.getByTestId("password-input")).toBeInTheDocument();
  expect(screen.getByTestId("confirmPassword-input")).toBeInTheDocument();
  expect(screen.getByTestId("lname-input")).toBeInTheDocument();
  expect(screen.getByTestId("submit-button")).toBeInTheDocument();
});

test("Form text input field work as expected", () => {
  render(<Form />);
  const fnameInput = screen.getByTestId("fname-input");
  const lnameInput = screen.getByTestId("lname-input");
  const emailInput = screen.getByTestId("email-input");
  const passwordInput = screen.getByTestId("password-input");
  const confirmPasswordInput = screen.getByTestId("confirmPassword-input");

  fireEvent.change(fnameInput, { target: { value: "fname" } });
  fireEvent.change(lnameInput, { target: { value: "lname" } });
  fireEvent.change(emailInput, {
    target: { value: "valid-email@email.com" },
  });
  fireEvent.change(passwordInput, { target: { value: "@ThisIsStrong123" } });
  fireEvent.change(confirmPasswordInput, {
    target: { value: "@ThisIsStrong123" },
  });

  expect(fnameInput.value).toBe("fname");
  expect(lnameInput.value).toBe("lname");
  expect(emailInput.value).toBe("valid-email@email.com");
  expect(passwordInput.value).toBe("@ThisIsStrong123");
  expect(confirmPasswordInput.value).toBe("@ThisIsStrong123");
});
