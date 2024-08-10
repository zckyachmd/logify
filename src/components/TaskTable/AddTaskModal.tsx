import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { TaskPriority, AddTaskModalProps } from "@/models/Task";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

const generateRandomTaskId = () =>
  `TS-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

const taskPriorities: TaskPriority[] = ["High", "Medium", "Low"];

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
      onAddTask({
        task,
        title,
        detail,
        status: "Pending",
        priority,
        deadline,
      });
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
          <Button className="flex items-center space-x-2 bg-blue-500 text-white hover:bg-blue-600 transition-all rounded-lg py-2 px-4 mb-4">
            <Plus className="w-4 h-4" />
            <span className="font-semibold">Add Task</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="space-y-4">
            <div>
              <Label htmlFor="task" className="font-medium">
                Task ID
              </Label>
              <div className="flex">
                <Input
                  id="task"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  placeholder="Enter task ID"
                  className="border-gray-300 dark:border-gray-700 focus:border-blue-500 flex-1"
                />
                <Button
                  onClick={() => setTask(generateRandomTaskId())}
                  className="ml-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg text-xs"
                >
                  Generate ID
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="title" className="font-medium">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                className="border-gray-300 dark:border-gray-700 focus:border-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="detail" className="font-medium">
                Detail
              </Label>
              <Textarea
                id="detail"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                placeholder="Enter task details"
                className="border-gray-300 dark:border-gray-700 focus:border-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="deadline" className="font-medium">
                Deadline
              </Label>
              <Input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="border-gray-300 dark:border-gray-700 focus:border-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="priority" className="font-medium">
                Priority
              </Label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className={cn(
                  "flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-background dark:bg-gray-700 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300",
                )}
              >
                {taskPriorities.map((priorityOption) => (
                  <option key={priorityOption} value={priorityOption}>
                    {priorityOption}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-2">
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
                className="flex items-center space-x-1 bg-blue-500 text-white hover:bg-blue-600 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Task</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Alert Dialog */}
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <div className="flex flex-col">
            <p className="text-lg font-semibold mb-4">
              Please fill in all required fields to add a task.
            </p>
            <div className="flex justify-end space-x-2">
              <AlertDialogAction
                onClick={() => setShowAlert(false)}
                className="flex items-center space-x-1 bg-red-500 text-white hover:bg-red-600 transition-all"
              >
                <X className="w-4 h-4" />
                <span>Dismiss</span>
              </AlertDialogAction>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
