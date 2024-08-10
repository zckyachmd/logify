export type TaskStatus = "Pending" | "In Progress" | "Completed";
export type TaskPriority = "High" | "Medium" | "Low";

export type Task = {
  id: number;
  task: string;
  title: string;
  detail: string;
  status: TaskStatus;
  priority: TaskPriority;
  deadline: string;
};

export type TaskTableProps = {
  tasks: Task[];
  onAddTask: (task: Omit<Task, "id">) => void;
};

export type AddTaskModalProps = {
  onAddTask: (task: Omit<Task, "id">) => void;
};
