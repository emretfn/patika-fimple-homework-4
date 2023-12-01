import { useTodoStore } from "../../hooks/useTodoStore";
import TodoItem from "../TodoItem";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function TodoList() {
  // Store actions and state. We need to call these actions seperately because zustand documentation says that
  const activeTodoCount = useTodoStore((state) => state.activeTodoCount);
  const todos = useTodoStore((state) => state.todos);
  const toggleAllTodos = useTodoStore((state) => state.toggleAllTodos);
  const activeFilter = useTodoStore((state) => state.activeFilter);

  // This is used for auto animation.
  const [parent] = useAutoAnimate();

  // Filter todos based on the active filter.
  const filteredTodos = todos.filter((todo) => {
    switch (activeFilter) {
      case "Active":
        return !todo.completed;
      case "Completed":
        return todo.completed;
      default:
        return true;
    }
  });

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
      <ul className="todo-list" ref={parent}>
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  );
}
