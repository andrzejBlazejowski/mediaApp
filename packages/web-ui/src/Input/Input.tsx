interface InputProps {
  fullWidth?: boolean;
  id: string;
  name: string;
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<any>) => void;
  onBlur?: (e: React.FocusEvent<any>) => void;
  error?: boolean;
  helperText: string;
  variant?: "primary" | "secondary" | "ternitary";
}

export const Input: React.FC<InputProps> = ({
  fullWidth = true,
  id,
  name,
  label,
  value = "",
  onChange,
  onBlur,
  error,
  helperText = "invalid value",
  variant = "primary",
}) => {
  let InputClasses = `rounded-md block p-2 `;
  let ErrorClasses = `p-0 m-0 ml-2 `;
  let LabelClasses = `p-0 m-0 ml-2  `;
  let WrappweClasses = `p-0 m-0 `;
  const usedClasses = [
    "text-text-primary-500 text-text-primary-800 text-text-secondary-500 text-text-secondary-800 text-text-ternitary-500 text-text-ternitary-800",
    "ring-primary-200 focus:ring-primary-400 ring-secondary-200 focus:ring-secondary-400 ring-ternitary-200 focus:ring-ternitary-400 ",
  ];

  // backgrounds
  switch (variant) {
    case "primary":
      InputClasses += `bg-primary-50 focus:bg-primary-100 `;
      break;

    case "secondary":
      InputClasses += `bg-secondary-50 focus:bg-secondary-100 `;
      break;

    case "ternitary":
      InputClasses += `bg-ternitary-50 focus:bg-ternitary-100 `;
      break;

    default:
      InputClasses += `bg-primary-50 focus:bg-primary-100 `;
      break;
  }

  // borders
  InputClasses += `border border-gray-300 ring-1 ring-${variant}-200 focus:ring-${variant}-400  focus:outline-none `;

  // text
  InputClasses += `text-sm text-text-${variant}-500 focus:text-text-${variant}-800 `;
  ErrorClasses += "text-danger-primary-300 text-xs ";
  LabelClasses += ` text-text-${variant}-500 text-sm leading-tight `;

  if (error) {
    ErrorClasses += "visible ";
    InputClasses += "ring-danger-primary-400 focus:ring-danger-primary-500 ";
  } else {
    ErrorClasses += "invisible ";
  }

  if (fullWidth) {
    InputClasses += "w-full";
  } else {
    InputClasses += "w-1/2";
  }

  return (
    <div className={WrappweClasses} key={id}>
      {label && (
        <label className={LabelClasses} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type="text"
        placeholder="firstName"
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className={InputClasses}
      />
      <p className={ErrorClasses}> {helperText}</p>
    </div>
  );
};
