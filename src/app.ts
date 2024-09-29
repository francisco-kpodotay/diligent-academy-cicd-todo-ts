import {
  list,
  formatList,
  formatToString,
  add,
  complete,
  findById,
  findByTitle,
  findByStatus,
  updateTodo,
  deleteTodo,
  addLabel,
  deleteLabel,
} from "./todo.js";
import { display } from "./display.js";
import { AppError } from "./app-error.js";
import {
  validateAddParams,
  validatedIdParam,
  validateStatusParam,
  validateFindTitleParams,
  validateUpdateParams,
  validatedAddLabelParam,
  validatedDeleteLabelParam,
} from "./validate.js";
import { TodoStore } from "./interfaces.js";

export function createApp(todoStore: TodoStore, args: string[]): void {
  const [, , command, ...params] = args;

  switch (command) {
    case "list":
      const todos = list(todoStore);
      console.table(todoStore.get())
      console.log(`You have ${todos.length} todos.`)
      break;
    case "add":
      const added = add(todoStore, validateAddParams(params));
      display(["New Todo added:", formatToString(added)]);
      break;
    case "complete":
      const completed = complete(
        todoStore,
        validatedIdParam(todoStore, +params)
      );
      display(["Todo set to completed:", formatToString(completed)]);
      break;
    case "find-by-id":
      const foundById = findById(
        todoStore,
        validatedIdParam(todoStore, +params)
      );
      display(["Found Todo:", formatToString(foundById)]);
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
      display(["Todo updated:", formatToString(updatedTodo)]);
      break;
    case "delete":
      deleteTodo(todoStore, validatedIdParam(todoStore, +params))
      display(["Todo Deleted."]);
      break;
    case "add-label":
      const addedLabel = addLabel(todoStore, validatedAddLabelParam(todoStore, params))
      display(["Label added:", addedLabel]);
      break;
    case "delete-label":
      deleteLabel(todoStore, validatedDeleteLabelParam(todoStore, params))
      display(["Label deleted."]);
      break;
    case "find-by-label":
      //const found = find(todoStore, validatedIdParam(todoStore, +params))
      //display(["Found Todo:", format(found)]);
      break;
    default:
      throw new AppError(`Unknown command: ${command}`);
  }
}
