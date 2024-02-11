import { TextArea } from "@radix-ui/themes";
import { UseFormRegister } from "react-hook-form";

import type { IFeield } from "../FormView/FormView.types";
import { InputTypes } from "../FormView/FormView.types";
import SelectForeignKey from "../FormView/SelectForeignKey/SelectForeignKey";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface formItemProps {
  field: IFeield;
  classes: string;
  type?: InputTypes;
  register?: UseFormRegister<any>;
  isLabelVisible?: boolean;
}

export const FormViewItem = ({
  field,
  classes,
  type,
  register,
  isLabelVisible = true,
}: formItemProps) => (
  <FormItem className={classes}>
    {isLabelVisible && <FormLabel>{field.name}</FormLabel>}
    {type === InputTypes.foreignKey ? (
      <SelectForeignKey
        foreignKey={field.name}
        defaultValue={field.value}
        onValueChange={field.onChange}
      />
    ) : (
      <FormControl>
        {type === InputTypes.textArea ? (
          <TextArea className="block w-full" {...field} />
        ) : (
          <Input
            {...field}
            type={getHtmlInputType(type)}
            {...(type === InputTypes.checkbox &&
              field.value && { checked: true })}
            {...(getHtmlInputType(type) === "number" && register
              ? register(field.name, { valueAsNumber: true })
              : {})}
          />
        )}
      </FormControl>
    )}
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
    case InputTypes.number:
      return "number";
    case InputTypes.text:
    default:
      return "text";
  }
}
