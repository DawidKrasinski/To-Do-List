import { Task } from "@/app/types/taskType";
import { useEffect, useRef } from "react";

interface ScheduleProps {
  task: Task;
  setTask: React.Dispatch<React.SetStateAction<Task>>;
}

function EditableArea({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = value;
  }, [value]);

  return (
    <div
      contentEditable={true}
      ref={ref}
      onInput={(e) => onChange(e.currentTarget.innerText)}
      className="bg-muted rounded-lg p-3 min-h-24 relative empty:after:content-['Description'] after:absolute after:top-3 after:left-3 after:text-muted-foreground/40"
    ></div>
  );
}

export function Schedule({ setTask, task }: ScheduleProps) {
  const handleInputChange = (value: string, field: keyof Task) => {
    setTask((prevTask) => ({ ...prevTask, [field]: value }));
  };

  const handleDescriptionDivChange = (value: string) => {
    setTask((prevTask) => ({ ...prevTask, description: value }));
  };

  return (
    <>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl">Schedule</h2>
        <input
          autoComplete="off"
          name="name"
          onChange={(e) => handleInputChange(e.target.value, "name")}
          value={task.name}
          type="text"
          className="bg-muted p-3 placeholder:text-muted-foreground/40 rounded-lg"
          placeholder="Name"
        />
        <EditableArea
          value={task.description}
          onChange={handleDescriptionDivChange}
        />
      </section>

      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-2">
          <h3 className="text-lg">Start Time</h3>
          <input
            type="time"
            onChange={(e) => handleInputChange(e.target.value, "startTime")}
            value={task.startTime}
            className="bg-muted p-3 rounded-lg"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <h3 className="text-lg">End Time</h3>
          <input
            type="time"
            onChange={(e) => handleInputChange(e.target.value, "endTime")}
            value={task.endTime}
            className="bg-muted p-3 rounded-lg"
          />
        </div>
      </div>
    </>
  );
}
