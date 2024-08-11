import {
  TableCell,
  TableRow,
  TableHeader as TableHeaderComponent,
} from "@/components/ui/table";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Task, TableHeaderProps } from "@/models/Task";

export function TableHeader({
  sortKey,
  sortDirection,
  onSort,
}: TableHeaderProps) {
  const renderSortIcon = (key: keyof Task) => {
    if (sortKey === key) {
      return sortDirection === "asc" ? (
        <ChevronUp className="inline h-4 w-4" />
      ) : (
        <ChevronDown className="inline h-4 w-4" />
      );
    }
    return <ChevronUp className="inline h-4 w-4 opacity-0" />;
  };

  return (
    <TableHeaderComponent>
      <TableRow className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
        {["task", "title", "priority", "status"].map((column) => (
          <TableCell
            key={column}
            onClick={() => onSort(column as keyof Task)}
            className="px-6 py-3 text-left font-bold cursor-pointer text-gray-700 dark:text-gray-300 border-b-2 border-gray-200 dark:border-gray-600"
          >
            {column.charAt(0).toUpperCase() + column.slice(1)}{" "}
            {renderSortIcon(column as keyof Task)}
          </TableCell>
        ))}
        <TableCell className="px-6 py-3 text-left font-bold text-gray-700 dark:text-gray-300 border-b-2 border-gray-200 dark:border-gray-600">
          Actions
        </TableCell>
      </TableRow>
    </TableHeaderComponent>
  );
}
