import { useState, useEffect } from 'react';
import { Task } from '../interfaces/task.interface';

const useTaskApi = () => {
  const baseUrl = 'http://localhost:3000/api/tasks';
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = async () => {
    const response = await fetch(baseUrl);
    const data = await response.json();
    setTasks(data);
  };

  const createTask = async (newTask: Omit<Task, 'id'>) => {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });

    if (response.ok) {
      const createdTask = await response.json();
      setTasks((prev) => [...prev, createdTask]);
    }
  };

  const updateTask = async (id: number, updatedFields: Partial<Task>) => {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFields),
    });

    if (response.ok) {
      const updatedTask = await response.json();
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, ...updatedTask } : task
        )
      );
    }
  };

  const deleteTask = async (id: number) => {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }
  };

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return { tasks, getTasks, createTask, updateTask, deleteTask };
};

export default useTaskApi;
