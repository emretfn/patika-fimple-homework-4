import { useState } from "react";
import { useTodoStore } from "../hooks/useTodoStore";
import { v4 as uuid } from "uuid";

export default function Header() {
  const [todo, setTodo] = useState<string>("");
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    const title = todo.trim();

    if (title) {
      addTodo({
        id: uuid(),
        title,
        completed: false,
      });
      setTodo("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={todo}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </header>
  );
}
