import {EOL} from 'node:os';

export function display(lines:string[]) {
  console.log(lines?.join(EOL))
}