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
import { Task, AddTaskModalProps } from "@/models/Task";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export function AddTaskModal({ onAddTask }: AddTaskModalProps) {
  const [open, setOpen] = useState(false);
  const [taskData, setTaskData] = useState<Task>({
    task: "",
    title: "",
    detail: "",
    priority: "Medium",
    deadline: "",
    status: "Pending",
    id: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!open) {
      setTaskData({
        task: "",
        title: "",
        detail: "",
        priority: "Medium",
        deadline: "",
        status: "Pending",
        id: "",
      });
    }
  }, [open]);

  const handleSubmit = () => {
    const { task, title, detail, priority, deadline } = taskData;
    if (task && title && detail && priority && deadline) {
      const newTask: Task = { ...taskData, id: crypto.randomUUID() };

      onAddTask(newTask);
      setOpen(false);
    } else {
      setShowAlert(true);
    }
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center space-x-2 bg-blue-500 text-white hover:bg-blue-600 transition-all rounded-lg py-1 px-4">
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
            defaultValues={taskData}
            onGenerateTaskId={() =>
              setTaskData({ ...taskData, id: crypto.randomUUID() })
            }
            isCreate={true}
            isUpdate={false}
            onChangeTask={(value) =>
              setTaskData((prev) => ({ ...prev, task: value }))
            }
            onChangeTitle={(value) =>
              setTaskData((prev) => ({ ...prev, title: value }))
            }
            onChangeDetail={(value) =>
              setTaskData((prev) => ({ ...prev, detail: value }))
            }
            onChangePriority={(value) =>
              setTaskData((prev) => ({ ...prev, priority: value }))
            }
            onChangeDeadline={(value) =>
              setTaskData((prev) => ({ ...prev, deadline: value }))
            }
            onChangeStatus={() => {}}
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
        </DialogContent>
      </Dialog>
    </>
  );
}
