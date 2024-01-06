import type { IuiSchema } from "~/app/_components/FormView/FormView.types";
import { InputTypes } from "~/app/_components/FormView/FormView.types";

export const uiSchema = {
  progress: {
    classes: "w-1/4 inline-block m-2",
    type: InputTypes.number,
  },
  mediaId: {
    classes: "w-1/4 inline-block m-2",
    type: InputTypes.foreignKey,
  },
} as IuiSchema;

export const title = "media view impression";
