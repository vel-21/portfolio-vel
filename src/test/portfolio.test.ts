import { describe, expect, it } from "vitest";
import { deliveryPolicy, projects } from "@/lib/portfolio";

describe("Delivery policy", () => {
  it("provides a 14-day fix window after delivery", () => {
    expect(deliveryPolicy.fixWindowDays).toBe(14);
  });
});

describe("Case-study media", () => {
  it("gives every project a workflow diagram and a test run result", () => {
    expect(projects).toHaveLength(4);
    for (const project of projects) {
      expect(project.media.flow).toMatch(/^\/__l5e\/assets-v1\/[0-9a-f-]+\/[a-z_]+\.png$/);
      expect(project.media.result).toMatch(/^\/__l5e\/assets-v1\/[0-9a-f-]+\/[a-z_]+\.png$/);
      expect(project.media.flow).not.toBe(project.media.result);
    }
  });

  it("keeps the four diagrams and results as separate files", () => {
    const urls = projects.flatMap(project => [project.media.flow, project.media.result]);
    expect(new Set(urls).size).toBe(8);
  });
});
