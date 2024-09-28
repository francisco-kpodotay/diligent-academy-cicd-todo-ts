import { list, formatList, format, add, complete,  findById } from "./todo.js";
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
      const foundById = findById(todoStore, validatedIdParam(todoStore, +params))
      display(["Found Todo:", format(foundById)]);
      break;
    case "find-by-title":
      //const foundByTitle = findById(todoStore, validatedIdParam(todoStore, +params))
      //display(["Found Todo:", format(found)]);
      break;
    case "find-by-status":
      //const found = find(todoStore, validatedIdParam(todoStore, +params))
      //display(["Found Todo:", format(found)]);
      break;
    case "update-title":
      //const found = find(todoStore, validatedIdParam(todoStore, +params))
      //display(["Found Todo:", format(found)]);
      break;
    case "delete":
      //const found = find(todoStore, validatedIdParam(todoStore, +params))
      //display(["Found Todo:", format(found)]);
      break;
    case "add-label":
      //const found = find(todoStore, validatedIdParam(todoStore, +params))
      //display(["Found Todo:", format(found)]);
      break;
    case "delete-labe":
      //const found = find(todoStore, validatedIdParam(todoStore, +params))
      //display(["Found Todo:", format(found)]);
      break;
    case "find-by-label":
      //const found = find(todoStore, validatedIdParam(todoStore, +params))
      //display(["Found Todo:", format(found)]);
      break;
    default:
      throw new AppError(`Unknown command: ${command}`);
  }
}
