import { describe, expect, it } from "vitest";
import { deliveryPolicy } from "@/lib/portfolio";

describe("Delivery policy", () => {
  it("provides a 14-day fix window after delivery", () => {
    expect(deliveryPolicy.fixWindowDays).toBe(14);
  });
});