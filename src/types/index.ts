export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export enum FilterTodo {
  All = "All",
  Active = "Active",
  Completed = "Completed",
}
