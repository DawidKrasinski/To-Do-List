import { Priority } from "@/app/types/priorityType";
import { PriorityButton } from "./priority-button";
import { useToDoList } from "@/app/toDoListProvider";
import { useEffect } from "react";

interface PriorityProps {
  priority: Priority;
  onChange: (priority: number) => void;
}

export function Priorities({ onChange, priority }: PriorityProps) {
  const { priorityList } = useToDoList();

  return (
    <section className="text-xl flex flex-col gap-2">
      <h3>Priority</h3>
      <div className="flex gap-2 flex-wrap">
        {priorityList.map((priorityElement) => (
          <PriorityButton
            key={priorityElement.id}
            priority={priorityElement}
            isActive={priority.id === priorityElement.id}
            onChange={onChange}
            isDraggable={false}
          />
        ))}
      </div>
    </section>
  );
}
