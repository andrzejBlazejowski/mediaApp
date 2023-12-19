import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { IFeield } from "./FormView.types";

export const FormViewItem = (field: IFeield, classes: string) => (
  <FormItem className={classes}>
    <FormLabel>{field.name}</FormLabel>
    <FormControl>
      <Input {...field} />
    </FormControl>
    <FormMessage />
  </FormItem>
);
