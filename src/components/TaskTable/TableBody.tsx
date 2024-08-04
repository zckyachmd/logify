import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { TableBodyProps } from "@/models/Task";

export function TableBody({ tasks }: TableBodyProps) {
  const handleView = (id: number) => {
    // Handle view functionality
    console.log(`View task with id: ${id}`);
  };

  const handleEdit = (id: number) => {
    // Handle edit functionality
    console.log(`Edit task with id: ${id}`);
  };

  const handleDelete = (id: number) => {
    // Handle delete functionality
    console.log(`Delete task with id: ${id}`);
  };

  return (
    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
      {tasks.map((task) => (
        <tr key={task.id}>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 w-1/4">
            {task.task}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 w-1/4">
            {task.title}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 w-1/4">
            {task.status}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 w-1/4">
            {task.priority}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium w-1/12">
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
                <DropdownMenuItem onClick={() => handleView(task.id)}>
                  View
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleEdit(task.id)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDelete(task.id)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
