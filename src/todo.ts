import { isDataView } from "util/types";
import { AppError } from "./app-error.js";
import { Status } from "./enums.js";
import { Todo, TodoStore } from "./interfaces.js";

export function format(todo: Todo) {
  return `${todo.id} - [${todo.done ? "x" : " "}] ${todo.title}`;
}

export function formatList(todos: Todo[]) {
  return todos.map(format);
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

export function add(store: TodoStore, params: string[]): Todo {
  const title = params.join(" ");
  const todos = store.get();
  const newTodo = {
    title,
    done: false,
    id: nextId(todos),
  };
  const toStore = [...todos, newTodo];
  store.set(toStore);
  return newTodo;
}

export function complete(store: TodoStore, param: number): Todo {
  const id = param;
  const todos: Todo[] = store.get();
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  todos[todoIndex].done = true;
  store.set(todos);
  return todos[todoIndex];
}

export function findById(store: TodoStore, param: number): Todo {
  const id = param;
  const todos: Todo[] = store.get();
  const result = todos.find((todo) => todo.id === id);
  if (!result) {
    throw new AppError(`Todo with id ${id} not found`);
  }
  return result;
}

export function findByTitle(store: TodoStore, param: string): Todo[] {
  const todos: Todo[] = store.get();
  const result = todos.filter((todo) =>
    todo.title.toLowerCase().includes(param.toLowerCase())
  );
  if (result.length <= 0) {
    throw new AppError(`Don't found Todod with title: "${param}"`);
  }
  return result;
}

export function findByStatus(store: TodoStore, param: string) {
  const todos: Todo[] = store.get();
  if (param === Status.Done) {
    return todos.filter((todo) => todo.done === true);
  }
  if (param === Status.NotDone) {
    return todos.filter((todo) => todo.done === false);
  } else {
    throw new AppError(
      `This is not a valid param: "${param}". Try to use "done" or "not-done".`
    );
  }
}

export function updateTodo(store: TodoStore, param: [number, string]): Todo {
  const todos: Todo[] = store.get();
  const [id, title] = param;
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  todos[todoIndex].title = title;
  store.set(todos);
  return todos[todoIndex];
}

export function deleteTodo(store: TodoStore, param: number):void {
  let todos: Todo[] = store.get();
  store.set(todos.filter((todo) => todo.id !== param));
}
