import {EOL} from 'node:os';

export function display(lines) {
  console.log(lines?.join(EOL))
}