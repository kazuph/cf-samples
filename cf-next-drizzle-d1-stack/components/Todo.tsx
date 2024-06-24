'use client';

import { useState, useEffect } from 'react';
import { hc } from 'hono/client';
import type { AppType } from '../api/[[...route]]/route';

const client = hc<AppType>('/api');

interface Todo {
  id: number;
  description: string;
  completed: boolean;
}

export default function Todo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await client.todos.$get();
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      await client.todos.$post({
        json: { description: newTodo }
      });
      setNewTodo('');
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodo = async (id: number, completed: boolean) => {
    try {
      await client.todos[':id'].toggle.$put({
        param: { id: id.toString() },
        json: { id, completed: !completed }
      });
      fetchTodos();
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await client.todos[':id'].$delete({
        param: { id }
      });
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="mb-4 text-2xl font-bold">Todo List</h1>
      <form onSubmit={addTodo} className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="p-2 mt-2 text-white bg-blue-500 rounded">
          Add Todo
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between p-2 border-b">
            <span
              className={`cursor-pointer ${todo.completed ? 'line-through' : ''}`}
              onClick={() => toggleTodo(todo.id, todo.completed)}
            >
              {todo.description}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
