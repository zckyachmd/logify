export type TaskStatus = "Pending" | "In Progress" | "Completed";
export type TaskPriority = "High" | "Medium" | "Low";

export interface Task {
  id: string;
  task: string;
  title: string;
  detail: string;
  status: TaskStatus;
  priority: TaskPriority;
  deadline: string;
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
  selectedTaskId: string | null;
  setSelectedTaskId: (id: string | null) => void;
  setTasks: (tasks: Task[]) => void;
  openTaskDetailModal: (taskId: string) => void;
  openTaskEditModal: (taskId: string) => void;
  openDeleteDialog: (taskId: string) => void;
}

export interface TaskFormProps {
  task: string;
  title: string;
  detail: string;
  priority: TaskPriority;
  deadline: string;
  status?: string;
  onChangeTask?: (value: string) => void;
  onChangeTitle?: (value: string) => void;
  onChangeDetail?: (value: string) => void;
  onChangePriority?: (value: TaskPriority) => void;
  onChangeDeadline?: (value: string) => void;
  onChangeStatus?: (value: TaskStatus) => void;
  onGenerateTaskId?: () => void;
  isCreate?: boolean;
  isUpdate?: boolean;
}

export type AddTaskModalProps = {
  onAddTask: (task: Task) => void;
};

export interface TaskDetailModalProps {
  taskId: string;
  isOpen: boolean;
  onClose: () => void;
}

export interface UpdateTaskModalProps {
  taskToUpdate: Task;
  onUpdateTask: (updatedTask: Task) => void;
  onClose: () => void;
}
