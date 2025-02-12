import { Priority } from "./priorityType";

export type Task = {
  id?: number;
  name: string;
  description: string;
  done?: boolean;
  doneDate?: string | null;
  priority: Priority;
  startTime: string;
  endTime: string;
  date: string;
};
