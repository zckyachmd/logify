import {
  TableBody as TableBodyComponent,
  TableCell,
  TableRow,
} from "@/components/ui/table";

type TableBodyProps = {
  tasks: Task[];
};

export function TableBody({ tasks }: TableBodyProps) {
  return (
    <TableBodyComponent>
      {tasks.map((task) => (
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
    </TableBodyComponent>
  );
}
