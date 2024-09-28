import { AppError } from "./app-error.js";

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