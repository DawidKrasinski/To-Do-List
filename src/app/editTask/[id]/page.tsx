"use client";
import { useRouter } from "next/navigation";
import { Task } from "@/app/types/taskType.js";
import { useToDoList } from "@/app/toDoListProvider";
import { Calendar } from "@/app/components/calendar/calendar-component";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Schedule } from "@/app/components/schedule/schedule-component";
import { Priorities } from "@/app/components/priority/priority-component";
import { Header } from "@/app/components/header/header-component";

export default function EditTask() {
  const params = useParams<{ id: string }>();
  const { deleteTask, editTask } = useToDoList();
  const router = useRouter();
  const [task, setTask] = useState<Task>({
    name: "",
    description: "",
    priority: { id: 0, color: "#ffffff", name: "", order: 0 },
    startTime: "",
    endTime: "",
    date: simpleDate(new Date()),
  });
  const [orginalTaskName, setOrginalTaskName] = useState("");

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

  async function fetchTaskById(id: string) {
    const response = await fetch(`/api/task/${id}`);
    const body = await response.json();
    return body;
  }

  function handleEditTaskButtonClicked(task: Task) {
    if (
      task.name.trim() &&
      task.priority &&
      task.startTime &&
      task.endTime &&
      task.date.trim() &&
      task.id
    ) {
      console.log(task);
      editTask(task);
      router.push("/");
    } else {
      console.log("task request is invalid");
    }
  }

  function handleDeleteTaskButtonClicked(task: Task) {
    if (task.id) {
      deleteTask(task.id);
      router.push("/");
    } else {
      console.log("task request is invalid");
    }
  }

  useEffect(() => {
    async function loadTask() {
      const fetchedTask = await fetchTaskById(params.id);
      setTask(fetchedTask);
      setOrginalTaskName(fetchedTask.name);
      console.log("priority", fetchedTask.priority);
    }
    loadTask();
  }, [params.id]);

  return (
    <>
      <div className="px-4 pt-12 pb-20 flex flex-col gap-8">
        <Header header={orginalTaskName} />
        <Calendar onChange={handleDateChange} date={task.date} />
        <Schedule setTask={setTask} task={task} />
        <Priorities onChange={handlePriorityChange} priority={task.priority} />
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background pt-1">
        <div className="flex gap-6">
          <button
            onClick={() => handleEditTaskButtonClicked(task)}
            className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg p-3 w-full"
          >
            Edit Task
          </button>
          <button
            onClick={() => handleDeleteTaskButtonClicked(task)}
            className="bg-deleteButton rounded-lg p-3 w-full"
          >
            Delete Task
          </button>
        </div>
      </div>
    </>
  );
}
