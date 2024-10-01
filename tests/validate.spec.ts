import { describe, it, expect, jest } from "@jest/globals";
import {
  validateAddParams,
  validatedIdParam,
  validateStatusParam,
  validateFindTitleParams,
  validateUpdateParams,
  validateLabelText,
  validatedAddLabelParam,
  validatedDeleteLabelParam,
} from "../src/validate.js";
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
    const expected = "Todo";

    const current = validateAddParams(params);

    expect(current).toStrictEqual(expected);
  });

  it("should pass and return with the original params with single string separated with spaces", () => {
    const params = ["Todo Item"];
    const expected = "Todo Item";

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
      { id: 1, title: "Todo 1", done: false, labels: [] },
    ]);

    const result = validatedIdParam(mockStore, param);

    expect(result).toStrictEqual(expected);
  });

  it("should throw when the param is NaN", () => {
    const param = "string";
    const mockStore = createMockStore([]);

    // @ts-ignore
    expect(() => validatedIdParam(mockStore, param)).toThrow(
      "Given parameter is not a number."
    );
  });

  it("should throw when the param is a zero", () => {
    const param = 0;
    const mockStore = createMockStore([]);

    expect(() => validatedIdParam(mockStore, param)).toThrow(
      "Parameter should be bigger than 0."
    );
  });

  it("should throw when the param is not valid Id", () => {
    const param = 2;
    const mockStore = createMockStore([
      { id: 1, title: "Todo 1", done: false, labels: [] },
    ]);

    expect(() => validatedIdParam(mockStore, param)).toThrow(
      "Given number is not a valid Id."
    );
  });
});

describe("validateFindTitleParams", () => {
  it("should pass and return with the original params", () => {
    const param = ["Titile"];
    const expected = "Titile";

    const result = validateFindTitleParams(param);

    expect(result).toStrictEqual(expected);
  });

  it("should throw when no param presented", () => {
    const param: string[] = [];

    expect(() => validateFindTitleParams(param)).toThrow("Give a title.");
  });

  it("should throw when two param presented", () => {
    const param: string[] = ["Titile", "Title2"];

    expect(() => validateFindTitleParams(param)).toThrow(
      "Give only one title. Do not use space."
    );
  });

  it("should throw when two param is shorter than 3 letter", () => {
    const param: string[] = ["Ti"];

    expect(() => validateFindTitleParams(param)).toThrow(
      "Give 3 letter at least."
    );
  });
});

describe("validatedStatusParam", () => {
  it("should pass and return with the original params", () => {
    const param = ["done"];
    const expected = "done";

    const result = validateStatusParam(param);

    expect(result).toStrictEqual(expected);
  });
  it("should throw when no param presented", () => {
    const param: string[] = [];

    expect(() => validateStatusParam(param)).toThrow("Give a status.");
  });

  it("should throw when two param presented", () => {
    const param: string[] = ["Titile", "Title2"];

    expect(() => validateStatusParam(param)).toThrow(
      "Give only one status. Do not use space."
    );
  });

  it("should throw when not the correct metodes used", () => {
    const param = ["do"];

    expect(() => validateStatusParam(param)).toThrow(
      `This is not a valid param: "do". Try to use "done" or "not-done".`
    );
  });
});

describe("validateUpdateParams", () => {
  it("should pass and return with a tuple [number, string]", () => {
    const param: string[] = ["1", "New", "Todo", "title"];
    const mockStore = createMockStore([
      { id: 1, title: "Todo 1", done: false, labels: [] },
    ]);
    const expected: [number, string] = [1, "New Todo title"];

    const result = validateUpdateParams(mockStore, param);

    expect(result).toStrictEqual(expected);
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
  it("should throw when the param is NaN", () => {
    const param = "string";
    const mockStore = createMockStore([]);

    // @ts-ignore
    expect(() => validatedIdParam(mockStore, param)).toThrow(
      "Given parameter is not a number."
    );
  });

  it("should throw when the param is a zero", () => {
    const param = 0;
    const mockStore = createMockStore([]);

    expect(() => validatedIdParam(mockStore, param)).toThrow(
      "Parameter should be bigger than 0."
    );
  });

  it("should throw when the param is not valid Id", () => {
    const param = 2;
    const mockStore = createMockStore([
      { id: 1, title: "Todo 1", done: false, labels: [] },
    ]);

    expect(() => validatedIdParam(mockStore, param)).toThrow(
      "Given number is not a valid Id."
    );
  });
});

describe("validateLabelText",()=>{
  it("should throw when no params given.", () => {
    const params: string[] = [];

    expect(() => validateLabelText(params)).toThrow("Give a label name!");
  });

  it("should throw when the param is not a string", () => {
    const params = [5];

    // @ts-ignore
    expect(() => validateLabelText(params)).toThrow(
      "The label must be a non zero length string."
    );
  });

  it("should throw when the param is a zero length string", () => {
    const params = [""];

    expect(() => validateLabelText(params)).toThrow(
      "The label must be a non zero length string."
    );
  });
})

describe("validatedAddLabelParam",()=>{
  it("should pass and return with a tuple [number, string]", () => {
    const param: string[] = ["1", "New", "Todo", "label"];
    const mockStore = createMockStore([
      { id: 1, title: "Todo 1", done: false, labels: [] },
    ]);
    const expected: [number, string] = [1, "New Todo label"];

    const result = validatedAddLabelParam(mockStore, param);

    expect(result).toStrictEqual(expected);
  });
})

describe("validatedDeleteLabelParam",()=>{
  it("should pass and return with a tuple [number, string]", () => {
    const param: string[] = ["1", "New", "Todo", "label"];
    const mockStore = createMockStore([
      { id: 1, title: "Todo 1", done: false, labels: [] },
    ]);
    const expected: [number, string] = [1, "New Todo label"];

    const result = validatedDeleteLabelParam(mockStore, param);

    expect(result).toStrictEqual(expected);
  });
})

