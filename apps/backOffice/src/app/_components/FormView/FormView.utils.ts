export const getTypeBasedOnZod = (zodType: string, zodObj: {}): string => {
  switch (zodType) {
    case "ZodNumber":
      return "number";
    case "ZodBoolean":
      return "checkbox";
    case "ZodOptional":
      //@ts-ignore
      return getTypeBasedOnZod(zodObj.innerType._def.typeName);
    case "ZodString":
      //@ts-ignore
      if (
        //@ts-ignore
        zodObj.checks.reduce(
          //@ts-ignore
          (accumulator, currentValue) => currentValue.max || accumulator,
          0,
        ) > 255
      )
        return "textArea";
      else return "input";
    default:
      return "input";
  }
};
