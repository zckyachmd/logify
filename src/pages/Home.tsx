import { useEffect, useState } from "react";
import { Task } from "@/models/Task";
import { TaskTable } from "@/components/TaskTable/Index";
import { AddTaskModal } from "@/components/modal/AddTaskModal";
import {
  getTasksFromLocalStorage,
  saveTasksToLocalStorage,
  seedTasksIfEmpty,
} from "@/utils/localStorageUtils";

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

export function Home(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    seedTasksIfEmpty(initialTasks);

    const storedTasks = getTasksFromLocalStorage();
    setTasks(storedTasks);
  }, []);

  const handleTaskAdd = (newTask: Task) => {
    const updatedTasks = [...tasks, newTask];
    const uniqueTasks = Array.from(
      new Map(updatedTasks.map((task) => [task.id, task])).values(),
    );
    setTasks(uniqueTasks);
    saveTasksToLocalStorage(uniqueTasks);
  };

  return (
    <div className="max-w-7xl w-full p-6">
      <header className="my-6 text-start">
        <h1 className="text-3xl font-bold mb-2">Logify!</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Here's a list of your tasks for this month!
        </p>
      </header>
      <div className="overflow-x-auto">
        <AddTaskModal onAddTask={handleTaskAdd} />
        <TaskTable tasks={tasks} />
      </div>
    </div>
  );
}
