import type { IuiSchema } from "~/app/_components/FormView/FormView.types";
import { InputTypes } from "~/app/_components/FormView/FormView.types";

export const uiSchema = {
  menuId: {
    classes: "w-1/4 inline-block m-2",
    type: InputTypes.foreignKey,
  },
  menuLinkImageId: {
    classes: "w-1/4 inline-block m-2",
    type: InputTypes.foreignKey,
  },
  destinationScreenId: {
    classes: "w-1/4 inline-block m-2",
    type: InputTypes.foreignKey,
  },
  name: {
    classes: "w-1/4 inline-block m-2",
    type: InputTypes.text,
  },
  description: {
    classes: "w-1/2 inline-block m-2",
    type: InputTypes.textArea,
  },
} as IuiSchema;

export const title = "menu links";
