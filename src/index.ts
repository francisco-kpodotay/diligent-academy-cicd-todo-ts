import { join } from "node:path";
import { createStore } from "./file-store.js";
import { AppError } from "./app-error.js";
import { createApp } from "./app.js";

const STORE_PATH = join(import.meta.dirname,'todos.json');
const todoStore = createStore(STORE_PATH);

try {
  createApp(todoStore, process.argv); 
} catch (error) {
  if (error instanceof AppError) {
    console.error(error.message);
  } else {
    console.error(error);
  }
}
