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
  const [task, setTask] = useState(taskToUpdate.task);
  const [title, setTitle] = useState(taskToUpdate.title);
  const [detail, setDetail] = useState(taskToUpdate.detail);
  const [priority, setPriority] = useState(taskToUpdate.priority);
  const [deadline, setDeadline] = useState(taskToUpdate.deadline);
  const [status, setStatus] = useState(taskToUpdate.status);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (taskToUpdate) {
      setTask(taskToUpdate.task);
      setTitle(taskToUpdate.title);
      setDetail(taskToUpdate.detail);
      setPriority(taskToUpdate.priority);
      setDeadline(taskToUpdate.deadline);
      setStatus(taskToUpdate.status); // Perbarui status
    }
  }, [taskToUpdate]);

  const handleSubmit = () => {
    if (task && title && detail && priority && deadline && status) {
      const updatedTask: Task = {
        ...taskToUpdate,
        task,
        title,
        detail,
        priority,
        deadline,
        status,
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
            task={task}
            title={title}
            detail={detail}
            priority={priority}
            deadline={deadline}
            status={status} // Pass status
            onChangeTask={setTask}
            onChangeTitle={setTitle}
            onChangeDetail={setDetail}
            onChangePriority={setPriority}
            onChangeDeadline={setDeadline}
            onChangeStatus={setStatus}
            isCreate={false}
            isUpdate={true}
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
            <p className="text-center">Please fill out all fields.</p>
            <div className="flex justify-end mt-4">
              <AlertDialogAction
                onClick={() => setShowAlert(false)}
                className="bg-blue-500 text-white hover:bg-blue-600 transition-all"
              >
                OK
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
