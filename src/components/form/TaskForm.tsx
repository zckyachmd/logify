import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TaskPriority, TaskStatus, TaskFormProps, Task } from "@/models/Task";

export function TaskForm({
  defaultValues,
  isCreate = false,
  isUpdate = false,
  onChangeTask,
  onChangeTitle,
  onChangeDetail,
  onChangePriority,
  onChangeDeadline,
  onChangeStatus,
}: TaskFormProps) {
  const isReadOnly = !isCreate && !isUpdate;
  const isDisabled = !isCreate && isUpdate;

  const { control, register, setValue } = useForm<Task>({
    defaultValues,
  });

  useEffect(() => {
    setValue("task", defaultValues.task);
    setValue("title", defaultValues.title);
    setValue("detail", defaultValues.detail);
    setValue("priority", defaultValues.priority);
    setValue("deadline", defaultValues.deadline);
    setValue("status", defaultValues.status);
  }, [defaultValues, setValue]);

  const handleGenerateTaskId = () => {
    const newTaskId = `TS-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setValue("task", newTaskId);
    onChangeTask?.(newTaskId);
  };

  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Task ID
        </label>
        <Input
          type="text"
          {...register("task")}
          disabled={isDisabled || isReadOnly}
          readOnly={isReadOnly}
          className="mt-1 w-full"
          onChange={(e) => onChangeTask?.(e.target.value)}
        />
        {isCreate && (
          <div className="mt-2">
            <Button
              type="button"
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
          {...register("title")}
          disabled={isReadOnly}
          readOnly={isReadOnly}
          className="mt-1 w-full"
          onChange={(e) => onChangeTitle?.(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Detail
        </label>
        <Textarea
          {...register("detail")}
          disabled={isReadOnly}
          readOnly={isReadOnly}
          className="mt-1 w-full"
          onChange={(e) => onChangeDetail?.(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Priority
        </label>
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                onChangePriority?.(value as TaskPriority);
              }}
              disabled={isReadOnly}
            >
              <SelectTrigger className="mt-1 w-full">
                <span>{field.value}</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Deadline
        </label>
        <Input
          type="date"
          {...register("deadline")}
          disabled={isReadOnly}
          readOnly={isReadOnly}
          className="mt-1 w-full"
          onChange={(e) => onChangeDeadline?.(e.target.value)}
        />
      </div>
      {!isCreate && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Status
          </label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  onChangeStatus?.(value as TaskStatus);
                }}
                disabled={isReadOnly}
              >
                <SelectTrigger className="mt-1 w-full">
                  <span>{field.value}</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      )}
    </form>
  );
}
