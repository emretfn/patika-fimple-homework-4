import { useState } from "react";

export default function Header() {
  const [todo, setTodo] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    const title = todo.trim();

    if (title) {
      //TODO: use context to add todo
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
