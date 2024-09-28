import { AppError } from "./app-error.js";
import { Todo, TodoStore } from "./interfaces.js";

export function validateAddParams(params: string[]) {
  if(params.length <= 0) {
    throw new AppError('Give a title!');
  }
  const [title] = params;
  if(typeof title !== 'string' || title?.length === 0) {
    throw new AppError('The title must be a non zero length string.')
  }
  return params;
}

export function validatedCompleteParams(todoStore: TodoStore, param: number){
  //TODO NaN
  if (isNaN(param)){
    throw new AppError('Given parameter is not a number.')
  }
  //TODO param <=0
  if (param<=0) {
    throw new AppError('Parameter should be bigger than 0.')
  }
  //TODO param bigger than array
  const listOfIds = todoStore.get().map((todo: Todo)=>+todo.id)
  
  if (!listOfIds.includes(param)) {
    throw new AppError('Given number is not a valid Id.')
  }
  return param;
}