
import { toast as sonnerToast } from "sonner";

// Create a custom hook to provide toast functionality
export const useToast = () => {
  return {
    toast: (props: {
      title?: string;
      description?: string;
      variant?: "default" | "destructive";
    }) => {
      if (props.variant === "destructive") {
        sonnerToast.error(props.title, {
          description: props.description,
        });
      } else {
        sonnerToast(props.title, {
          description: props.description,
        });
      }
    },
    toasts: [], // For compatibility with existing code
  };
};

// Also export a standalone toast function
export const toast = (props: {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}) => {
  if (props.variant === "destructive") {
    sonnerToast.error(props.title, {
      description: props.description,
    });
  } else {
    sonnerToast(props.title, {
      description: props.description,
    });
  }
};
