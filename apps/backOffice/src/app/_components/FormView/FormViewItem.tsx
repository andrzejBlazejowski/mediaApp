import { UseFormRegister } from "react-hook-form";

import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import type { IFeield } from "./FormView.types";
import { InputTypes } from "./FormView.types";

interface formItemProps {
  field: IFeield;
  classes: string;
  type?: InputTypes;
  register: UseFormRegister<any>;
}

export const FormViewItem = ({
  field,
  classes,
  type,
  register,
}: formItemProps) => (
  <FormItem className={classes}>
    <FormLabel>{field.name}</FormLabel>
    <FormControl>
      <Input
        {...field}
        type={getHtmlInputType(type)}
        {...register(field.name, { valueAsNumber: true })}
      />
    </FormControl>
    <FormMessage />
  </FormItem>
);

function getHtmlInputType(type: InputTypes = InputTypes.text) {
  switch (type) {
    case InputTypes.foreignKey:
      return "number";
    case InputTypes.date:
      return "date";
    case InputTypes.colorPicker:
      return "color";
    case InputTypes.checkbox:
      return "checkbox";
    default:
      return "text";
  }
}
