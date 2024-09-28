import { AppError } from "./app-error.js";
import { Status } from "./enums.js";
import { Todo, TodoStore } from "./interfaces.js";

export function validateAddParams(params: string[]) {
  if (params.length <= 0) {
    throw new AppError("Give a title!");
  }
  const [title] = params;
  if (typeof title !== "string" || title?.length === 0) {
    throw new AppError("The title must be a non zero length string.");
  }
  return params;
}

export function validateFindTitleParams(params: string[]) {
  const [title] = params;
  if (params.length <= 0) {
    throw new AppError("Give a title.");
  }
  if (params.length !== 1) {
    throw new AppError("Give only one title. Do not use space.");
  }
  if (title.length < 3) {
    throw new AppError("Give 3 letter at least.");
  }
  return title;
}

export function validateStatusParam(params: string[]) {
  const [title] = params;
  if (params.length <= 0) {
    throw new AppError("Give a status.");
  }
  if (params.length !== 1) {
    throw new AppError("Give only one status. Do not use space.");
  }
  if (title !== Status.Done && title !== Status.NotDone) {
    throw new AppError(
      `This is not a valid param: "${title}". Try to use "done" or "not-done".`
    );
  }
  return title;
}

export function validatedIdParam(todoStore: TodoStore, param: number) {
  if (isNaN(param)) {
    throw new AppError("Given parameter is not a number.");
  }
  if (param <= 0) {
    throw new AppError("Parameter should be bigger than 0.");
  }
  const listOfIds = todoStore.get().map((todo: Todo) => +todo.id);
  if (!listOfIds.includes(param)) {
    throw new AppError("Given number is not a valid Id.");
  }
  return param;
}
