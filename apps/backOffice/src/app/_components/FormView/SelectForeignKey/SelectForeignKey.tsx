import React from "react";

import VideoSelect from "./VideoSelect";

interface Props {
  foreignKey: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

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
      return <VideoSelect {...props} />;
    case "mediaId":
      return <VideoSelect {...props} />;
    default:
      return <VideoSelect {...props} />;
  }
}
