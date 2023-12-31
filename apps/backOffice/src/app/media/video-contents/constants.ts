import { media } from "@media/db";

import type { IuiSchema } from "../../_components/FormView/FormView.types";
import { InputTypes } from "../../_components/FormView/FormView.types";

export const uiSchema = {
  videoId: {
    classes: "w-1/4 inline-block m-2",
    type: InputTypes.foreignKey,
  },
  videoContentTypeId: {
    classes: "w-1/4 inline-block m-2",
    type: InputTypes.foreignKey,
  },
  mediaId: {
    classes: "w-1/4 inline-block m-2",
    type: InputTypes.foreignKey,
  },
} as IuiSchema;

export const formConfig = {
  uiSchema,
  title: "Video content",
  insertSchema: media.videoContentsInsertSchema,
};
