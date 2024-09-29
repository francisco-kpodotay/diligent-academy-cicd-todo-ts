import { describe, expect, it, jest } from "@jest/globals";
import {
  add,
  addLabel,
  complete,
  deleteTodo,
  findById,
  findByStatus,
  findByTitle,
  format,
  formatList,
  list,
  updateTodo,
} from "../src/todo.js";
import { Todo } from "../src/interfaces.js";

//TODO extract the test helper function
function createMockStore(data: Todo[]) {
  let todos = [...data]; // Create a copy to avoid mutation of the original array

  return {
    get: jest.fn(() => todos),
    set: jest.fn((newTodos: Todo[]) => {
      todos = newTodos; // Update the todos array when set is called
    }),
  };
}

describe("format", () => {
  it("should format a not done todo", () => {
    const todo = { title: "todo title", id: 1, done: false, labels: [] };
    const expected = "1 - [ ] () todo title";

    const current = format(todo);

    expect(current).toStrictEqual(expected);
  });

  it("should format a done todo", () => {
    const todo = { title: "todo title", id: 1, done: true, labels: [] };
    const expected = "1 - [x] () todo title";

    const current = format(todo);

    expect(current).toStrictEqual(expected);
  });
});

describe("formatList", () => {
  it("should format a list of todos", () => {
    const todos = [
      { title: "todo title", id: 1, done: true, labels: [] },
      { title: "todo title 2", id: 2, done: false, labels: [] },
    ];
    const expected = ["1 - [x] () todo title", "2 - [ ] () todo title 2"];

    const current = formatList(todos);

    expect(current).toStrictEqual(expected);
  }),
    it("should return an empty list, if an empty list is given", () => {
      const todos: Todo[] = [];
      const expected: Todo[] = [];

      const current = formatList(todos);

      expect(current).toStrictEqual(expected);
    });
});

describe("list", () => {
  it("should list the todos", () => {
    const mockStore = createMockStore([
      { id: 1, title: "Todo 1", done: false, labels: [] },
      { id: 2, title: "Todo 2", done: true, labels: [] },
    ]);
    const expected = [
      { id: 1, title: "Todo 1", done: false, labels: [] },
      { id: 2, title: "Todo 2", done: true, labels: [] },
    ];

    const current = list(mockStore);

    expect(current).toStrictEqual(expected);
  });

  it("should return an empty list, if nothing is stored", () => {
    const mockStore = createMockStore([]);
    const expected: Todo[] = [];

    const current = list(mockStore);

    expect(current).toStrictEqual(expected);
  });
});

describe("add", () => {
  it("should add a new todo to an empty store, done false, id is 1", () => {
    const params = ["New Todo"];
    const mockStore = createMockStore([]);
    const expected = {
      id: 1,
      done: false,
      title: "New Todo",
      labels: [],
    };

    const current = add(mockStore, params);

    expect(current).toStrictEqual(expected);
    expect(mockStore.set.mock.calls[0][0]).toStrictEqual([expected]);
  });

  it("should append a new todo to the existing items", () => {
    const params = ["New Todo"];
    const stored = [{ id: 1, title: "Todo 1", done: true, labels: [] }];
    const mockStore = createMockStore(stored);
    const expected = {
      id: 2,
      done: false,
      title: "New Todo",
      labels: [],
    };

    const current = add(mockStore, params);

    expect(current).toStrictEqual(expected);
    expect(mockStore.set.mock.calls[0][0]).toStrictEqual([...stored, expected]);
  });

  it("should calculate the id by max id + 1, missing ids in a sequence", () => {
    const params = ["New Todo"];
    const stored = [
      { id: 2, title: "Todo 1", done: true, labels: [] },
      { id: 4, title: "Todo 1", done: true, labels: [] },
    ];
    const mockStore = createMockStore(stored);
    const expected = {
      id: 5,
      done: false,
      title: "New Todo",
      labels: [],
    };

    const current = add(mockStore, params);

    expect(current).toStrictEqual(expected);
    expect(mockStore.set.mock.calls[0][0]).toStrictEqual([...stored, expected]);
  });
});

describe("complete", () => {
  it("should complite an existing todo", () => {
    const params = 1;
    const mockStore = createMockStore([
      {
        id: 1,
        done: false,
        title: "New Todo",
        labels: [],
      },
    ]);
    const expected = {
      id: 1,
      done: true,
      title: "New Todo",
      labels: [],
    };

    const current = complete(mockStore, params);

    expect(current.done).toStrictEqual(true);
    expect(current).toStrictEqual(expected);
  });
});

