import { Task } from "@/app/types/taskType";
import { useState } from "react";
import { useToDoList } from "@/app/toDoListProvider";
import Link from "next/link";

export function TaskComponent({ task }: { task: Task }) {
  const { id, name, done, doneDate, date, priority } = task;

  if (id === undefined || done === undefined || doneDate === undefined) {
    throw new Error("Task has invalid properties");
  }

  const { uploadTaskDone } = useToDoList();
  const [isDone, setIsDone] = useState(done);

  const changeDoneStatus = async () => {
    if (id !== undefined) {
      setIsDone((prevDone) => !prevDone);
      await uploadTaskDone(id, !isDone);
    } else {
      console.error("Task ID is undefined.");
    }
  };

  return (
    <div className="flex h-20 bg-muted rounded-lg overflow-hidden">
      <div
        style={{ backgroundColor: priority.color }}
        className={`w-4 h-full`}
      ></div>
      <div className="flex flex-1 items-center justify-between px-4">
        <Link href={`/editTask/${id}`}>
          <h3>{name}</h3>
          <span className="text-sm opacity-65">{date.split("T")[0]}</span>
        </Link>
        <div className="flex justify-center items-center">
          <button
            onClick={changeDoneStatus}
            className={`w-7 h-7 rounded-full ${
              isDone
                ? "bg-purple-400 text-black flex justify-center items-center"
                : "bg-transparent border-2 border-purple-400 text-transparent"
            }`}
          >
            <i className="fa-solid fa-check"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
