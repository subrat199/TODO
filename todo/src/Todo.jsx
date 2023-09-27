import React, { useEffect, useState } from "react";
import "./App.css";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

function Todo() {
    const initialTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const [todos, setTodos] = useState(initialTodos);
  const [inputText, setInputText] = useState("");
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  const addTodo = () => {
    if (inputText.trim() === "") {
      return;
    }
   
    let newTodo = {
      id: Date.now(),
      text: inputText,
      completed: false,
      createdAt: new Date(),
    };

    setTodos([...todos, newTodo]);
    setInputText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const toggleTodoComplete = (todoId) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const moveTodoToBottom = (todoId) => {
    const todoToMove = todos.find((todo) => todo.id === todoId);
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    todoToMove.createdAt = new Date();
    setTodos([...updatedTodos, todoToMove]);
  };
  const resetTodos = () => {
    setTodos([...initialTodos]);
  };
  return (
    <div className="App">
      <h1>Todo App</h1>
      <Box className="Box">
        <Input
          type="text"
          placeholder="Add a new todo"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button onClick={addTodo}>Add</Button> 
        <Button onClick={resetTodos} className="reset-button">
          Reset
        </Button>
      </Box>
      <div className="todo-list">
      { todos
          .sort((a, b) => {
            if (a.completed !== b.completed) {
              return a.completed ? 1 : -1;
            }
            return b.createdAt - a.createdAt;
          })
          .map((todo) => (
            <div
              key={todo.id}
              className={`todo-card ${todo.completed ? 'completed' : ''}`}
              onClick={() =>{ 
                moveTodoToBottom(todo.id)
                toggleTodoComplete(todo.id)}}
            >
              <p>{todo.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todo;
