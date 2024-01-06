import React from "react";

import ArticleScreenImageSelect from "./ArticleScreenImageSelect";
import ArticleScreenSelect from "./ArticleScreenSelect";
import BrandingColorTypeSelect from "./BrandingColorTypeSelect";
import BrandingImageSelect from "./BrandingImageSelect";
import BrandingImageTypeSelect from "./BrandingImageTypeSelect";
import BrandingSelect from "./BrandingSelect";
import CastMemberSelect from "./CastMemberSelect ";
import CastRoleSelect from "./CastRoleSelect";
import CountrySelect from "./CountrySelect";
import ImageSelect from "./ImageSelect";
import MediaCategorySelect from "./MediaCategorySelect";
import MediaImageTypeSelect from "./MediaImageTypeSelect";
import MediaListSelect from "./MediaListSelect";
import MediaSelect from "./MediaSelect";
import MenuLinkImageTypeSelect from "./MenuLinkImageTypeSelect ";
import MenuPlatformTypeSelect from "./MenuPlatformTypeSelect";
import MenuSelect from "./MenuSelect";
import MenuTypeSelect from "./MenuTypeSelect";
import PeopleSelect from "./PeopleSelect";
import PlatformSelect from "./PlatformSelect";
import { SelectProps } from "./select.types";
import SexKeySelect from "./SexKeySelect";
import VideoContentTypeSelect from "./VideoContentType";
import VideoSelect from "./VideosSelect";
import VodScreenSelect from "./VodScreenSelect";
import VodScreenTypeSelect from "./VodScreenTypeSelect";

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
    case "mediaCategoryId":
      return <MediaCategorySelect {...props} />;
    case "castMemberId":
      return <CastMemberSelect {...props} />;
    case "mediaListId":
      return <MediaListSelect {...props} />;
    case "sex":
      return <SexKeySelect {...props} />;
    case "brandingImageTypeId":
      return <BrandingImageTypeSelect {...props} />;
    case "brandingImageId":
      return <BrandingImageSelect {...props} />;
    case "brandingColorTypeId":
      return <BrandingColorTypeSelect {...props} />;
    case "brandingId":
      return <BrandingSelect {...props} />;
    case "vodScreenId":
      return <VodScreenSelect {...props} />;
    case "vodScreenTypeId":
      return <VodScreenTypeSelect {...props} />;
    case "articleScreenId":
      return <ArticleScreenSelect {...props} />;
    case "articleScreenImageId":
      return <ArticleScreenImageSelect {...props} />;
    case "menuId":
      return <MenuSelect {...props} />;
    case "platformId":
      return <PlatformSelect {...props} />;
    case "menuTypeId":
      return <MenuTypeSelect {...props} />;
    case "menuPlatformId":
      return <MenuPlatformTypeSelect {...props} />;
    case "menuLinkImageId":
      return <MenuLinkImageTypeSelect {...props} />;
    case "purchaseTypeId":
    case "userId":

    case "videoId":
    default:
      return <VideoSelect {...props} />;
  }
}
