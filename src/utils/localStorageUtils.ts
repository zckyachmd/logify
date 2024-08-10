import { Task } from "@/models/Task";

const LOCAL_STORAGE_KEY = "tasks";

export const getTasksFromLocalStorage = (): Task[] => {
  const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedTasks ? JSON.parse(storedTasks) : [];
};

export const saveTasksToLocalStorage = (tasks: Task[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
};

export const seedTasksIfEmpty = (initialTasks: Task[]): void => {
  const existingTasks = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!existingTasks || JSON.parse(existingTasks).length === 0) {
    saveTasksToLocalStorage(initialTasks);
  }
};
