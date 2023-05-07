import * as tc from "@actions/tool-cache";
import * as core from "@actions/core";
import os from "os";
import {
  fetchLatestTag,
  getValidTag,
  downloadUrl,
  downloadCli,
} from "../src/main";

describe("setup-ghcli.ts", () => {
  test("fetchLatestTag() - return latest gh cli tag", async () => {
    const latestVersionTag = await fetchLatestTag();
    expect(latestVersionTag).toMatch(/\d*\.\d*.\d/);
  });

  test("getValidTag() - return a valid tag", async () => {
    const expectedVersion = "2.28.0";
    const actualVersion = await getValidTag("v2.28.0");

    expect(actualVersion).toEqual(expectedVersion);
  });

  test("downloadUrl() - when linux + x64, return amd64", () => {
    jest.spyOn(os, "type").mockImplementation(() => {
      return "Linux";
    });

    const expectedUrl =
      "https://github.com/cli/cli/releases/download/v2.28.0/gh_2.28.0_linux_amd64.tar.gz";
    const actualUrl = downloadUrl("2.28.0", "x64");

    expect(actualUrl).toEqual(expectedUrl);
  });

  test("downloadUrl() - when linux + arm64, return arm64", () => {
    jest.spyOn(os, "type").mockImplementation(() => {
      return "Linux";
    });

    const expectedUrl =
      "https://github.com/cli/cli/releases/download/v2.28.0/gh_2.28.0_linux_arm64.tar.gz";
    const actualUrl = downloadUrl("2.28.0", "arm64");

    expect(actualUrl).toEqual(expectedUrl);
  });

  test("downloadUrl() - when darwin + x64, return amd64", () => {
    jest.spyOn(os, "type").mockImplementation(() => {
      return "Darwin";
    });

    const expectedUrl =
      "https://github.com/cli/cli/releases/download/v2.28.0/gh_2.28.0_macOS_amd64.zip";
    const actualUrl = downloadUrl("2.28.0", "x64");

    expect(actualUrl).toEqual(expectedUrl);
  });

  test("downloadUrl() - when darwin + amd, return arm64", () => {
    jest.spyOn(os, "type").mockImplementation(() => {
      return "Darwin";
    });

    const expectedUrl =
      "https://github.com/cli/cli/releases/download/v2.28.0/gh_2.28.0_macOS_arm64.zip";
    const actualUrl = downloadUrl("2.28.0", "arm64");

    expect(actualUrl).toEqual(expectedUrl);
  });

  test("downloadUrl() - when windows + x64, return amd64", () => {
    jest.spyOn(os, "type").mockImplementation(() => {
      return "Windows_NT";
    });

    const expectedUrl =
      "https://github.com/cli/cli/releases/download/v2.28.0/gh_2.28.0_windows_amd64.zip";
    const actualUrl = downloadUrl("2.28.0", "x64");

    expect(actualUrl).toEqual(expectedUrl);
  });

  test("downloadUrl() - when windows + arm64, return arm64", () => {
    jest.spyOn(os, "type").mockImplementation(() => {
      return "Windows_NT";
    });

    const expectedUrl =
      "https://github.com/cli/cli/releases/download/v2.28.0/gh_2.28.0_windows_arm64.zip";
    const actualUrl = downloadUrl("2.28.0", "arm64");

    expect(actualUrl).toEqual(expectedUrl);
  });

  test("downloadCli() - tool found in cache", async () => {
    const toolPath = "toolcache/gh/2.28.0/x64";
    const debugLogSpy = jest.spyOn(core, "debug");
    jest.spyOn(tc, "find").mockImplementation(() => toolPath);

    await downloadCli("2.28.0", "x64");
    expect(debugLogSpy).toBeCalledWith("Adding gh cli 2.28.0 to path");
  });
});
