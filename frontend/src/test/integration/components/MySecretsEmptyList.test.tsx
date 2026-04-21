import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MySecretsEmptyList from "../../../components/partials/MySecretsPartials/MySecretsEmptyList";

describe("MySecretsEmptyList", () => {
  it("renders the correct empty message for 'Active'", () => {
    render(<MySecretsEmptyList type="Active" />);
    expect(screen.getByText(/You have no/)).toBeInTheDocument();
    expect(screen.getByText(/Active/)).toBeInTheDocument();
    expect(screen.getByText(/secrets./)).toBeInTheDocument();
  });

  it("renders the correct secret type for 'Viewed'", () => {
    render(<MySecretsEmptyList type="Viewed" />);
    expect(screen.getByText(/You have no/)).toBeInTheDocument();
    expect(screen.getByText(/Viewed/)).toBeInTheDocument();
    expect(screen.getByText(/secrets./)).toBeInTheDocument();
  });

  it("renders the correct secret type for 'Expired'", () => {
    render(<MySecretsEmptyList type="Expired" />);
    expect(screen.getByText(/You have no/)).toBeInTheDocument();
    expect(screen.getByText(/Expired/)).toBeInTheDocument();
    expect(screen.getByText(/secrets./)).toBeInTheDocument();
  });

  it("applies blue text for the Active type", () => {
    render(<MySecretsEmptyList type="Active" />);
    const typeLabel = screen.getByText("Active");
    expect(typeLabel).toHaveClass("text-(--main-light-blue)");
  });

  it("applies green text for the Viewed type", () => {
    render(<MySecretsEmptyList type="Viewed" />);
    const typeLabel = screen.getByText("Viewed");
    expect(typeLabel).toHaveClass("text-green-500");
  });

  it("applies red text for the Expired type", () => {
    render(<MySecretsEmptyList type="Expired" />);
    const typeLabel = screen.getByText("Expired");
    expect(typeLabel).toHaveClass("text-red-500");
  });
});
