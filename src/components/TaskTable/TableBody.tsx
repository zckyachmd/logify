import { TableBodyProps } from "@/models/Task";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export function TableBody({
  tasks,
  onEdit,
  onDetail,
  onDelete,
}: TableBodyProps) {
  return (
    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
      {tasks.length === 0 ? (
        <tr>
          <td
            colSpan={5}
            className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
          >
            No tasks available.
          </td>
        </tr>
      ) : (
        tasks.map((task) => (
          <tr key={task.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
              {task.task}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {task.title}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {task.priority}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {task.status}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => onDetail(task.id)}>
                    View
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEdit(task.id)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete(task.id)}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </td>
          </tr>
        ))
      )}
    </tbody>
  );
}
