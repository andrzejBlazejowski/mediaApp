import React from "react";

import MediaSelect from "./MediaSelect";
import { SelectProps } from "./select.types";
import VideoContentTypeSelect from "./VideoContentType";
import VideoSelect from "./VideoSelect";

type Props = SelectProps & {
  foreignKey: string;
};

export default function SelectForeignKey({
  foreignKey,
  defaultValue,
  onValueChange,
}: Props) {
  const props = {
    defaultValue,
    onValueChange,
  };

  switch (foreignKey) {
    case "videoId":
      return <VideoSelect {...props} />;
    case "videoContentTypeId":
      return <VideoContentTypeSelect {...props} />;
    case "mediaId":
      return <MediaSelect {...props} />;
    default:
      return <VideoSelect {...props} />;
  }
}
