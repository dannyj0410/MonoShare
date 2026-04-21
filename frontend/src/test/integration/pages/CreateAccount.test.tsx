import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreateAccount from "../../../components/pages/AuthPages/CreateAccount";

vi.mock("../../../hooks/authHooks/useRegister", () => ({
  useRegister: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );
};

describe("CreateAccount page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders three inputs: email, password, and confirm password", () => {
    render(<CreateAccount />, { wrapper: createWrapper() });
    expect(
      screen.getByPlaceholderText("example@gmail.com"),
    ).toBeInTheDocument();
    const passwordFields = screen.getAllByPlaceholderText("********");
    expect(passwordFields).toHaveLength(2);
  });

  it("renders the Create Account submit button", () => {
    render(<CreateAccount />, { wrapper: createWrapper() });
    expect(
      screen.getByRole("button", { name: /create account/i }),
    ).toBeInTheDocument();
  });

  it("shows an error when passwords do not match on submit", async () => {
    render(<CreateAccount />, { wrapper: createWrapper() });

    fireEvent.change(screen.getByPlaceholderText("example@gmail.com"), {
      target: { name: "email", value: "user@test.com" },
    });

    const [passwordField, confirmField] =
      screen.getAllByPlaceholderText("********");
    fireEvent.change(passwordField, {
      target: { name: "password", value: "password123" },
    });
    fireEvent.change(confirmField, {
      target: { name: "confirm", value: "doesnotmatch" },
    });

    fireEvent.blur(confirmField);

    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
  });

  it("shows an error when the email format is invalid", async () => {
    render(<CreateAccount />, { wrapper: createWrapper() });

    const emailInput = screen.getByPlaceholderText("example@gmail.com");
    fireEvent.change(emailInput, {
      target: { name: "email", value: "notvalid" },
    });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText(/incorrect email/i)).toBeInTheDocument();
    });
  });

  it("contains a link back to the sign-in page", () => {
    render(<CreateAccount />, { wrapper: createWrapper() });
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });
});
