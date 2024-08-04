import { useState } from "react";
import { TaskTable } from "@/components/TaskTable";
import { Task } from "@/models/Task";
import { AddTaskModal } from "@/components/TaskTable/AddTaskModal";

const initialTasks: Task[] = [
  {
    id: 1,
    task: "TS-123ABC",
    title: "Sample Task 1",
    detail: "This is a sample task. Please complete it.",
    status: "Pending",
    priority: "Low",
    deadline: "2024-12-12",
  },
];

export function Home(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleAddTask = (newTask: Omit<Task, "id">) => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
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
        <AddTaskModal onAddTask={handleAddTask} />
        <TaskTable tasks={tasks} onAddTask={handleAddTask} />
      </div>
    </div>
  );
}
