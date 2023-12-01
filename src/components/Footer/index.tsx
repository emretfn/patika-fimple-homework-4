import clsx from "clsx";
import { useTodoStore } from "../../hooks/useTodoStore";
import { FilterTodo } from "../../types";

export default function Footer() {
  // Store actions and state. We need to call these actions seperately because zustand documentation says that
  const activeTodoCount = useTodoStore((state) => state.activeTodoCount);
  const setFilter = useTodoStore((state) => state.setFilter);
  const activeFilter = useTodoStore((state) => state.activeFilter);

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeTodoCount}</strong> item left
      </span>

      {/* 
        Set filter based on the active filter. If user clicks on the filter,
        we set the active filter to the filter that the user clicked on.
      */}
      <ul className="filters">
        <li>
          <a
            href="#"
            className={clsx({
              selected: activeFilter === FilterTodo.All,
            })}
            onClick={() => setFilter(FilterTodo.All)}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#"
            className={clsx({
              selected: activeFilter === FilterTodo.Active,
            })}
            onClick={() => setFilter(FilterTodo.Active)}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#"
            className={clsx({
              selected: activeFilter === FilterTodo.Completed,
            })}
            onClick={() => setFilter(FilterTodo.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>
    </footer>
  );
}
