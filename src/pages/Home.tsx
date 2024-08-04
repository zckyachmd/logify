import { TaskTable } from "@/components/TaskTable";

export function Home(): JSX.Element {
  const tasks = [
    {
      id: 1,
      task: "T1",
      title: "Task 1",
      status: "Completed",
      priority: "High",
    },
    {
      id: 2,
      task: "T2",
      title: "Task 2",
      status: "In Progress",
      priority: "Medium",
    },
    { id: 3, task: "T3", title: "Task 3", status: "Pending", priority: "Low" },
    {
      id: 4,
      task: "T4",
      title: "Task 4",
      status: "Completed",
      priority: "Low",
    },
    {
      id: 5,
      task: "T5",
      title: "Task 5",
      status: "In Progress",
      priority: "High",
    },
    {
      id: 6,
      task: "T6",
      title: "Task 6",
      status: "Pending",
      priority: "Medium",
    },
    {
      id: 7,
      task: "T7",
      title: "Task 7",
      status: "Completed",
      priority: "High",
    },
    {
      id: 8,
      task: "T8",
      title: "Task 8",
      status: "In Progress",
      priority: "Low",
    },
    {
      id: 9,
      task: "T9",
      title: "Task 9",
      status: "Pending",
      priority: "Medium",
    },
    {
      id: 10,
      task: "T10",
      title: "Task 10",
      status: "Completed",
      priority: "Medium",
    },
    {
      id: 11,
      task: "T11",
      title: "Task 11",
      status: "In Progress",
      priority: "High",
    },
    {
      id: 12,
      task: "T12",
      title: "Task 12",
      status: "Pending",
      priority: "Low",
    },
    {
      id: 13,
      task: "T13",
      title: "Task 13",
      status: "Completed",
      priority: "Medium",
    },
    {
      id: 14,
      task: "T14",
      title: "Task 14",
      status: "In Progress",
      priority: "High",
    },
    {
      id: 15,
      task: "T15",
      title: "Task 15",
      status: "Pending",
      priority: "Medium",
    },
    {
      id: 16,
      task: "T16",
      title: "Task 16",
      status: "Completed",
      priority: "Low",
    },
    {
      id: 17,
      task: "T17",
      title: "Task 17",
      status: "In Progress",
      priority: "High",
    },
    {
      id: 18,
      task: "T18",
      title: "Task 18",
      status: "Pending",
      priority: "Low",
    },
    {
      id: 19,
      task: "T19",
      title: "Task 19",
      status: "Completed",
      priority: "Medium",
    },
    {
      id: 20,
      task: "T20",
      title: "Task 20",
      status: "In Progress",
      priority: "High",
    },
    {
      id: 21,
      task: "T21",
      title: "Task 21",
      status: "Pending",
      priority: "Medium",
    },
    {
      id: 22,
      task: "T22",
      title: "Task 22",
      status: "Completed",
      priority: "High",
    },
    {
      id: 23,
      task: "T23",
      title: "Task 23",
      status: "In Progress",
      priority: "Low",
    },
    {
      id: 24,
      task: "T24",
      title: "Task 24",
      status: "Pending",
      priority: "Medium",
    },
    {
      id: 25,
      task: "T25",
      title: "Task 25",
      status: "Completed",
      priority: "High",
    },
    {
      id: 26,
      task: "T26",
      title: "Task 26",
      status: "In Progress",
      priority: "Medium",
    },
    {
      id: 27,
      task: "T27",
      title: "Task 27",
      status: "Pending",
      priority: "Low",
    },
    {
      id: 28,
      task: "T28",
      title: "Task 28",
      status: "Completed",
      priority: "Medium",
    },
    {
      id: 29,
      task: "T29",
      title: "Task 29",
      status: "In Progress",
      priority: "High",
    },
    {
      id: 30,
      task: "T30",
      title: "Task 30",
      status: "Pending",
      priority: "Low",
    },
  ];

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
