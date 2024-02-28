export function useFormFieldName(name: string) {
  const translating = {
    videoContentTypeId: "Video Content Type",
    mediaId: "Media",
    peopleId: "People",
    countryId: "Country",
    castRoleId: "Cast Role",
    imageId: "Image",
    mediaImageTypeId: "Media Image Type",
    mediaCategoryId: "Media Category",
    castMemberId: "Cast Member",
    mediaListId: "Media List",
    sex: "Sex",
    brandingImageTypeId: "Branding Image Type",
    brandingImageId: "Branding Image",
    brandingColorTypeId: "Branding Color Type",
    brandingId: "Branding",
    destinationScreenId: "Destination Screen",
    vodScreenId: "VOD Screen",
    vodScreenTypeId: "VOD Screen Type",
    screenTypeId: "Screen Type",
    articleScreenId: "Article Screen",
    articleScreenImageId: "Article Screen Image",
    menuId: "Menu",
    menuPlatformId: "Menu Platform",
    platformId: "Platform",
    menuTypeId: "Menu Type",
    menuLinkImageId: "Menu Link Image",
    userId: "User",
    purchaseTypeId: "Purchase Type",
    purchaseId: "Purchase",
    menuLinkId: "Menu Link",
    mediaListTypeId: "Media List Type",
    invoiceTypeId: "Invoice Type",
    videoId: "Video",
  };

  //@ts-ignore
  const transleatedName = translating[name];

  return transleatedName || name.replace(/([A-Z])/g, " $1");
}
