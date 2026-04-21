import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignIn from "../../../components/pages/AuthPages/SignIn";

// ─── Mock the hooks that SignIn depends on ────────────────────────────────

vi.mock("../../../hooks/authHooks/useSignin", () => ({
  useSignin: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}));

// ─── Test helpers ────────────────────────────────────────────────────────

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

// ─── Sign In Tests ────────────────────────────────────────────────────────

describe("SignIn page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the email and password inputs", () => {
    render(<SignIn />, { wrapper: createWrapper() });
    expect(
      screen.getByPlaceholderText("example@gmail.com"),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("********")).toBeInTheDocument();
  });

  it("renders the Sign In button", () => {
    render(<SignIn />, { wrapper: createWrapper() });
    expect(
      screen.getByRole("button", { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  it("shows a validation error when the email is invalid", async () => {
    render(<SignIn />, { wrapper: createWrapper() });
    const emailInput = screen.getByPlaceholderText("example@gmail.com");
    fireEvent.change(emailInput, {
      target: { name: "email", value: "notvalid" },
    });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText(/incorrect email/i)).toBeInTheDocument();
    });
  });

  it("shows a validation error when the password is too short", async () => {
    render(<SignIn />, { wrapper: createWrapper() });

    const passwordInput = screen.getByPlaceholderText("********");
    fireEvent.change(passwordInput, {
      target: { name: "password", value: "abc" },
    });
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(screen.getByText(/at least 6 characters/i)).toBeInTheDocument();
    });
  });

  it("contains a link to the create account page", () => {
    render(<SignIn />, { wrapper: createWrapper() });
    expect(screen.getByText(/create account/i)).toBeInTheDocument();
  });
});
