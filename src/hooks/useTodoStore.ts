import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { FilterTodo, Todo } from "../types";

// Types for the state
interface TodoState {
  todos: Todo[];
  activeTodoCount: number;
  activeFilter: FilterTodo;
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  toggleTodo: (todoId: string) => void;
  toggleAllTodos: (completed: boolean) => void;
  deleteTodo: (todoId: string) => void;
  setFilter: (filter: FilterTodo) => void;
}

// Create the store and export the hook to use it throughout the app.
// The store is persisted to local storage.
export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      activeTodoCount: 0,
      activeFilter: FilterTodo.All,
      // Function for adding a todo
      addTodo: (todo) =>
        set((state) => ({
          todos: [...state.todos, todo],
          activeTodoCount: todo.completed ? state.activeTodoCount : state.activeTodoCount + 1,
        })),
      // Function for updating a todo
      updateTodo: (todo) =>
        set((state) => ({
          todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
          activeTodoCount: todo.completed ? state.activeTodoCount - 1 : state.activeTodoCount + 1,
        })),
      // Function for toggling a todo
      toggleTodo: (todoId) =>
        set((state) => ({
          todos: state.todos.map((t) => (t.id === todoId ? { ...t, completed: !t.completed } : t)),
          activeTodoCount:
            state.activeTodoCount + (state.todos.find((t) => t.id === todoId)?.completed ? 1 : -1),
        })),
      // Function for toggling all todos
      toggleAllTodos: (completed) =>
        set((state) => ({
          todos: state.todos.map((t) => ({ ...t, completed })),
          activeTodoCount: completed ? 0 : state.todos.length,
        })),
      // Function for deleting a todo
      deleteTodo: (todoId) =>
        set((state) => ({
          todos: state.todos.filter((t) => t.id !== todoId),
          activeTodoCount:
            state.activeTodoCount + (state.todos.find((t) => t.id === todoId)?.completed ? 1 : -1),
        })),
      setFilter: (filter) => set(() => ({ activeFilter: filter })),
    }),
    {
      // Persist the store to local storage
      name: "todo-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
