import { ComponentVariants } from "../types";

export interface InputProps {
  fullWidth?: boolean;
  id: string;
  name: string;
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<any>) => void;
  onBlur?: (e: React.FocusEvent<any>) => void;
  error?: boolean;
  helperText: string;
  variant?: ComponentVariants;
}
