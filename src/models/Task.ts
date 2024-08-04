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

export type TableHeaderProps = {
  sortKey: keyof Task | null;
  sortDirection: "asc" | "desc";
  onSort: (key: keyof Task) => void;
};

export type TaskTableProps = {
  tasks: Task[];
  onAddTask: (task: Omit<Task, "id">) => void;
};

export type TableBodyProps = {
  tasks: Task[];
};

export type AddTaskModalProps = {
  onAddTask: (task: Omit<Task, "id">) => void;
};
