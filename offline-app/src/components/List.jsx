import React from "react";

const List = ({ todo, deleteTodo, updateTodo }) => {
  return (
    <div className="w-[40%] flex justify-between items-center rounded border border-gray-400 px-4 py-2">
      <h1 style={{ textDecoration: todo.isCompleted ? "line-through" : ""}}>{todo.task}</h1>
      <div className="flex gap-3">
        <button
          onClick={() => updateTodo(todo.id)}
          className="px-4 py-2 bg-green-700 text-white rounded cursor-pointer"
        >
          Completed
        </button>
        <button
          onClick={() => deleteTodo(todo.id)}
          className="px-4 py-2 bg-red-700 text-white rounded cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default List;
