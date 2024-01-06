import type { IuiSchema } from "~/app/_components/FormView/FormView.types";
import { InputTypes } from "~/app/_components/FormView/FormView.types";

export const uiSchema = {
  name: {
    classes: "w-1/4 inline-block m-2",
    type: InputTypes.text,
  },
  menuPlatformId: {
    classes: "w-1/4 inline-block m-2",
    type: InputTypes.foreignKey,
  },
  menuTypeId: {
    classes: "w-1/4 inline-block m-2",
    type: InputTypes.foreignKey,
  },
  description: {
    classes: "w-1/2 inline-block m-2",
    type: InputTypes.textArea,
  },
} as IuiSchema;

export const title = "menu";
