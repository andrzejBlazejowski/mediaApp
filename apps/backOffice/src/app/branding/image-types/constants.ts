import type { IuiSchema } from "~/app/_components/FormView/FormView.types";
import { InputTypes } from "~/app/_components/FormView/FormView.types";

export const uiSchema = {
  name: {
    classes: "w-1/4 inline-block m-2",
    type: InputTypes.text,
  },
  key: {
    classes: "w-1/4 inline-block m-2",
    type: InputTypes.text,
  },
  description: {
    classes: "w-2/4 inline-block m-2",
    type: InputTypes.textArea,
  },
} as IuiSchema;

export const title = "branding image type";
