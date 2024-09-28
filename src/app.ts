import { list, formatList, format, add, complete, find } from "./todo.js";
import { display } from "./display.js";
import { AppError } from "./app-error.js";
import { validateAddParams, validatedIdParam } from "./validate.js";
import { TodoStore } from "./interfaces.js";

export function createApp(todoStore: TodoStore, args: string[]): void {
  const [, , command, ...params] = args;

  switch (command) {
    case "list":
      const todos = list(todoStore);
      display([...formatList(todos), `You have ${todos.length} todos.`]);
      break;
    case "add":
      const added = add(todoStore, validateAddParams(params));
      display(["New Todo added:", format(added)]);
      break;
    case "complete":
      const completed = complete(todoStore, validatedIdParam(todoStore, +params));
      display(["Todo set to completed:", format(completed)]);
      break;
    case "find-by-id":
      const found = find(todoStore, validatedIdParam(todoStore, +params))
      display(["Found Todo:", format(found)]);
      break;
    default:
      throw new AppError(`Unknown command: ${command}`);
  }
}
