import { fetchLatestTag } from "../src/main";

describe("setup-ghcli.ts", () => {
  test("fetchLatestTag() - return latest gh cli tag", async () => {
    const latestVersionTag = await fetchLatestTag();
    expect(latestVersionTag).toMatch(/\d*\.\d*.\d/);
  });
});
