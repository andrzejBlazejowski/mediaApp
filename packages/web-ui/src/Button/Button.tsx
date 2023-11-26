interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | undefined;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
}) => {
  let buttonClasses = "py-2 px-4 rounded-md focus:outline-none";

  switch (variant) {
    case "primary":
      buttonClasses += " bg-slate-800 text-white hover:bg-primary";
      break;
    case "secondary":
      buttonClasses += "bg-secondary text-gray-700 hover:bg-secondary";
      break;
    default:
      buttonClasses += " bg-blue-500 text-white hover:bg-blue-600";
      break;
  }

  return (
    <button className={buttonClasses} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
