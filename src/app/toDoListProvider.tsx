"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { Task } from "./taskType";
import { Priority } from "./priorityType";

export type ToDoListContextType = {
  taskList: Task[];
  priorityList: Priority[];
  addTask: (task: Task) => Promise<void>;
  uploadTaskDone: (id: string, done: boolean) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  editTask: (id: string, task: Task) => Promise<void>;
  addPriority: (priority: Priority) => Promise<void>
};

const ToDoListContext = createContext<ToDoListContextType | null>(null);

export default function ToDoListProvider(props: { children: React.ReactNode }) {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [priorityList, setPriorityList] = useState<Priority[]>([]);

  async function fetchTasks() {
    const response = await fetch("/api/task");
    const body = await response.json();
    console.log(body)
    setTaskList(body);
  }

  async function fetchPriorities() {
    const response = await fetch("/api/priority");
    const body = await response.json();
    setPriorityList(body);
    console.log(body);
  }

  async function addTask(task: Task) {
    const response = await fetch("/api/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: task.name,
        description: task.description,
        priority: task.priority,
        startTime: task.startTime,
        endTime: task.endTime,
        date: task.date,
      }),
    });
    fetchTasks();
  }

  async function addPriority(priority: Priority) {
    const response = await fetch("/api/priority", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: priority.order,
        color: priority.color,
        name: priority.name,
      })
    })
    fetchPriorities()
  }

  async function deleteTask(id: string) {
    await fetch(`/api/task/${parseInt(id, 10)}`, {
      method: "DELETE",
    });
    fetchTasks();
  }

  async function uploadTaskDone(id: string, done: boolean) {
    await fetch(`/api/task/${parseInt(id, 10)}`, {
      method: "PATCH",
      body: JSON.stringify({ done }),
    });
    fetchTasks();
  }

  async function editTask(id: string, task: Task) {
    await fetch(`/api/task/${parseInt(id, 10)}`, {
      method: "PUT",
      body: JSON.stringify({
        name: task.name,
        description: task.description,
        priority: task.priority,
        startTime: task.startTime,
        endTime: task.endTime,
        date: task.date.split("T")[0],
        id: parseInt(id, 10),
      }),
    });
    fetchTasks();
  }

  useEffect(() => {
    fetchTasks();
    fetchPriorities();
  }, []);

  return (
    <ToDoListContext.Provider
      value={{
        addTask,
        uploadTaskDone,
        deleteTask,
        editTask,
        addPriority,
        taskList,
        priorityList,
      }}
    >
      {props.children}
    </ToDoListContext.Provider>
  );
}

export function useToDoList() {
  const context = useContext(ToDoListContext);
  if (!context) {
    throw new Error("useToDoList must be used within a TodoListProvider");
  }
  return context;
}
