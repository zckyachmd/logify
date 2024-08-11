import { useEffect, useReducer } from "react";
import { Table } from "@/components/ui/table";
import { TableHeader } from "@/components/TaskTable/TableHeader";
import { TableBody } from "@/components/TaskTable/TableBody";
import { Pagination } from "@/components/TaskTable/TablePagination";
import { Task, TaskTableProps } from "@/models/Task";
import { AddTaskModal } from "@/components/modal/AddTaskModal";
import { DetailTaskModal } from "@/components/modal/DetailTaskModal";
import { UpdateTaskModal } from "@/components/modal/UpdateTaskModal";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { saveTasksToLocalStorage } from "@/utils/localStorageUtils";
import { toast } from "react-toastify";

type State = {
  tasks: Task[];
  sortKey: keyof Task | null;
  sortDirection: "asc" | "desc";
  currentPage: number;
  tasksPerPage: number;
  selectedTaskId: string | null;
  isDetailModalOpen: boolean;
  isEditModalOpen: boolean;
  isDeleteDialogOpen: boolean;
  taskToEdit: Task | null;
  taskToDelete: string | null;
  statusFilter: string | null;
  priorityFilter: "all" | "Low" | "Medium" | "High" | null;
};

type Action =
  | { type: "SET_TASKS"; payload: Task[] }
  | { type: "SET_SORT_KEY"; payload: keyof Task | null }
  | { type: "SET_SORT_DIRECTION"; payload: "asc" | "desc" }
  | { type: "SET_CURRENT_PAGE"; payload: number }
  | { type: "SET_TASKS_PER_PAGE"; payload: number }
  | { type: "SET_SELECTED_TASK_ID"; payload: string | null }
  | { type: "TOGGLE_DETAIL_MODAL"; payload: boolean }
  | { type: "TOGGLE_EDIT_MODAL"; payload: boolean; task?: Task | null }
  | { type: "TOGGLE_DELETE_DIALOG"; payload: boolean; taskId?: string | null }
  | { type: "SET_STATUS_FILTER"; payload: string | null }
  | {
      type: "SET_PRIORITY_FILTER";
      payload: "all" | "Low" | "Medium" | "High" | null;
    };

const initialState: State = {
  tasks: [],
  sortKey: null,
  sortDirection: "asc",
  currentPage: 1,
  tasksPerPage: 10,
  selectedTaskId: null,
  isDetailModalOpen: false,
  isEditModalOpen: false,
  isDeleteDialogOpen: false,
  taskToEdit: null,
  taskToDelete: null,
  statusFilter: null,
  priorityFilter: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_TASKS":
      return { ...state, tasks: action.payload };
    case "SET_SORT_KEY":
      return { ...state, sortKey: action.payload };
    case "SET_SORT_DIRECTION":
      return { ...state, sortDirection: action.payload };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_TASKS_PER_PAGE":
      return { ...state, tasksPerPage: action.payload, currentPage: 1 };
    case "SET_SELECTED_TASK_ID":
      return { ...state, selectedTaskId: action.payload };
    case "TOGGLE_DETAIL_MODAL":
      return { ...state, isDetailModalOpen: action.payload };
    case "TOGGLE_EDIT_MODAL":
      return {
        ...state,
        isEditModalOpen: action.payload,
        taskToEdit: action.task || null,
      };
    case "TOGGLE_DELETE_DIALOG":
      return {
        ...state,
        isDeleteDialogOpen: action.payload,
        taskToDelete: action.taskId || null,
      };
    case "SET_STATUS_FILTER":
      return { ...state, statusFilter: action.payload };
    case "SET_PRIORITY_FILTER":
      return { ...state, priorityFilter: action.payload };
    default:
      return state;
  }
}

