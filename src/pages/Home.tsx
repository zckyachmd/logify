import { useEffect, useState } from "react";
import { Task } from "@/models/Task";
import { TaskTable } from "@/components/TaskTable/Index";
import { getTasksFromLocalStorage } from "@/utils/localStorageUtils";

export function Home(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = getTasksFromLocalStorage();
    setTasks(storedTasks);
  }, []);

  return (
    <div className="max-w-7xl w-full p-6">
      <header className="my-6 text-start">
        <h1 className="text-3xl font-bold mb-2">Logify!</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Here's a list of your tasks for this month!
        </p>
      </header>
      <div className="overflow-x-auto">
        <TaskTable tasks={tasks} />
      </div>
    </div>
  );
}
