import { InputProps } from ".";
import { cn } from "../utils";

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
    "bg-primary-50 focus:bg-primary-100 bg-secondary-50 focus:bg-secondary-100 bg-ternitary-50 focus:bg-ternitary-100",
    "text-danger-primary-300 text-xs text-danger-secondary-300 text-xs text-danger-ternitary-300 text-xs ",
    "ring-danger-primary-400 focus:ring-danger-primary-500 ring-danger-secondary-400 focus:ring-danger-secondary-500 ring-danger-ternitary-400 focus:ring-danger-ternitary-500 ",
  ];

  // backgrounds
  InputClasses = cn(InputClasses, `bg-${variant}-50 focus:bg-${variant}-100 `);

  // borders
  InputClasses = cn(
    InputClasses,
    `border border-gray-300 ring-1 ring-${variant}-200 focus:ring-${variant}-400  focus:outline-none `,
  );

  // text
  InputClasses = cn(
    InputClasses,
    `text-sm text-text-${variant}-500 focus:text-text-${variant}-800 `,
  );
  ErrorClasses = cn(ErrorClasses, `text-danger-${variant}-300 text-xs `);
  LabelClasses = cn(
    LabelClasses,
    ` text-text-${variant}-500 text-sm leading-tight `,
  );

  if (error) {
    ErrorClasses = cn(ErrorClasses, "visible ");
    InputClasses = cn(
      InputClasses,
      `ring-danger-${variant}-400 focus:ring-danger-${variant}-500 `,
    );
  } else {
    ErrorClasses = cn(ErrorClasses, "invisible ");
  }

  if (fullWidth) {
    InputClasses = cn(InputClasses, "w-full");
  } else {
    InputClasses = cn(InputClasses, "w-1/2");
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
