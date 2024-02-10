import type { IuiSchema } from "~/app/_components/FormView/FormView.types";
import { InputTypes } from "~/app/_components/FormView/FormView.types";

export const uiSchema = {
  shortDescription: {
    classes: "w-1/2 inline-block m-2",
    type: InputTypes.textArea,
  },
  description: {
    classes: "w-1/2 inline-block m-2",
    type: InputTypes.textArea,
  },
  name: {
    classes: "w-1/4 inline-block m-2",
    type: InputTypes.text,
  },
  type: {
    classes: "w-1/4 inline-block m-2",
    type: InputTypes.text,
  },
  isFree: {
    classes: "w-1/4 inline-block m-2",
    type: InputTypes.checkbox,
  },
  mediaCategoryId: {
    classes: "w-1/4 inline-block m-2",
    type: InputTypes.foreignKey,
  },
} as unknown as IuiSchema;

export const title = "media";
