import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { TaskForm } from "@/components/form/TaskForm";
import { X } from "lucide-react";
import { Task, UpdateTaskModalProps } from "@/models/Task";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export function UpdateTaskModal({
  taskToUpdate,
  onUpdateTask,
  onClose,
}: UpdateTaskModalProps) {
  const [formState, setFormState] = useState({
    id: taskToUpdate.id,
    task: taskToUpdate.task,
    title: taskToUpdate.title,
    detail: taskToUpdate.detail,
    priority: taskToUpdate.priority,
    deadline: taskToUpdate.deadline,
    status: taskToUpdate.status,
  });
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (taskToUpdate) {
      setFormState({
        id: taskToUpdate.id,
        task: taskToUpdate.task,
        title: taskToUpdate.title,
        detail: taskToUpdate.detail,
        priority: taskToUpdate.priority,
        deadline: taskToUpdate.deadline,
        status: taskToUpdate.status,
      });
    }
  }, [taskToUpdate]);

  const handleChange = (field: keyof typeof formState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const { task, title, detail, priority, deadline, status } = formState;
    if (task && title && detail && priority && deadline && status) {
      const updatedTask: Task = {
        ...taskToUpdate,
        ...formState,
      };

      onUpdateTask(updatedTask);
      onClose();
    } else {
      setShowAlert(true);
    }
  };

  return (
    <>
      <Dialog open={!!taskToUpdate} onOpenChange={onClose}>
        <DialogContent className="max-w-lg p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle>Update Task</DialogTitle>
            <DialogDescription>
              Update the details of the selected task.
            </DialogDescription>
          </DialogHeader>
          <TaskForm
            defaultValues={formState}
            isCreate={false}
            isUpdate={true}
            onChangeTask={(value) => handleChange("task", value)}
            onChangeTitle={(value) => handleChange("title", value)}
            onChangeDetail={(value) => handleChange("detail", value)}
            onChangePriority={(value) => handleChange("priority", value)}
            onChangeDeadline={(value) => handleChange("deadline", value)}
            onChangeStatus={(value) => handleChange("status", value)}
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={onClose}
              className="flex items-center space-x-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-blue-500 text-white hover:bg-blue-600 transition-all"
            >
              Update Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {showAlert && (
        <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
          <AlertDialogContent>
            <p>Please fill in all required fields.</p>
            <AlertDialogAction
              className="mt-2 bg-red-500 text-white hover:bg-red-600"
              onClick={() => setShowAlert(false)}
            >
              Close
            </AlertDialogAction>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
