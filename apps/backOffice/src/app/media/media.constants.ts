import type { IuiSchema } from "../_components/FormView/FormView.types";
import { InputTypes } from "../_components/FormView/FormView.types";

export const uiSchema = {
  name: {
    clases: "w-1/4 ",
    type: InputTypes.text,
  },
  shortDescription: {
    clases: "w-1/2 ",
    type: InputTypes.textArea,
  },
  description: {
    clases: "w-1/2 ",
    type: InputTypes.textArea,
  },
  type: {
    clases: "w-1/4 ",
    type: InputTypes.foreignKey,
  },
  isFree: {
    clases: "w-1/4 ",
    type: InputTypes.checkbox,
  },
  mediaCategoyId: {
    clases: "w-1/4 ",
    type: InputTypes.foreignKey,
  },
} as unknown as IuiSchema;
