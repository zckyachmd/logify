import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  tasksPerPage: number;
  onPageChange: (page: number) => void;
  onTasksPerPageChange: (size: number) => void;
};

export function Pagination({
  currentPage,
  totalPages,
  tasksPerPage,
  onPageChange,
  onTasksPerPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-1">
        <span className="text-gray-600 dark:text-gray-400 text-sm">
          Showing {currentPage} of {totalPages} pages
        </span>
      </div>

      <div className="flex flex-1 items-center justify-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center space-x-2 text-sm bg-transparent text-gray-800 dark:text-gray-200 border border-transparent hover:bg-transparent">
              Rows per page: {tasksPerPage}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {[5, 10, 20].map((size) => (
              <DropdownMenuItem
                key={size}
                onClick={() => onTasksPerPageChange(size)}
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
          onClick={() => onPageChange(1)}
          className="p-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg text-xs flex items-center justify-center"
        >
          <ChevronRight className="h-3 w-3 rotate-180" />
          <ChevronRight className="h-3 w-3 rotate-180 ml-[-0.25rem]" />
        </Button>
        <Button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="p-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg text-xs flex items-center justify-center"
        >
          <ChevronLeft className="h-3 w-3" />
        </Button>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="p-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg text-xs flex items-center justify-center"
        >
          <ChevronRight className="h-3 w-3" />
        </Button>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
          className="p-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg text-xs flex items-center justify-center"
        >
          <ChevronRight className="h-3 w-3" />
          <ChevronRight className="h-3 w-3 ml-[-0.25rem]" />
        </Button>
      </div>
    </div>
  );
}
