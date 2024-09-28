import { AppError } from "./app-error.js";
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

export function complete(store: TodoStore, params: number): Todo {
  const id = params;
  const todos: Todo[] = store.get();
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  todos[todoIndex].done = true;
  store.set(todos);
  return todos[todoIndex];
}

export function find(store: TodoStore, params: number): Todo {
  const id = params;
  const todos: Todo[] = store.get();
  const result = todos.find((todo) => todo.id === id);
  if (!result) { 
    throw new AppError(`Todo with id ${id} not found`);
  }
  return result;
}
