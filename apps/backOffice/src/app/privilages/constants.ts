import type { IuiSchema } from "~/app/_components/FormView/FormView.types";
import { InputTypes } from "~/app/_components/FormView/FormView.types";

export const uiSchema = {
  name: {
    classes: "w-1/4 inline-block m-2",
    type: InputTypes.text,
    label: "Name",
  },
  id: {
    classes: "w-1/4 inline-block m-2",
    type: InputTypes.text,
  },
  email: {
    classes: "w-1/2 inline-block m-2",
    type: InputTypes.text,
  },
} as IuiSchema;

export const title = "privilages";
