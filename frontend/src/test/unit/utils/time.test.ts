import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { calcTimePastCreation } from "../../../utils/time/calcTimePastCreation";
import { calcTimeRemaining } from "../../../utils/time/calcTimeRemaining";
import { getTimePercentage } from "../../../utils/time/getTimePercentage";
import { formatDate } from "../../../utils/time/formatDate";

// ─── calcTimePastCreation ────────────────────────────────────────────────────

describe("calcTimePastCreation", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns "Xs ago" for a recent creation', () => {
    const now = new Date("2026-01-01T12:00:30Z");
    vi.setSystemTime(now);
    const createdAt = new Date("2026-01-01T12:00:00Z").toISOString();
    expect(calcTimePastCreation(createdAt)).toBe("30s ago");
  });

  it('returns "Xm ago" for a creation several minutes ago', () => {
    const now = new Date("2026-01-01T12:05:00Z");
    vi.setSystemTime(now);
    const createdAt = new Date("2026-01-01T12:00:00Z").toISOString();
    expect(calcTimePastCreation(createdAt)).toBe("5m ago");
  });

  it('returns "Xh ago" for a creation several hours ago', () => {
    const now = new Date("2026-01-01T15:00:00Z");
    vi.setSystemTime(now);
    const createdAt = new Date("2026-01-01T12:00:00Z").toISOString();
    expect(calcTimePastCreation(createdAt)).toBe("3h ago");
  });

  it('returns "Xd ago" for a creation several days ago', () => {
    const now = new Date("2026-01-04T12:00:00Z");
    vi.setSystemTime(now);
    const createdAt = new Date("2026-01-01T12:00:00Z").toISOString();
    expect(calcTimePastCreation(createdAt)).toBe("3d ago");
  });

  it('returns "just now" when the difference is under a second', () => {
    const now = new Date("2026-01-01T12:00:00.500Z");
    vi.setSystemTime(now);
    const createdAt = new Date("2026-01-01T12:00:00Z").toISOString();
    expect(calcTimePastCreation(createdAt)).toBe("just now");
  });
});

// ─── calcTimeRemaining ───────────────────────────────────────────────────────

describe("calcTimeRemaining", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns "Expired" when the expiry is in the past', () => {
    vi.setSystemTime(new Date("2026-01-02T00:00:00Z"));
    const expiresAt = new Date("2026-01-01T00:00:00Z").toISOString();
    expect(calcTimeRemaining(expiresAt)).toBe("Expired");
  });

  it('returns "Xd Xh" when more than a day remains', () => {
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
    const expiresAt = new Date("2026-01-03T06:00:00Z").toISOString();
    expect(calcTimeRemaining(expiresAt)).toBe("2d 6h");
  });

  it('returns "Xh Xm" when hours remain but less than a day', () => {
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
    const expiresAt = new Date("2026-01-01T03:30:00Z").toISOString();
    expect(calcTimeRemaining(expiresAt)).toBe("3h 30m");
  });

  it('returns "Xm Xs" when only minutes remain', () => {
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
    const expiresAt = new Date("2026-01-01T00:10:45Z").toISOString();
    expect(calcTimeRemaining(expiresAt)).toBe("10m 45s");
  });

  it('returns "Xs" when only seconds remain', () => {
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
    const expiresAt = new Date("2026-01-01T00:00:30Z").toISOString();
    expect(calcTimeRemaining(expiresAt)).toBe("30s");
  });
});

// ─── getTimePercentage ───────────────────────────────────────────────────────

describe("getTimePercentage", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns '0' at the exact creation time", () => {
    const start = "2026-01-01T00:00:00Z";
    const end = "2026-01-02T00:00:00Z";
    vi.setSystemTime(new Date(start));
    expect(getTimePercentage(start, end)).toBe("0");
  });

  it("returns '50' at the halfway point", () => {
    const start = "2026-01-01T00:00:00Z";
    const end = "2026-01-03T00:00:00Z";
    vi.setSystemTime(new Date("2026-01-02T00:00:00Z"));
    expect(getTimePercentage(start, end)).toBe("50");
  });

  it("returns '100' after the expiry time", () => {
    const start = "2026-01-01T00:00:00Z";
    const end = "2026-01-02T00:00:00Z";
    vi.setSystemTime(new Date("2026-01-10T00:00:00Z"));
    expect(getTimePercentage(start, end)).toBe("100");
  });
});

// ─── formatDate ─────────────────────────────────────────────────────────────

describe("formatDate", () => {
  it("formats a UTC ISO string into a human-readable date/time string", () => {
    const result = formatDate("2026-06-15T14:30:00.000Z");
    expect(result).toMatch(/2026/);
    expect(result).toMatch(/AM|PM/i);
  });

  it("returns an uppercase string", () => {
    const result = formatDate("2026-01-01T08:00:00.000Z");
    expect(result).toBe(result.toUpperCase());
  });
});
