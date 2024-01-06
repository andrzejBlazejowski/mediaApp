import type { IuiSchema } from "~/app/_components/FormView/FormView.types";
import { InputTypes } from "~/app/_components/FormView/FormView.types";

export const uiSchema = {
  name: {
    classes: "w-1/2 inline-block m-2",
    type: InputTypes.text,
  },
  mediaId: {
    classes: "w-1/4 inline-block m-2",
    type: InputTypes.foreignKey,
  },
  imageId: {
    classes: "w-1/4 inline-block m-2",
    type: InputTypes.foreignKey,
  },
  mediaImageTypeId: {
    classes: "w-1/4 inline-block m-2",
    type: InputTypes.foreignKey,
  },
} as IuiSchema;

export const title = "media image";
