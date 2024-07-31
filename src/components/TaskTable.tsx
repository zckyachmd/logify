import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Task = {
  id: number;
  task: string;
  title: string;
  status: string;
  priority: string;
};

type TaskTableProps = {
  tasks: Task[];
};

export function TaskTable({ tasks }: TaskTableProps) {
  const [sortKey, setSortKey] = useState<keyof Task | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(10);

  const sortedTasks = [...tasks].sort((a, b) => {
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
  const startItem = (currentPage - 1) * tasksPerPage + 1;
  const endItem = Math.min(currentPage * tasksPerPage, tasks.length);

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
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  return (
    <div className="rounded-lg shadow-sm overflow-hidden">
      <Table className="w-full border border-gray-200 dark:border-gray-700">
        <TableHeader>
          <TableRow className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
            <TableCell
              onClick={() => handleSort("task")}
              className="px-6 py-3 text-left font-medium cursor-pointer text-gray-700 dark:text-gray-300"
            >
              Task{" "}
              {sortKey === "task" ? (
                sortDirection === "asc" ? (
                  <ChevronUp className="inline h-4 w-4" />
                ) : (
                  <ChevronDown className="inline h-4 w-4" />
                )
              ) : (
                <ChevronUp className="inline h-4 w-4 opacity-0" />
              )}
            </TableCell>
            <TableCell
              onClick={() => handleSort("title")}
              className="px-6 py-3 text-left font-medium cursor-pointer text-gray-700 dark:text-gray-300"
            >
              Title{" "}
              {sortKey === "title" ? (
                sortDirection === "asc" ? (
                  <ChevronUp className="inline h-4 w-4" />
                ) : (
                  <ChevronDown className="inline h-4 w-4" />
                )
              ) : (
                <ChevronUp className="inline h-4 w-4 opacity-0" />
              )}
            </TableCell>
            <TableCell
              onClick={() => handleSort("status")}
              className="px-6 py-3 text-left font-medium cursor-pointer text-gray-700 dark:text-gray-300"
            >
              Status{" "}
              {sortKey === "status" ? (
                sortDirection === "asc" ? (
                  <ChevronUp className="inline h-4 w-4" />
                ) : (
                  <ChevronDown className="inline h-4 w-4" />
                )
              ) : (
                <ChevronUp className="inline h-4 w-4 opacity-0" />
              )}
            </TableCell>
            <TableCell
              onClick={() => handleSort("priority")}
              className="px-6 py-3 text-left font-medium cursor-pointer text-gray-700 dark:text-gray-300"
            >
              Priority{" "}
              {sortKey === "priority" ? (
                sortDirection === "asc" ? (
                  <ChevronUp className="inline h-4 w-4" />
                ) : (
                  <ChevronDown className="inline h-4 w-4" />
                )
              ) : (
                <ChevronUp className="inline h-4 w-4 opacity-0" />
              )}
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentTasks.map((task) => (
            <TableRow
              key={task.id}
              className="border-b border-gray-200 dark:border-gray-700"
            >
              <TableCell className="px-4 py-2 text-gray-700 dark:text-gray-300">
                {task.task}
              </TableCell>
              <TableCell className="px-4 py-2 text-gray-700 dark:text-gray-300">
                {task.title}
              </TableCell>
              <TableCell className="px-4 py-2 text-gray-700 dark:text-gray-300">
                {task.status}
              </TableCell>
              <TableCell className="px-4 py-2 text-gray-700 dark:text-gray-300">
                {task.priority}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-1">
          <span className="text-gray-600 dark:text-gray-400 text-sm">
            Showing {startItem}-{endItem} of {tasks.length} items
          </span>
        </div>

        <div className="flex flex-1 items-center justify-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center space-x-2 text-sm"
              >
                Rows per page: {tasksPerPage}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {[5, 10, 20].map((size) => (
                <DropdownMenuItem
                  key={size}
                  onClick={() => handleTasksPerPageChange(size)}
                  className="capitalize text-sm"
                >
                  {size}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center space-x-1">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
            className="p-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg text-xs"
          >
            <ChevronRight className="h-4 w-4 rotate-180 mr-[-0.25rem]" />
            <ChevronRight className="h-4 w-4 rotate-180" />
          </Button>
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="p-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg text-xs"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="p-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg text-xs"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
            className="p-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg text-xs"
          >
            <ChevronRight className="h-4 w-4" />
            <ChevronRight className="h-4 w-4 ml-[-0.25rem]" />
          </Button>
        </div>
      </div>
    </div>
  );
}
