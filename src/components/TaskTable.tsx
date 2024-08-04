import { useState } from "react";
import { Table } from "@/components/ui/table";
import { TableHeader } from "@/components/TaskTable/TableHeader";
import { TableBody } from "@/components/TaskTable/TableBody";
import { Pagination } from "@/components/TaskTable/TablePagination";
import { Task, TaskTableProps } from "@/models/Task";

export function TaskTable({ tasks }: TaskTableProps): JSX.Element {
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  return (
    <div className="rounded-lg shadow-sm overflow-hidden">
      <Table className="w-full border border-gray-200 dark:border-gray-700">
        <TableHeader
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
        <TableBody tasks={currentTasks} />
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        tasksPerPage={tasksPerPage}
        onPageChange={handlePageChange}
        onTasksPerPageChange={handleTasksPerPageChange}
      />
    </div>
  );
}
