import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { TaskForm } from "@/components/form/TaskForm";
import { X, Plus } from "lucide-react";
import { Task, TaskPriority, AddTaskModalProps } from "@/models/Task";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export function AddTaskModal({ onAddTask }: AddTaskModalProps) {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState("");
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("Medium");
  const [deadline, setDeadline] = useState<string>("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!open) {
      setTask("");
      setTitle("");
      setDetail("");
      setPriority("Medium");
      setDeadline("");
    }
  }, [open]);

  const handleSubmit = () => {
    if (task && title && detail && priority && deadline) {
      const newTask: Task = {
        task,
        title,
        detail,
        status: "Pending",
        priority,
        deadline,
        id: crypto.randomUUID(),
      };

      onAddTask(newTask);
      setOpen(false);
    } else {
      setShowAlert(true);
    }
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleGenerateTaskId = () => {
    setTask(`TS-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center space-x-2 bg-blue-500 text-white hover:bg-blue-600 transition-all rounded-lg py-2 px-4 mb-4">
            <Plus className="w-4 h-4" />
            <span className="font-semibold">Add Task</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Fill out the details of the task and click "Add Task" to save it.
            </DialogDescription>
          </DialogHeader>
          <TaskForm
            task={task}
            title={title}
            detail={detail}
            priority={priority}
            deadline={deadline}
            onChangeTask={setTask}
            onChangeTitle={setTitle}
            onChangeDetail={setDetail}
            onChangePriority={setPriority}
            onChangeDeadline={setDeadline}
            onGenerateTaskId={handleGenerateTaskId}
            isCreate={true}
            isUpdate={false}
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleDialogClose}
              className="flex items-center space-x-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-blue-500 text-white hover:bg-blue-600 transition-all"
            >
              Add Task
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
