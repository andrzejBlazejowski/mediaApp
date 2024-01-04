import type { IuiSchema } from "~/app/_components/FormView/FormView.types";
import { InputTypes } from "~/app/_components/FormView/FormView.types";

export const uiSchema = {
  firstName: {
    classes: "w-1/4 inline-block m-2",
    type: InputTypes.text,
  },
  lastName: {
    classes: "w-1/4 inline-block m-2",
    type: InputTypes.text,
  },
  middleName: {
    classes: "w-1/4 inline-block m-2",
    type: InputTypes.text,
  },
  birthDate: {
    classes: "w-1/4 inline-block m-2",
    type: InputTypes.date,
  },
  deathDate: {
    classes: "w-1/4 inline-block m-2",
    type: InputTypes.date,
  },
  sex: {
    classes: "w-1/4 inline-block m-2",
    type: InputTypes.foreignKey,
  },
} as IuiSchema;

export const title = "people";
