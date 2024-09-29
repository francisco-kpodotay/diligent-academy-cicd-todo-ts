export interface Todo {
  id: number;
  title: string;
  done: boolean;
  labels: string[];
}

export interface TodoStore {
  get: () => any;
  set: (newData: any) => void;
}
