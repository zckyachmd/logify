import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TaskStatus, TaskPriority, TaskFormProps } from "@/models/Task";

export function TaskForm({
  task,
  title,
  detail,
  priority,
  deadline,
  status,
  onChangeTask,
  onChangeTitle,
  onChangeDetail,
  onChangePriority,
  onChangeDeadline,
  onChangeStatus,
  onGenerateTaskId,
  isCreate = false,
  isUpdate = false,
}: TaskFormProps) {
  const isReadOnly = !isCreate && !isUpdate;
  const isDisabled = !isCreate && isUpdate;

  const handlePriorityChange = (value: string) => {
    if (!isReadOnly && onChangePriority) {
      onChangePriority(value as TaskPriority);
    }
  };

  const handleStatusChange = (value: TaskStatus) => {
    if (!isReadOnly && onChangeStatus) {
      onChangeStatus(value);
    }
  };

  const handleGenerateTaskId = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (onGenerateTaskId && isCreate) {
      onGenerateTaskId();
    }
  };

  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Task ID
        </label>
        <Input
          type="text"
          value={task}
          onChange={(e) =>
            !isReadOnly && onChangeTask && onChangeTask(e.target.value)
          }
          disabled={isDisabled || isReadOnly}
          readOnly={isReadOnly}
          className="mt-1 w-full"
        />
        {isCreate && (
          <div className="mt-2">
            <Button
              onClick={handleGenerateTaskId}
              variant="outline"
              className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-gray-100"
            >
              Generate Task ID
            </Button>
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Title
        </label>
        <Input
          type="text"
          value={title}
          onChange={(e) =>
            !isReadOnly && onChangeTitle && onChangeTitle(e.target.value)
          }
          disabled={isReadOnly}
          readOnly={isReadOnly}
          className="mt-1 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Detail
        </label>
        <Textarea
          value={detail}
          onChange={(e) =>
            !isReadOnly && onChangeDetail && onChangeDetail(e.target.value)
          }
          disabled={isReadOnly}
          readOnly={isReadOnly}
          className="mt-1 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Priority
        </label>
        <Select
          value={priority}
          onValueChange={handlePriorityChange}
          disabled={isReadOnly}
        >
          <SelectTrigger className="mt-1 w-full">
            <span>{priority}</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Deadline
        </label>
        <Input
          type="date"
          value={deadline}
          onChange={(e) =>
            !isReadOnly && onChangeDeadline && onChangeDeadline(e.target.value)
          }
          disabled={isReadOnly}
          readOnly={isReadOnly}
          className="mt-1 w-full"
        />
      </div>
      {!isCreate && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Status
          </label>
          <Select
            value={status}
            onValueChange={handleStatusChange}
            disabled={isReadOnly}
          >
            <SelectTrigger className="mt-1 w-full">
              <span>{status}</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </form>
  );
}
