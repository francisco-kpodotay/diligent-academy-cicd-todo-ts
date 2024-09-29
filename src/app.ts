import {
  list,
  formatList,
  format,
  add,
  complete,
  findById,
  findByTitle,
  findByStatus,
  updateTodo,
  deleteTodo,
} from "./todo.js";
import { display } from "./display.js";
import { AppError } from "./app-error.js";
import {
  validateAddParams,
  validatedIdParam,
  validateStatusParam,
  validateFindTitleParams,
  validateUpdateParams,
} from "./validate.js";
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
      const completed = complete(
        todoStore,
        validatedIdParam(todoStore, +params)
      );
      display(["Todo set to completed:", format(completed)]);
      break;
    case "find-by-id":
      const foundById = findById(
        todoStore,
        validatedIdParam(todoStore, +params)
      );
      display(["Found Todo:", format(foundById)]);
      break;
    case "find-by-title":
      const foundByTitle = findByTitle(
        todoStore,
        validateFindTitleParams(params)
      );
      display(["Found Todo(s):", ...formatList(foundByTitle)]);
      break;
    case "find-by-status":
      const foundByStatus = findByStatus(
        todoStore,
        validateStatusParam(params)
      );
      display(["Found Todo:", ...formatList(foundByStatus)]);
      break;
    case "update-title":
      const updatedTodo = updateTodo(
        todoStore,
        validateUpdateParams(todoStore, params)
      );
      display(["Todo updated:", format(updatedTodo)]);
      break;
    case "delete":
      deleteTodo(todoStore, validatedIdParam(todoStore, +params))
      display(["Todo Deleted"]);
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
