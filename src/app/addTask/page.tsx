"use client";
import { useState } from "react";
import { Task } from "../task.js";

export default function AddTask() {
  const [task, setTask] = useState<Task>({ name: "", description: "" });

  function handleButtonClicked(task: Task) {
    console.log(task);
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  return (
    <div className="w-dvw h-dvh px-5 pt-16">
      <header></header>
      <section>
        <h2 className="text-xl">Schedule</h2>
        <div className="relative">
          <input
            onChange={handleChange}
            value={task.name}
            type="text"
            id="taskNameInput"
            className="absolute foreground w-full h-14 mt-3 cursor-text"
          />
          <label
            htmlFor="taskNameInput"
            className="absolute mt-7 pl-3 opacity-65"
          >
            Name
          </label>
          <div className="static">
            <textarea
              onChange={handleChange}
              value={task.description}
              id="taskDescriptionInput"
              className="absolute foreground w-full h-32 mt-20 cursor-text"
            ></textarea>
            <label
              htmlFor="taskDescriptionInput"
              className="absolute mt-24 pl-3 opacity-65"
            >
              Description
            </label>
          </div>
        </div>
      </section>
      <section className="flex items-end h-full">
        <button
          onClick={() => handleButtonClicked(task)}
          className="bg-gradient-to-r from-purple-400 to-pink-400 w-full h-12 mb-12 rounded-lg"
        >
          Create Task
        </button>
      </section>
    </div>
  );
}
