import { describe, expect, it } from "vitest";
import { deliveryPolicy, projects } from "@/lib/portfolio";

describe("Delivery policy", () => {
  it("provides a 14-day fix window after delivery", () => {
    expect(deliveryPolicy.fixWindowDays).toBe(14);
  });
});

describe("Case-study media", () => {
  it("gives every project a workflow diagram and a test run result", () => {
    expect(projects).toHaveLength(5);
    const png = /^(\/__l5e\/assets-v1\/[0-9a-f-]+\/[a-z_]+|.*\/assets\/[a-z_]+[^/]*)\.png$/;
    for (const project of projects) {
      expect(project.media.flow).toMatch(png);
      expect(project.media.result).toMatch(png);
      expect(project.media.flow).not.toBe(project.media.result);
    }
  });

  it("keeps every diagram and result as a separate file", () => {
    const urls = projects.flatMap(project => [project.media.flow, project.media.result]);
    expect(new Set(urls).size).toBe(10);
  });
});
