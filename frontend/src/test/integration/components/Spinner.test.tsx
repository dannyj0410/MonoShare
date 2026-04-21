import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Spinner from "../../../components/loaders/Spinner";

describe("Spinner", () => {
  it("renders a spinner element with role='status'", () => {
    render(<Spinner size="size-4" thickness="border-2" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("applies the size class passed via props", () => {
    render(<Spinner size="size-8" thickness="border-2" />);
    expect(screen.getByRole("status")).toHaveClass("size-8");
  });

  it("applies the thickness class passed via props", () => {
    render(<Spinner size="size-4" thickness="border-4" />);
    expect(screen.getByRole("status")).toHaveClass("border-4");
  });

  it("applies a custom colour class when provided", () => {
    render(<Spinner size="size-4" thickness="border-2" clr="text-red-500" />);
    expect(screen.getByRole("status")).toHaveClass("text-red-500");
  });

  it("includes the animate-spin class for the spinning animation", () => {
    render(<Spinner size="size-4" thickness="border-2" />);
    expect(screen.getByRole("status")).toHaveClass("animate-spin");
  });
});
