import { AppError } from "./app-error.js";
import { Status } from "./enums.js";
import { Todo, TodoStore } from "./interfaces.js";

export function formatToString(todo: Todo) {
  return `${todo.id} - [${todo.done ? "x" : " "}] (${todo.labels.join(", ")}) ${todo.title}`;
}

export function formatList(todos: Todo[]) {
  return todos.map(formatToString);
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
  const todos = store.get();
  const title = params.join(" ");
  const newTodo = {
    title,
    done: false,
    id: nextId(todos),
    labels: [],
  };
  store.set([...todos, newTodo]);
  return newTodo;
}

export function complete(store: TodoStore, id: number): Todo {
  const todos: Todo[] = store.get();
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  todos[todoIndex].done = true;
  store.set(todos);
  return todos[todoIndex];
}

export function findById(store: TodoStore, id: number): Todo {
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

export function deleteTodo(store: TodoStore, param: number): void {
  const todos: Todo[] = store.get();
  store.set(todos.filter((todo) => todo.id !== param));
}

export function addLabel(store: TodoStore, params: [number, string]): string {
  const todos: Todo[] = store.get();
  const [id, label] = params;
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  todos[todoIndex].labels.push(label);
  store.set(todos);
  return label;
}

export function deleteLabel(store: TodoStore, params: [number, string]): void {
  const todos: Todo[] = store.get();
  const [id, labelParam] = params;
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  todos[todoIndex].labels = todos[todoIndex].labels.filter(
    (label) => label !== labelParam
  );
  store.set(todos);
}

export function findByLabel(store: TodoStore, params: string){
  const todos: Todo[] = store.get();
  return todos.filter((todo)=>todo.labels.includes(params))
}