import { AppError } from "./app-error.js";
import { Status } from "./enums.js";
import { Todo, TodoStore } from "./interfaces.js";
import {
  validateAddParams,
  validatedIdParam,
  validateStatusParam,
  validateFindTitleParams,
  validateUpdateParams,
  validatedAddLabelParam,
  validatedDeleteLabelParam,
  validateLabelText,
} from "./validate.js";

export function format(...todos: Todo[]): string | string[] {
  return todos.map(
    (todo) =>
      `${todo.id} - [${todo.done ? "x" : " "}] (${todo.labels.join(", ")}) ${
        todo.title
      }`
  );
}

function nextId(todos: Todo[]) {
  const ids = todos.map((todo) => todo.id);
  if (ids.length === 0) {
    return 1;
  }
  const maxId = Math.max(...ids);
  return maxId + 1;
}

export function list(store: TodoStore) {
  return store.get();
}

export function add(store: TodoStore, params: string[]): Todo[] {
  const validated: string = validateAddParams(params);
  const todos = store.get();
  const newTodo = {
    id: nextId(todos),
    title: validated,
    done: false,
    labels: [],
  };
  store.set([...todos, newTodo]);
  return [newTodo];
}

export function complete(store: TodoStore, params: string[]): Todo {
  const validated: number = validatedIdParam(store, +params);
  const todos: Todo[] = store.get();
  const todoIndex = todos.findIndex((todo) => todo.id === validated);
  todos[todoIndex].done = true;
  store.set(todos);
  return todos[todoIndex];
}

export function findById(store: TodoStore, params: string[]):Todo {
  const validated: number = validatedIdParam(store, +params);
  const todos: Todo[] = store.get();
  const result = todos.find((todo) => todo.id === validated)!;
  return result;
}

export function findByTitle(store: TodoStore, params: string[]): Todo[] {
  const validated: string = validateFindTitleParams(params);
  const todos: Todo[] = store.get();
  const result = todos.filter((todo) =>
    todo.title.toLowerCase().includes(validated.toLowerCase())
  );
  if (result.length === 0) {
    throw new AppError(`Don't found Todod with title: "${validated}"`);
  }
  return result;
}

export function findByStatus(store: TodoStore, params: string[]): Todo[] {
  const validated: string = validateStatusParam(params);
  const todos: Todo[] = store.get();
  if (validated === Status.Done) {
    return todos.filter((todo) => todo.done === true)!;
  }
  else {
    return todos.filter((todo) => todo.done === false)!;
  }
}

export function updateTodo(store: TodoStore, params: string[]): Todo {
  const validated: [number, string] = validateUpdateParams(store, params);
  const todos: Todo[] = store.get();
  const [id, title] = validated;
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  todos[todoIndex].title = title;
  store.set(todos);
  return todos[todoIndex];
}

export function deleteTodo(store: TodoStore, params: string[]):Todo {
  const validated: number = validatedIdParam(store, +params);
  const todos: Todo[] = store.get();
  const deleted = todos.find((todo) => todo.id === validated)!;
  store.set(todos.filter((todo) => todo.id !== validated));
  return deleted;
}

export function addLabel(store: TodoStore, params: string[]): string {
  const validated: [number, string] = validatedAddLabelParam(store, params);
  const todos: Todo[] = store.get();
  const [id, label] = validated;
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  todos[todoIndex].labels.push(label);
  store.set(todos);
  return label;
}

export function deleteLabel(store: TodoStore, params: string[]): Todo {
  const validated: [number, string] = validatedDeleteLabelParam(store, params);
  const todos: Todo[] = store.get();
  const [id, labelParam] = validated;
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  const deleted = todos[todoIndex];
  todos[todoIndex].labels = todos[todoIndex].labels.filter(
    (label) => label !== labelParam
  );
  store.set(todos);
  return deleted;
}

export function findByLabel(store: TodoStore, params: string[]): Todo[] {
  const validated: string = validateLabelText(params);
  const todos: Todo[] = store.get();
  return todos.filter((todo) => todo.labels.includes(validated));
}
