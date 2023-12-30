import type { IuiSchema } from "../../_components/FormView/FormView.types";
import { InputTypes } from "../../_components/FormView/FormView.types";

export const uiSchema = {
  videoId: {
    clases: "w-1/3 ",
    type: InputTypes.foreignKey,
  },
  videoContentTypeId: {
    clases: "w-1/3 ",
    type: InputTypes.foreignKey,
  },
  mediaId: {
    clases: "w-1/3 ",
    type: InputTypes.foreignKey,
  },
} as unknown as IuiSchema;
