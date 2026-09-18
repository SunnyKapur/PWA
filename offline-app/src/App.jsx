import React, { useEffect, useState } from "react";
import List from "./components/List";
import { nanoid } from "nanoid";
import axios from "axios";

const App = () => {
  const [inpValue, setInpValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [productsData, setProductsData] = useState([]);

  const getProductsData = async () => {
    try {
      let res = await axios.get("https://fakestoreapi.com/products");
      setProductsData(res.data);
    } catch (error) {
      console.log("error in products api", error);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

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
        val.id === id ? { ...val, isCompleted: !val.isCompleted } : val,
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
          return (
            <List
              key={val.id}
              todo={val}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
            />
          );
        })}
      </div>

      <div>
        {productsData.map((val) => (
          <h1 key={val.id}>{val.title}</h1>
        ))}
      </div>
    </div>
  );
};

export default App;
