import { AppError } from "./app-error.js";
import { TodoStore } from "./interfaces.js";
import { commands } from "./commands.js";

export function createApp(store: TodoStore, args: string[]): void {
  const [, , command, ...params] = args;

  const run = commands.get(command);

  if (!run) {
    throw new AppError(`Unknown command: ${command}`);
  }

  run(store, params);
}
