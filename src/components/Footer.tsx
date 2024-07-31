import { ModeToggle } from "@/components/ModeToggle";

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-2 text-center flex items-center justify-between px-4">
      <p className="text-sm">© 2024 Zacky Achmad. All rights reserved.</p>
      <ModeToggle />
    </footer>
  );
}
