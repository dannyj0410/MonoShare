import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import EmailInput from "../../../components/partials/AuthPartials/EmailInput";

const noop = vi.fn();

describe("EmailInput", () => {
  it("renders the email input field", () => {
    render(
      <EmailInput email="" onChange={noop} onBlur={noop} onFocus={noop} />,
    );
    expect(
      screen.getByPlaceholderText("example@gmail.com"),
    ).toBeInTheDocument();
  });

  it("displays the current email value", () => {
    render(
      <EmailInput
        email="user@test.com"
        onChange={noop}
        onBlur={noop}
        onFocus={noop}
      />,
    );
    expect(screen.getByDisplayValue("user@test.com")).toBeInTheDocument();
  });

  it("calls onChange when the user types", () => {
    const onChange = vi.fn();
    render(
      <EmailInput email="" onChange={onChange} onBlur={noop} onFocus={noop} />,
    );
    fireEvent.change(screen.getByPlaceholderText("example@gmail.com"), {
      target: { value: "new@email.com" },
    });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("calls onBlur when the input loses focus", () => {
    const onBlur = vi.fn();
    render(
      <EmailInput email="" onChange={noop} onBlur={onBlur} onFocus={noop} />,
    );
    fireEvent.blur(screen.getByPlaceholderText("example@gmail.com"));
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it("displays an error message when the error prop is provided", () => {
    render(
      <EmailInput
        email=""
        error="Incorrect email address"
        onChange={noop}
        onBlur={noop}
        onFocus={noop}
      />,
    );
    expect(screen.getByText("Incorrect email address")).toBeInTheDocument();
  });

  it("does not display an error message when the error prop is absent", () => {
    render(
      <EmailInput email="" onChange={noop} onBlur={noop} onFocus={noop} />,
    );
    expect(screen.queryByText(/incorrect/i)).not.toBeInTheDocument();
  });
});
