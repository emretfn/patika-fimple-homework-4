import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  activeTodoCount: number;
  addTodo: (todo: Todo) => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      activeTodoCount: 0,
      addTodo: (todo) =>
        set((state) => ({
          todos: [...state.todos, todo],
          activeTodoCount: todo.completed ? state.activeTodoCount : state.activeTodoCount + 1,
        })),
    }),
    {
      name: "todo-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
