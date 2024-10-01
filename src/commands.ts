import {
  format,
  add,
  complete,
  findById,
  findByTitle,
  findByStatus,
  updateTodo,
  deleteTodo,
  addLabel,
  deleteLabel,
  findByLabel,
} from "./todo.js";
import { TodoStore } from "./interfaces.js";
import { display } from "./display.js";

export const commands = new Map([
  ["list", listCommand],
  ["add", addCommand],
  ["complete", completeCommand],
  ["find-by-id", findByIdCommand],
  ["find-by-title", findByTitleCommand],
  ["find-by-status", findByStatusCommand],
  ["update-title", updateTodoCommand],
  ["delete", deleteCommand],
  ["add-label", addLabelCommand],
  ["delete-label", deleteLabelCommand],
  ["find-by-label", findByLabelCommand],
]);

function listCommand(store: TodoStore) {
  console.table(store.get());
  console.log(`You have ${store.get().length} todos.`);
}

function addCommand(store: TodoStore, params: string[]) {
  display(["New Todo added:", ...format(...add(store, params))]);
}

function completeCommand(store: TodoStore, params: string[]) {
  display(["Completed Todo:", ...format(complete(store, params))]);
}

function findByIdCommand(store: TodoStore, params: string[]) {
  display(["Found Todo:", ...format(findById(store, params))]);
}

function findByTitleCommand(store: TodoStore, params: string[]) {
  display(["Found Todo(s):", ...format(...findByTitle(store, params))]);
}

function findByStatusCommand(store: TodoStore, params: string[]) {
  display(["Found Todo:", ...format(...findByStatus(store, params))]);
}

function updateTodoCommand(store: TodoStore, params: string[]) {
  display(["Todo updated:", ...format(updateTodo(store, params))]);
}

function deleteCommand(store: TodoStore, params: string[]) {
  display(["Todo Deleted.", ...format(deleteTodo(store, params))]);
}

function addLabelCommand(store: TodoStore, params: string[]) {
  display(["Label added:", addLabel(store, params)]);
}

function deleteLabelCommand(store: TodoStore, params: string[]) {
  display(["Label deleted.", ...format(deleteLabel(store, params))]);
}

function findByLabelCommand(store: TodoStore, params: string[]) {
  display(["Found Todo(s):", ...format(...findByLabel(store, params))]);
}
