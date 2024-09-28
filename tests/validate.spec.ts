import { describe, it, expect } from "@jest/globals";
import { validateAddParams } from "../src/validate.js";

describe("validateAddParams", () => {
  it("should pass and return with the original params with single string", () => {
    const params = ["Todo"];
    const expected = ["Todo"];

    const current = validateAddParams(params);

    expect(current).toStrictEqual(expected);
  });

  it("should pass and return with the original params with single string separated with spaces", () => {
    const params = ["Todo Item"];
    const expected = ["Todo Item"];

    const current = validateAddParams(params);

    expect(current).toStrictEqual(expected);
  });

  it("should throw when no params given.", () => {
    const params:string[] = [];

    expect(() => validateAddParams(params)).toThrow(
      'Give a title!'
    );
  });

  it("should throw when the param is not a string", () => {
    const params = [5];

    // @ts-ignore
    expect(() => validateAddParams(params)).toThrow(
      "The title must be a non zero length string."
    );
  });

  it("should throw when the param is a zero length string", () => {
    const params = [""];

    expect(() => validateAddParams(params)).toThrow(
      "The title must be a non zero length string."
    );
  });
});