export function TaskTable({ tasks }: TaskTableProps): JSX.Element {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    tasks,
  });

  useEffect(() => {
    dispatch({ type: "SET_TASKS", payload: tasks });
  }, [tasks]);

  useEffect(() => {
    dispatch({ type: "SET_TASKS", payload: state.tasks });
  }, [state.tasks]);

  const filteredTasks = state.tasks
    .filter((task) =>
      state.statusFilter ? task.status === state.statusFilter : true,
    )
    .filter((task) =>
      state.priorityFilter ? task.priority === state.priorityFilter : true,
    );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (state.sortKey) {
      const aValue = a[state.sortKey as keyof Task];
      const bValue = b[state.sortKey as keyof Task];

      if (aValue === undefined || bValue === undefined) {
        return 0;
      }

      if (aValue < bValue) return state.sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return state.sortDirection === "asc" ? 1 : -1;
      return 0;
    }
    return 0;
  });

  const indexOfLastTask = state.currentPage * state.tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - state.tasksPerPage;
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);

  const handleStatusFilterChange = (value: string) => {
    dispatch({
      type: "SET_STATUS_FILTER",
      payload: value === "all" ? null : value,
    });
  };

  const handlePriorityFilterChange = (
    value: "all" | "Low" | "Medium" | "High",
  ) => {
    dispatch({
      type: "SET_PRIORITY_FILTER",
      payload: value === "all" ? null : value,
    });
  };

  const handleSort = (key: keyof Task) => {
    if (state.sortKey === key) {
      dispatch({
        type: "SET_SORT_DIRECTION",
        payload: state.sortDirection === "asc" ? "desc" : "asc",
      });
    } else {
      dispatch({ type: "SET_SORT_KEY", payload: key });
      dispatch({ type: "SET_SORT_DIRECTION", payload: "asc" });
    }
  };

  const handleTasksPerPageChange = (value: number) => {
    dispatch({ type: "SET_TASKS_PER_PAGE", payload: value });
  };

  const handlePageChange = (page: number) => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: page });
  };

  const totalPages = Math.ceil(state.tasks.length / state.tasksPerPage);

  const openTaskAddModal = (newTask: Task) => {
    const updatedTasks = [...state.tasks, newTask];
    const uniqueTasks = Array.from(
      new Map(updatedTasks.map((task) => [task.id, task])).values(),
    );
    dispatch({ type: "SET_TASKS", payload: uniqueTasks });
    saveTasksToLocalStorage(uniqueTasks);
    toast.success(`Task '${newTask.task}' has been added successfully!`);
  };

  const openTaskDetailModal = (taskId: string) => {
    dispatch({ type: "SET_SELECTED_TASK_ID", payload: taskId });
    dispatch({ type: "TOGGLE_DETAIL_MODAL", payload: true });
  };

  const openTaskEditModal = (taskId: string) => {
    const task = state.tasks.find((task) => task.id === taskId);
    if (task) {
      dispatch({ type: "TOGGLE_EDIT_MODAL", payload: true, task });
    }
  };

  const openDeleteDialog = (taskId: string) => {
    dispatch({ type: "TOGGLE_DELETE_DIALOG", payload: true, taskId });
  };

  const updateTask = (updatedTask: Task) => {
    const updatedTasks = state.tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task,
    );
    dispatch({ type: "SET_TASKS", payload: updatedTasks });
    saveTasksToLocalStorage(updatedTasks);
    toast.success(`Task '${updatedTask.task}' has been updated successfully!`);
    dispatch({ type: "TOGGLE_EDIT_MODAL", payload: false });
  };

  const deleteTask = () => {
    if (state.taskToDelete) {
      const taskToDeleteObj = state.tasks.find(
        (task) => task.id === state.taskToDelete,
      );
      const updatedTasks = state.tasks.filter(
        (task) => task.id !== state.taskToDelete,
      );
      dispatch({ type: "SET_TASKS", payload: updatedTasks });
      saveTasksToLocalStorage(updatedTasks);
      toast.success(
        `Task '${taskToDeleteObj?.task}' has been deleted successfully!`,
      );
      dispatch({ type: "TOGGLE_DELETE_DIALOG", payload: false });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center space-x-4 mb-4">
        <AddTaskModal
          isOpen={state.isEditModalOpen}
          onClose={() =>
            dispatch({ type: "TOGGLE_EDIT_MODAL", payload: false })
          }
          onAddTask={openTaskAddModal}
        />
        <div className="w-32 text-sm">
          <Select onValueChange={handleStatusFilterChange}>
            <SelectTrigger className=" p-2">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="p-1">
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-32 text-sm">
          <div className="w-32 text-sm">
            <Select onValueChange={handlePriorityFilterChange}>
              <SelectTrigger className=" p-2">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent className="p-1">
                <SelectGroup>
                  <SelectLabel>Priority</SelectLabel>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <Table>
        <TableHeader
          onSort={handleSort}
          sortKey={state.sortKey}
          sortDirection={state.sortDirection}
        />
        <TableBody
          tasks={currentTasks}
          onEdit={openTaskEditModal}
          onDetail={openTaskDetailModal}
          onDelete={openDeleteDialog}
        />
      </Table>
      <Pagination
        currentPage={state.currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        tasksPerPage={state.tasksPerPage}
        onTasksPerPageChange={handleTasksPerPageChange}
      />
      <DetailTaskModal
        isOpen={state.isDetailModalOpen}
        onClose={() =>
          dispatch({ type: "TOGGLE_DETAIL_MODAL", payload: false })
        }
        taskId={state.selectedTaskId}
      />
      <UpdateTaskModal
        isOpen={state.isEditModalOpen}
        taskToUpdate={state.taskToEdit}
        onUpdateTask={updateTask}
        onClose={() => dispatch({ type: "TOGGLE_EDIT_MODAL", payload: false })}
      />
      <AlertDialog
        open={state.isDeleteDialogOpen}
        onOpenChange={(open) =>
          dispatch({ type: "TOGGLE_DELETE_DIALOG", payload: open })
        }
      >
        <AlertDialogContent>
          <AlertDialogTitle>Delete Task</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this task?
          </AlertDialogDescription>
          <div className="flex gap-4 mt-4">
            <AlertDialogAction onClick={deleteTask}>
              Yes, delete
            </AlertDialogAction>
            <AlertDialogCancel
              onClick={() =>
                dispatch({ type: "TOGGLE_DELETE_DIALOG", payload: false })
              }
            >
              Cancel
            </AlertDialogCancel>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
