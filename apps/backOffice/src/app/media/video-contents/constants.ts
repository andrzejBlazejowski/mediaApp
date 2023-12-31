import { media } from "@media/db";

import type { IuiSchema } from "../../_components/FormView/FormView.types";
import { InputTypes } from "../../_components/FormView/FormView.types";

const title = "Video content";

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
  title: title,
  insertSchema: media.videoContentsInsertSchema,
};

export const listConfig = {
  title: title + " list",
  data: [],
  headersConfig: {
    id: {
      orderNumber: 0,
      name: "id",
      label: "id",
      classNames: "w-[20px]",
      sortable: true,
    },
    media: {
      orderNumber: 1,
      name: "media",
      label: "media",
      classNames: "w-[100px]",
      sortable: true,
    },
    video: {
      orderNumber: 2,
      name: "video",
      label: "video",
      classNames: "w-[100px]",
      sortable: true,
    },
    type: {
      orderNumber: 3,
      name: "type",
      label: "type",
      classNames: "w-[100px]",
      sortable: true,
    },
  },
};
