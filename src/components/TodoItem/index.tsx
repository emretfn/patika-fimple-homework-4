import clsx from "clsx";
import { Todo } from "../../types";
import { useState } from "react";
import { useTodoStore } from "../../hooks/useTodoStore";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  // This states for editing the todo item.
  // If the user double clicks on the todo item, the todo item will be in edit mode.
  // The user can then edit the todo item and press enter to save the changes or press escape to cancel the changes.
  const [editTitle, setEditTitle] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Todo store actions. We need to call these actions seperately because zustand documentation says that
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  // This function is called when the user double clicks on the todo item.
  const handleEditAction = () => {
    setEditTitle(todo.title);
    setIsEditing(true);
  };

  // This function is called when the user changes the input value.
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  // This function is called when the user presses a key while editing the todo item.
  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setEditTitle(todo.title);
      setIsEditing(false);
    }
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  // This function is called when the user presses enter or blurs the input field.
  const handleSubmit = () => {
    if (editTitle.trim()) {
      updateTodo({
        ...todo,
        title: editTitle.trim(),
      });
      setIsEditing(false);
    }
  };

  return (
    <li
      // This is a dynamic class name. It will be either "completed" or "editing" depending on the todo item's state.
      className={clsx({
        completed: todo.completed,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        <label onDoubleClick={handleEditAction}>{todo.title}</label>
        <button type="button" className="destroy" onClick={() => deleteTodo(todo.id)} />
      </div>
      {/* 
        This input field is hidden by default. 
        It is only visible when the user double clicks on the todo item.
      */}
      {isEditing && (
        <input
          type="text"
          className="edit"
          value={editTitle}
          onChange={handleEditInputChange}
          onBlur={handleSubmit}
          onKeyDown={handleEditKeyDown}
        />
      )}
    </li>
  );
}
