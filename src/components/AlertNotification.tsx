import { Bell } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export function AlertNotification({ message }: { message: string }) {
  return (
    <Alert>
      <Bell className="h-4 w-4" />
      <AlertTitle>Notification</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
