import { useEffect, useState } from "react";
import { Table } from "@/components/ui/table";
import { TableHeader } from "@/components/TaskTable/TableHeader";
import { TableBody } from "@/components/TaskTable/TableBody";
import { Pagination } from "@/components/TaskTable/TablePagination";
import { Task } from "@/models/Task";
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

interface TaskTableProps {
  tasks: Task[];
}

export function TaskTable({ tasks }: TaskTableProps): JSX.Element {
  const [sortKey, setSortKey] = useState<keyof Task | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(10);

  const [tasksState, setTasks] = useState<Task[]>(tasks);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  useEffect(() => {
    setTasks(tasks);
  }, [tasks]);

  const sortedTasks = [...tasksState].sort((a, b) => {
    if (sortKey) {
      if (a[sortKey] < b[sortKey]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    }
    return 0;
  });

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);

  const handleSort = (key: keyof Task) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const handleTasksPerPageChange = (value: number) => {
    setTasksPerPage(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(tasksState.length / tasksPerPage);

  const openTaskDetailModal = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsDetailModalOpen(true);
  };

  const openTaskEditModal = (taskId: string) => {
    const task = tasksState.find((task) => task.id === taskId);
    if (task) {
      setTaskToEdit(task);
      setIsEditModalOpen(true);
    }
  };

  const openDeleteDialog = (taskId: string) => {
    setTaskToDelete(taskId);
    setIsDeleteDialogOpen(true);
  };

  const deleteTask = () => {
    if (taskToDelete) {
      const updatedTasks = tasksState.filter(
        (task) => task.id !== taskToDelete,
      );
      setTasks(updatedTasks);
      saveTasksToLocalStorage(updatedTasks);
      setIsDeleteDialogOpen(false);
      setTaskToDelete(null);
    }
  };

  const updateTask = (updatedTask: Task) => {
    const updatedTasks = tasksState.map((task) =>
      task.id === updatedTask.id ? updatedTask : task,
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    setTaskToEdit(null);
    setIsEditModalOpen(false);
  };

  return (
    <div className="rounded-lg shadow-sm overflow-hidden">
      <Table className="w-full border border-gray-200 dark:border-gray-700">
        <TableHeader
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
        <TableBody
          tasks={currentTasks}
          selectedTaskId={selectedTaskId}
          setSelectedTaskId={setSelectedTaskId}
          setTasks={setTasks}
          openTaskDetailModal={openTaskDetailModal}
          openTaskEditModal={openTaskEditModal}
          openDeleteDialog={openDeleteDialog}
        />
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        tasksPerPage={tasksPerPage}
        onPageChange={handlePageChange}
        onTasksPerPageChange={handleTasksPerPageChange}
      />
      {isDetailModalOpen && selectedTaskId && (
        <DetailTaskModal
          taskId={selectedTaskId}
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
        />
      )}
      {isEditModalOpen && taskToEdit && (
        <UpdateTaskModal
          taskToUpdate={taskToEdit}
          onUpdateTask={updateTask}
          onClose={() => {
            setTaskToEdit(null);
            setIsEditModalOpen(false);
          }}
        />
      )}
      {isDeleteDialogOpen && (
        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this task? This action cannot be
              undone.
            </AlertDialogDescription>
            <div className="flex gap-4 mt-4">
              <AlertDialogAction
                onClick={deleteTask}
                className="bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </AlertDialogAction>
              <AlertDialogCancel
                onClick={() => setIsDeleteDialogOpen(false)}
                className="bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                Cancel
              </AlertDialogCancel>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
