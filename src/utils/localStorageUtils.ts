import { Task } from "@/models/Task";

const LOCAL_STORAGE_KEY = "tasks";
const initialTasks: Task[] = [
  {
    id: "123ABC",
    task: "TS-123ABC",
    title: "Sample Task 1",
    detail: "This is a sample task. Please complete it.",
    status: "Pending",
    priority: "Low",
    deadline: "2024-12-12",
  },
];

export const getTasksFromLocalStorage = (): Task[] => {
  try {
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!storedTasks) {
      saveTasksToLocalStorage(initialTasks);
      return initialTasks;
    }

    return JSON.parse(storedTasks) as Task[];
  } catch (error) {
    console.error("Failed to retrieve tasks from local storage", error);
    return initialTasks;
  }
};

export const saveTasksToLocalStorage = (tasks: Task[]): void => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks to local storage", error);
  }
};