describe("findById", () => {
  it("should find an existing todo", () => {
    const params = 1;
    const mockStore = createMockStore([
      {
        id: 1,
        done: false,
        title: "New Todo",
        labels: [],
      },
    ]);
    const expected = {
      id: 1,
      done: false,
      title: "New Todo",
      labels: [],
    };

    const current = findById(mockStore, params);

    expect(current).toStrictEqual(expected);
  });

  it("should find an existing todo", () => {
    const params = 1;
    const mockStore = createMockStore([]);

    expect(() => findById(mockStore, params)).toThrow(
      "Todo with id 1 not found"
    );
  });
});

describe("findByTitle", () => {
  it("should find a existing todo", () => {
    const params = "new";
    const mockStore = createMockStore([
      {
        id: 1,
        done: false,
        title: "New Todo",
        labels: [],
      },
      {
        id: 2,
        done: false,
        title: "Todo",
        labels: [],
      },
    ]);
    const expected = [
      {
        id: 1,
        done: false,
        title: "New Todo",
        labels: [],
      },
    ];

    const current = findByTitle(mockStore, params);

    expect(current).toStrictEqual(expected);
  });

  it("should find two existing todo", () => {
    const params = "new";
    const mockStore = createMockStore([
      {
        id: 1,
        done: false,
        title: "New Todo",
        labels: [],
      },
      {
        id: 2,
        done: false,
        title: "Todo",
        labels: [],
      },
      {
        id: 3,
        done: false,
        title: "new",
        labels: [],
      },
    ]);
    const expected = [
      {
        id: 1,
        done: false,
        title: "New Todo",
        labels: [],
      },
      {
        id: 3,
        done: false,
        title: "new",
        labels: [],
      },
    ];

    const current = findByTitle(mockStore, params);

    expect(current).toStrictEqual(expected);
  });

  it("should throw when no macth found", () => {
    const params = "new";
    const mockStore = createMockStore([]);

    expect(() => findByTitle(mockStore, params)).toThrow(
      `Don't found Todod with title: "new"`
    );
  });
});

describe("findByStatus", () => {
  it("should find a existing todo with done status (true)", () => {
    const param = "done";
    const mockStore = createMockStore([
      {
        id: 1,
        done: false,
        title: "New Todo",
        labels: [],
      },
      {
        id: 2,
        done: true,
        title: "Todo",
        labels: [],
      },
      {
        id: 3,
        done: true,
        title: "new",
        labels: [],
      },
    ]);
    const expected = [
      {
        id: 2,
        done: true,
        title: "Todo",
        labels: [],
      },
      {
        id: 3,
        done: true,
        title: "new",
        labels: [],
      },
    ];

    const current = findByStatus(mockStore, param);

    expect(current).toStrictEqual(expected);
  });
  it("should find a existing todo with not-done status (false)", () => {
    const param = "not-done";
    const mockStore = createMockStore([
      {
        id: 1,
        done: false,
        title: "New Todo",
        labels: [],
      },
      {
        id: 2,
        done: true,
        title: "Todo",
        labels: [],
      },
      {
        id: 3,
        done: true,
        title: "new",
        labels: [],
      },
    ]);
    const expected = [
      {
        id: 1,
        done: false,
        title: "New Todo",
        labels: [],
      },
    ];

    const current = findByStatus(mockStore, param);

    expect(current).toStrictEqual(expected);
  });

  it("should throw when param is not valid", () => {
    const params = "do";
    const mockStore = createMockStore([]);

    expect(() => findByStatus(mockStore, params)).toThrow(
      `This is not a valid param: "do". Try to use "done" or "not-done".`
    );
  });
});

describe("update-title", () => {
  it("should find a existing todo and uptate the title", () => {
    const params: [number, string] = [1, "New Todo"];
    const mockStore = createMockStore([
      {
        id: 1,
        done: false,
        title: "Old",
        labels: [],
      },
    ]);
    const expected = {
      id: 1,
      done: false,
      title: "New Todo",
      labels: [],
    };
    const current = updateTodo(mockStore, params);

    expect(current).toStrictEqual(expected);
  });
});

describe("delete", () => {
  it("should delete an existing todo", () => {
    const param = 1;
    const mockStore = createMockStore([
      {
        id: 1,
        done: false,
        title: "Old",
        labels: [],
      },
    ]);

    deleteTodo(mockStore, param);

    // Assert that the todo was deleted (length is 0)
    expect(mockStore.get().length).toBe(0);

    // Assert that the store is now an empty array (after deletion)
    expect(mockStore.get()).toStrictEqual([]);
  });
});

describe("addLabel", () => {
  it("should add a label to an existing todo", () => {
    const params: [number, string] = [1, "cica"];
    const mockStore = createMockStore([
      {
        id: 1,
        done: false,
        title: "New Todo",
        labels: [],
      },
    ]);
    const expected = [{
      id: 1,
      done: false,
      title: "New Todo",
      labels: ["cica"],
    }];

    addLabel(mockStore, params);

    expect(mockStore.get()[0].labels[0]).toStrictEqual(expected[0].labels[0]);
    expect(mockStore.get()).toStrictEqual(expected)
  });
});
