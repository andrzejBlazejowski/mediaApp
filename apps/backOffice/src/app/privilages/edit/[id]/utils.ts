export enum accesses {
  read = 1,
  write = 2,
  delete = 4,
}

export enum privilagesAreas {
  media = "media",
  branding = "branding",
  cast = "cast",
  screens = "screens",
  dictionary = "dictionary",
  menu = "menu",
  purchase = "purcchase",
}

export const isReadAccess = (val = 0) => {
  return (val & accesses.read) === accesses.read;
};
export const isWriteAccess = (val = 0) => {
  return (val & accesses.write) === accesses.write;
};
export const isDeleteAccess = (val = 0) => {
  return (val & accesses.delete) === accesses.delete;
};

export const getAccessIntValue = ({
  read,
  write,
  deleteAcc,
}: {
  read: boolean;
  write: boolean;
  deleteAcc: boolean;
}) => {
  let value = 0;
  if (read) value += accesses.read;
  if (write) value += accesses.write;
  if (deleteAcc) value += accesses.delete;
  return value;
};

export const privilagesHeaders = [
  "media",
  "branding",
  "cast",
  "screens",
  "dictionary",
  "menu",
  "purchase",
];
