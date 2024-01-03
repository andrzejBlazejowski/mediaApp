import React from "react";

import CastRoleSelect from "./CastRoleSelect";
import CountrySelect from "./CountrySelect";
import ImageSelect from "./ImageSelect";
import MediaImageTypeSelect from "./MediaImageTypeSelect";
import MediaListSelect from "./MediaListSelect";
import MediaSelect from "./MediaSelect";
import PeopleSelect from "./PeopleSelect";
import { SelectProps } from "./select.types";
import VideoContentTypeSelect from "./VideoContentType";
import VideoSelect from "./VideosSelect";

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
    case "videoContentTypeId":
      return <VideoContentTypeSelect {...props} />;
    case "mediaId":
      return <MediaSelect {...props} />;
    case "mediaId":
      return <MediaSelect {...props} />;
    case "peopleId":
      return <PeopleSelect {...props} />;
    case "countryId":
      return <CountrySelect {...props} />;
    case "castRoleId":
      return <CastRoleSelect {...props} />;
    case "imageId":
      return <ImageSelect {...props} />;
    case "mediaImageTypeId":
      return <MediaImageTypeSelect {...props} />;
    case "mediaListId":
      return <MediaListSelect {...props} />;
    case "videoId":
    default:
      return <VideoSelect {...props} />;
  }
}
