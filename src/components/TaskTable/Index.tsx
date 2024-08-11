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
  | { type: "TOGGLE_DELETE_DIALOG"; payload: boolean; taskId?: string | null };

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
    default:
      return state;
  }
}

export function TaskTable({ tasks }: TaskTableProps): JSX.Element {
  const [state, dispatch] = useReducer(reducer, { ...initialState, tasks });

  useEffect(() => {
    dispatch({ type: "SET_TASKS", payload: tasks });
  }, [tasks]);

  const sortedTasks = [...state.tasks].sort((a, b) => {
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
        `Task '${taskToDeleteObj?.task || "Unknown Task"}' has been deleted successfully!`,
      );
      dispatch({ type: "TOGGLE_DELETE_DIALOG", payload: false });
    }
  };

  return (
    <>
      <AddTaskModal onAddTask={openTaskAddModal} />
      <div className="rounded-lg shadow-sm overflow-hidden">
        <Table className="w-full border border-gray-200 dark:border-gray-700">
          <TableHeader
            sortKey={state.sortKey}
            sortDirection={state.sortDirection}
            onSort={handleSort}
          />
          <TableBody
            tasks={currentTasks}
            selectedTaskId={state.selectedTaskId}
            setSelectedTaskId={(id) =>
              dispatch({ type: "SET_SELECTED_TASK_ID", payload: id })
            }
            setTasks={(tasks) =>
              dispatch({ type: "SET_TASKS", payload: tasks })
            }
            openTaskDetailModal={openTaskDetailModal}
            openTaskEditModal={openTaskEditModal}
            openDeleteDialog={openDeleteDialog}
          />
        </Table>
        <Pagination
          currentPage={state.currentPage}
          totalPages={totalPages}
          tasksPerPage={state.tasksPerPage}
          onPageChange={handlePageChange}
          onTasksPerPageChange={handleTasksPerPageChange}
        />
        {state.isDetailModalOpen && state.selectedTaskId && (
          <DetailTaskModal
            taskId={state.selectedTaskId}
            onClose={() =>
              dispatch({ type: "TOGGLE_DETAIL_MODAL", payload: false })
            }
            isOpen={state.isDetailModalOpen}
          />
        )}
        {state.isEditModalOpen && state.taskToEdit && (
          <UpdateTaskModal
            taskToUpdate={state.taskToEdit}
            onUpdateTask={updateTask}
            onClose={() => {
              dispatch({ type: "TOGGLE_EDIT_MODAL", payload: false });
            }}
          />
        )}
        {state.isDeleteDialogOpen && (
          <AlertDialog
            open={state.isDeleteDialogOpen}
            onOpenChange={() =>
              dispatch({ type: "TOGGLE_DELETE_DIALOG", payload: false })
            }
          >
            <AlertDialogContent>
              <AlertDialogTitle>Delete Task</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this task? This action cannot be
                undone.
              </AlertDialogDescription>
              <div className="flex gap-2">
                <AlertDialogAction
                  onClick={deleteTask}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Delete
                </AlertDialogAction>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </>
  );
}
