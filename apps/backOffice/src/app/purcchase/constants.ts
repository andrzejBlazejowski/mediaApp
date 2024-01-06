import type { IuiSchema } from "~/app/_components/FormView/FormView.types";
import { InputTypes } from "~/app/_components/FormView/FormView.types";

export const uiSchema = {
  purchaseTypeId: {
    classes: "w-1/4 inline-block m-2",
    type: InputTypes.foreignKey,
  },
  mediaId: {
    classes: "w-1/2 inline-block m-2",
    type: InputTypes.foreignKey,
  },
  userId: {
    classes: "w-1/2 inline-block m-2",
    type: InputTypes.foreignKey,
  },
} as IuiSchema;

export const title = "purchase ";
