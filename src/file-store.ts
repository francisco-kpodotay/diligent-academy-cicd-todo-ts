import {existsSync, readFileSync, writeFileSync} from 'node:fs';
import { TodoStore } from './interfaces.js';

export function createStore(path: string) {
  if(!existsSync(path)) {
    writeFileSync(path, JSON.stringify([], null, 2), 'utf-8');
  } 

  return {
    get: () => {
      const textContent = readFileSync(path, 'utf-8');
      return JSON.parse(textContent);
    },
    set: (newData: TodoStore[]) => {
      writeFileSync(path, JSON.stringify(newData, null, 2), 'utf-8');
    }
  }
}