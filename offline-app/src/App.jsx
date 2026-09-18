import React, { useState } from "react";
import List from "./components/List";
import { nanoid } from "nanoid";

const App = () => {
  const [inpValue, setInpValue] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (inpValue.trim() === "") return;

    setTodos([...todos, { id: nanoid(), isCompleted: false, task: inpValue }]);
    setInpValue("");
  };

  const deleteTodo = (id) => {
    let arr = todos.filter((val) => val.id !== id);
    setTodos(arr);
  };

  const updateTodo = (id) => {
    setTodos((prev) => {
      return prev.map((val) =>
        val.id === id ? { ...val, isCompleted: true } : val,
      );
    });
  };

  return (
    <div className="h-screen gap-5 flex flex-col items-center justify-center">
      <div className="flex gap-5">
        <input
          value={inpValue}
          onChange={(e) => setInpValue(e.target.value)}
          className="p-2 border border-gray-400 rounded"
          type="text"
          placeholder="Enter Task..."
        />
        <button onClick={addTodo} className="px-4 py-2 bg-blue-700 text-white">
          Add
        </button>
      </div>

      <div className="w-full flex flex-col gap-4 items-center justify-center">
        {todos.map((val) => {
          return <List key={val.id} todo={val} deleteTodo={deleteTodo} updateTodo={updateTodo} />;
        })}
      </div>
    </div>
  );
};

export default App;
