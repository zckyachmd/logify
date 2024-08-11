export type TaskStatus = "Pending" | "In Progress" | "Completed";
export type TaskPriority = "High" | "Medium" | "Low";

export interface Task {
  id: string;
  task: string;
  title: string;
  detail: string;
  priority: string;
  deadline: string;
  status: TaskStatus;
}

export interface TaskTableProps {
  tasks: Task[];
}

export type TableHeaderProps = {
  sortKey: keyof Task | null;
  sortDirection: "asc" | "desc";
  onSort: (key: keyof Task) => void;
};

export interface TableBodyProps {
  tasks: Task[];
  onEdit: (taskId: string) => void;
  onDetail: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

export interface TaskFormProps {
  defaultValues: Task;
  isCreate?: boolean;
  isUpdate?: boolean;
  onGenerateTaskId?: () => void;
  onChangeTask?: (value: string) => void;
  onChangeTitle?: (value: string) => void;
  onChangeDetail?: (value: string) => void;
  onChangePriority?: (value: TaskPriority) => void;
  onChangeDeadline?: (value: string) => void;
  onChangeStatus?: (value: TaskStatus) => void;
}

export interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (newTask: Task) => void;
}

export type TaskDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  taskId: string | null;
};

export interface UpdateTaskModalProps {
  isOpen: boolean;
  taskToUpdate: Task | null;
  onUpdateTask: (updatedTask: Task) => void;
  onClose: () => void;
}
