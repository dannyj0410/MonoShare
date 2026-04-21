import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ExpirationSelector from "../../../components/partials/CreateSecretPartials/ExpirationSelector";

describe("ExpirationSelector", () => {
  it("renders all three expiration options", () => {
    render(<ExpirationSelector onChange={vi.fn()} timeTillExpiration="7d" />);
    expect(screen.getByLabelText("7d")).toBeInTheDocument();
    expect(screen.getByLabelText("1d")).toBeInTheDocument();
    expect(screen.getByLabelText("1h")).toBeInTheDocument();
  });

  it("marks the currently selected option as checked", () => {
    render(<ExpirationSelector onChange={vi.fn()} timeTillExpiration="1d" />);
    const selected = screen.getByRole("radio", {
      name: "1d",
    }) as HTMLInputElement;
    expect(selected.checked).toBe(true);
  });

  it("marks the other options as unchecked", () => {
    render(<ExpirationSelector onChange={vi.fn()} timeTillExpiration="1d" />);
    const unselected7d = screen.getByRole("radio", {
      name: "7d",
    }) as HTMLInputElement;
    const unselected1h = screen.getByRole("radio", {
      name: "1h",
    }) as HTMLInputElement;
    expect(unselected7d.checked).toBe(false);
    expect(unselected1h.checked).toBe(false);
  });

  it("calls onChange when a different option is selected", () => {
    const onChange = vi.fn();
    render(<ExpirationSelector onChange={onChange} timeTillExpiration="7d" />);
    fireEvent.click(screen.getByLabelText("1h"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
