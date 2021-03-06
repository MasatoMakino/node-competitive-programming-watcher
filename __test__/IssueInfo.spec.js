"use strict";
const fs = require("fs");
const path = require("path");
const MockDate = require("mockdate");

const IssueInfo = require("../bin/issue/IssueInfo");
const IssueTypes = require("../bin/issue/IssueTypes");

const spyLog = jest.spyOn(console, "log").mockImplementation(x => x);
const spyWarn = jest.spyOn(console, "warn").mockImplementation(x => x);
const spyError = jest.spyOn(console, "error").mockImplementation(x => x);
jest.mock("fs");

describe("IssueInfo", () => {
  const testInfo = (url, result) => {
    MockDate.set("1/1/2000");
    const info = IssueInfo.get(url);
    expect(info).toEqual(result);
  };
  test("AtCoder.jp", () => {
    const url = "https://atcoder.jp/contests/practice/tasks/practice_1";
    testInfo(url, {
      contestID: "practice",
      initDate: "20000101_000000",
      issueID: "practice_1",
      type: IssueTypes.AT_CODER,
      url: url
    });
  });

  test("AtCoder.jp + contest id", () => {
    const url = "http://contest_id.contest.atcoder.jp/tasks/problem_id";
    testInfo(url, {
      contestID: "contest_id",
      initDate: "20000101_000000",
      issueID: "problem_id",
      type: IssueTypes.AT_CODER,
      url: url
    });
  });

  test("paiza.jp", () => {
    const url = "https://paiza.jp/career/challenges/293/retry";
    testInfo(url, {
      contestID: "",
      initDate: "20000101_000000",
      issueID: "293",
      type: IssueTypes.PAIZA,
      url: url
    });
  });

  test("empty", () => {
    MockDate.set("1/1/2000");
    const info = IssueInfo.get();
    expect(info).toEqual({
      contestID: "",
      initDate: "20000101_000000",
      issueID: "20000101_000000",
      type: IssueTypes.UNKNOWN,
      url: ""
    });
  });

  test("save", () => {
    MockDate.set("1/1/2000");
    const url = "https://atcoder.jp/contests/practice/tasks/practice_1";
    const info = IssueInfo.get(url);

    IssueInfo.save(info);
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      IssueInfo.JSON_PATH(),
      JSON.stringify(info)
    );
  });

  test("load", () => {
    const info = IssueInfo.load();
    expect(fs.readFileSync).toHaveBeenCalledWith(IssueInfo.JSON_PATH(), "utf8");
  });

  test("load with path", () => {
    const filePath = "path/to/file/info.json";
    const info = IssueInfo.load(filePath);
    expect(fs.readFileSync).toHaveBeenCalledWith(
      path.resolve(filePath),
      "utf8"
    );
  });
});
