"use client";
import { Header } from "../components/header/header-component";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Task } from "../types/taskType.js";
import { useToDoList } from "../toDoListProvider";
import { Calendar } from "../components/calendar/calendar-component";
import { Schedule } from "@/app/components/schedule/schedule-component";
import { Priorities } from "@/app/components/priority/priority-component";

export default function AddTask() {
  const [task, setTask] = useState<Task>({
    name: "",
    description: "",
    priority: { id: 0, color: "#ffffff", name: "", order: 0 },
    startTime: "",
    endTime: "",
    date: simpleDate(new Date()),
  });
  const { addTask } = useToDoList();
  const router = useRouter();

  function simpleDate(date: Date) {
    return date.toISOString().split("T")[0];
  }

  const handleDateChange = (date: string) => {
    setTask((prevTask) => ({ ...prevTask, date }));
  };

  const handlePriorityChange = (priority: number) => {
    const updatedTask = {
      ...task,
      priority: { ...task.priority, id: priority },
    };
    setTask(updatedTask);
  };

  function handleAddTaskButtonClicked(task: Task) {
    if (
      task.name.trim() &&
      task.priority.id &&
      task.startTime &&
      task.endTime &&
      task.date.trim() &&
      task.name.length < 20
    ) {
      console.log(task);
      addTask(task);
      router.push("/");
    } else {
      console.log("task request is invalid");
    }
  }

  return (
    <>
      <div className="px-4 pt-12 pb-20 flex flex-col gap-8">
        <Header header="Create new task" />
        <Calendar onChange={handleDateChange} date={task.date} />
        <Schedule setTask={setTask} task={task} />
        <Priorities onChange={handlePriorityChange} priority={task.priority} />

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background pt-1">
          <button
            onClick={() => handleAddTaskButtonClicked(task)}
            className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg p-3 w-full"
          >
            Create Task
          </button>
        </div>
      </div>
    </>
  );
}
