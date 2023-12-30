import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { IFeield } from "./FormView.types";

type formItemProps = {
  field: IFeield;
  classes: string;
  setValue: (value: string) => void;
};

export const FormViewItem = ({ field, classes, setValue }: formItemProps) => (
  <FormItem className={classes}>
    <FormLabel>{field.name}</FormLabel>
    <FormControl>
      <Input {...field} onChange={(e) => setValue(e.target.value)} />
    </FormControl>
    <FormMessage />
  </FormItem>
);
