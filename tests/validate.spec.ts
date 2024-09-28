import { describe, it, expect, jest } from "@jest/globals";
import { validateAddParams, validatedCompleteParams } from "../src/validate.js";
import { Todo } from "../src/interfaces.js";

//TODO extract the test helper function
function createMockStore(data: Todo[]) {
  return {
    get: jest.fn(() => data),
    set: jest.fn(),
  };
}

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
    const params: string[] = [];

    expect(() => validateAddParams(params)).toThrow("Give a title!");
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

describe("validatedCompleteParams", () => {
  it("should pass and return with the original params", () => {
    const param = 1;
    const expected = 1;
    const mockStore = createMockStore([
      { id: 1, title: "Todo 1", done: false },
    ]);

    const result = validatedCompleteParams(mockStore, param);

    expect(result).toStrictEqual(expected);
  });

  it("should throw when the param is NaN", () => {
    const param = "string";
    const mockStore = createMockStore([]);

    // @ts-ignore
    expect(() => validatedCompleteParams(mockStore, param)).toThrow(
      "Given parameter is not a number."
    );
  });

  it("should throw when the param is a zero", () => {
    const param = 0;
    const mockStore = createMockStore([]);

    expect(() => validatedCompleteParams(mockStore, param)).toThrow(
      "Parameter should be bigger than 0."
    );
  });

  it("should throw when the param is not valid Id", () => {
    const param = 2;
    const mockStore = createMockStore([
      { id: 1, title: "Todo 1", done: false },
    ]);

    expect(() => validatedCompleteParams(mockStore, param)).toThrow(
      "Given number is not a valid Id."
    );
  });
});
