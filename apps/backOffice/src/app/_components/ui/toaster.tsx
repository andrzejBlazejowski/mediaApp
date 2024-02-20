import * as Toast from "@radix-ui/react-toast";
import { useToast } from "src/app/_components/ui/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <Toast.Provider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast.Root
            key={id}
            {...props}
            className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full bg-background text-foreground group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none"
          >
            {title && <Toast.Title>{title}</Toast.Title>}
            {description && (
              <Toast.Description>{description}</Toast.Description>
            )}
            {action}
            <Toast.Close />
          </Toast.Root>
        );
      })}
      <Toast.Viewport className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]" />
    </Toast.Provider>
  );
}
