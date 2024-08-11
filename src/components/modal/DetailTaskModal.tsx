import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { getTasksFromLocalStorage } from "@/utils/localStorageUtils";
import {
  Task,
  TaskPriority,
  TaskStatus,
  TaskDetailModalProps,
} from "@/models/Task";
import { TaskForm } from "@/components/form/TaskForm";
import { X } from "lucide-react";

export function DetailTaskModal({
  taskId,
  isOpen,
  onClose,
}: TaskDetailModalProps) {
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (taskId) {
      const tasks = getTasksFromLocalStorage();
      const foundTask = tasks.find((t) => t.id === taskId) || null;
      setTask(foundTask);
    }
  }, [taskId]);

  const handleChange = useCallback(
    (field: keyof Task) => (value: string | TaskPriority | TaskStatus) => {
      setTask((prev) => (prev ? { ...prev, [field]: value } : null));
    },
    [],
  );

  if (!isOpen || !task) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
          <DialogDescription>
            Here are the details of the selected task.
          </DialogDescription>
        </DialogHeader>
        {task && (
          <TaskForm
            defaultValues={task}
            onGenerateTaskId={() => {}}
            isCreate={false}
            isUpdate={false}
            onChangeTask={handleChange("task")}
            onChangeTitle={handleChange("title")}
            onChangeDetail={handleChange("detail")}
            onChangePriority={handleChange("priority")}
            onChangeDeadline={handleChange("deadline")}
            onChangeStatus={handleChange("status")}
          />
        )}
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="flex items-center space-x-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            <X className="w-4 h-4" />
            <span>Close</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
