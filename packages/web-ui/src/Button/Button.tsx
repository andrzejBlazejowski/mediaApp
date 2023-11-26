interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
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
      buttonClasses += " bg-blue-800 text-blue-700 hover:bg-blue-600";
      break;
    case "secondary":
      buttonClasses +=
        " bg-secondary-800 text-textSecondary-700 hover:bg-secondary-600";
      break;
    default:
      buttonClasses +=
        " bg-ternitary-800 text-textTernitary-700 hover:bg-ternitary-600";
      break;
  }

  return (
    <button className={buttonClasses} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
