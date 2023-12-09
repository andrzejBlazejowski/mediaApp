import { FieldProps, useFormik } from "formik";
import * as Yup from "yup";

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
}) => {
  let InputClasses = `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-200 focus:border-primary-200 block p-2.5 `;
  let ErrorClasses = `py-2 px-4 focus:outline-none `;
  let LabelClasses = `py-2 px-4 focus:outline-none `;
  let LabelWrapperClasses = `py-2 px-4 focus:outline-none `;
  let WrappweClasses = `py-2 px-4 focus:outline-none `;

  if (fullWidth) {
    InputClasses += "w-full";
  } else {
    InputClasses += "w-1/2";
  }

  return (
    <div className={WrappweClasses} key={id}>
      <label className={LabelWrapperClasses} htmlFor={id}>
        {label && <p className={LabelClasses}> {label}</p>}
        {error && <p className={ErrorClasses}> {helperText}</p>}
      </label>
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
    </div>
  );
};
