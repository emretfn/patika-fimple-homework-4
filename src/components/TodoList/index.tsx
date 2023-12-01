import { useTodoStore } from "../../hooks/useTodoStore";
import TodoItem from "../TodoItem";

export default function TodoList() {
  // Store actions and state. We need to call these actions seperately because zustand documentation says that
  const activeTodoCount = useTodoStore((state) => state.activeTodoCount);
  const todos = useTodoStore((state) => state.todos);
  const toggleAllTodos = useTodoStore((state) => state.toggleAllTodos);

  // This function is called when the user clicks on the toggle all checkbox.
  const handleToggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isComplete = e.target.checked;
    toggleAllTodos(isComplete);
  };
  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        checked={activeTodoCount === 0}
        onChange={handleToggleAll}
      />
      <label htmlFor="toggle-all" />
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  );
}
