import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CharCounter from "../../../components/partials/CreateSecretPartials/CharCounter";

describe("CharCounter", () => {
  it("displays the current character count and limit", () => {
    render(<CharCounter charCount={"hello".length} charLimit={1000} />);
    expect(screen.getByText("5 / 1000")).toBeInTheDocument();
  });

  it("shows 0 when the secret is empty", () => {
    render(<CharCounter charCount={"".length} charLimit={1000} />);
    expect(screen.getByText("0 / 1000")).toBeInTheDocument();
  });

  it("applies red styling when the count exceeds the limit", () => {
    const overLimit = "a".repeat(1001).length;
    render(<CharCounter charCount={overLimit} charLimit={1000} />);
    const counter = screen.getByText("1001 / 1000");
    expect(counter).toHaveClass("text-red-400");
  });

  it("applies white styling when the count is within the limit", () => {
    render(<CharCounter charCount={"safe".length} charLimit={1000} />);
    const counter = screen.getByText("4 / 1000");
    expect(counter).toHaveClass("text-(--white)");
  });
});
