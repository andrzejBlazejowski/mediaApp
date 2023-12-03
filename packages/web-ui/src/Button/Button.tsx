import { useMemo } from "react";
import {
  AcademicCapIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ternitary";
  type?: "normal" | "danger" | "info" | "warning";
  layout?: "plain-text" | "icon-text" | "icon" | "icon-rounded";
  icon?: "add" | "edit" | "delete" | "search" | "filter";
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant,
  layout = "plain-text",
  type = "normal",
  icon,
  disabled = false,
}) => {
  const isIconVisible = useMemo(() => layout?.indexOf("icon") !== -1, [layout]);
  const isTextVisible = useMemo(() => layout?.indexOf("text") !== -1, [layout]);

  let Icon = AcademicCapIcon;
  let buttonClasses = `py-2 px-4 focus:outline-none ${
    isIconVisible ? " flex items-center justify-center" : ""
  } ${layout === "icon-rounded" ? "rounded-full" : "rounded-md"}`;
  let iconClasses = `h-5 w-5 ${isTextVisible ? "ml-2" : ""}`;

  switch (icon) {
    case "add":
      Icon = PlusIcon;
      break;
    case "delete":
      Icon = TrashIcon;
      break;
    case "edit":
      Icon = PencilIcon;
      break;
    case "search":
      Icon = MagnifyingGlassIcon;
      break;
    case "filter":
      Icon = FunnelIcon;
      break;
    default:
      Icon = AcademicCapIcon;
      break;
  }

  switch (type) {
    case "danger":
      switch (variant) {
        case "primary":
          iconClasses += " text-primary-300";
          buttonClasses +=
            " bg-danger-primary-600 text-primary-300 hover:bg-danger-primary-500";
          break;

        case "secondary":
          iconClasses += " text-secondary-300";
          buttonClasses +=
            " bg-danger-secondary-600 text-secondary-300 hover:bg-danger-secondary-500";
          break;

        case "ternitary":
          iconClasses += " text-ternitary-300";
          buttonClasses +=
            " bg-danger-ternitary-600 text-ternitary-300 hover:bg-danger-ternitary-500";
          break;

        default:
          iconClasses += " text-red-300";
          buttonClasses += " bg-red-600 text-white hover:bg-red-500";
          break;
      }
      break;
    case "info":
      switch (variant) {
        case "primary":
          iconClasses += " text-primary-300";
          buttonClasses +=
            " bg-info-primary-600 text-primary-300 hover:bg-info-primary-500";
          break;

        case "secondary":
          iconClasses += " text-secondary-300";
          buttonClasses +=
            " bg-info-secondary-600 text-secondary-300 hover:bg-info-secondary-500";
          break;

        case "ternitary":
          iconClasses += " text-ternitary-300";
          buttonClasses +=
            " bg-info-ternitary-600 text-ternitary-300 hover:bg-info-ternitary-500";
          break;

        default:
          iconClasses += " text-cyan-300";
          buttonClasses += " bg-cyan-600 text-white hover:bg-cyan-500";
          break;
      }
      break;
    case "warning":
      switch (variant) {
        case "primary":
          iconClasses += " text-primary-300";
          buttonClasses +=
            " bg-warning-primary-600 text-primary-300 hover:bg-warning-primary-500";
          break;

        case "secondary":
          iconClasses += " text-secondary-300";
          buttonClasses +=
            " bg-warning-secondary-600 text-secondary-300 hover:bg-warning-secondary-500";
          break;

        case "ternitary":
          iconClasses += " text-ternitary-300";
          buttonClasses +=
            " bg-warning-ternitary-600 text-ternitary-300 hover:bg-warning-ternitary-500";
          break;

        default:
          iconClasses += " text-yellow-300";
          buttonClasses += " bg-yellow-600 text-white hover:bg-yellow-500";
          break;
      }
      break;
    case "normal":
    default:
      switch (variant) {
        case "primary":
          iconClasses += " text-primary-300";
          buttonClasses +=
            " bg-primary-600 text-primary-300 hover:bg-primary-500";
          break;
        case "secondary":
          iconClasses += " text-secondary-300";
          buttonClasses +=
            " bg-secondary-600 text-secondary-300 hover:bg-secondary-500";
          break;
        case "ternitary":
          iconClasses += " text-ternitary-300";
          buttonClasses +=
            " bg-ternitary-600 text-ternitary-300 hover:bg-ternitary-500";
          break;
        default:
          iconClasses += " text-blue-300";
          buttonClasses += " bg-blue-600 text-white hover:bg-blue-500";
          break;
      }
      break;
  }

  return (
    <button className={buttonClasses} onClick={onClick} disabled={disabled}>
      {isTextVisible && children}
      {isIconVisible && <Icon className={iconClasses} />}
    </button>
  );
};
