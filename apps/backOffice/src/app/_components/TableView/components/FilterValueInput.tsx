import React from "react";

import { InputTypes } from "../../FormView/FormView.types";
import SelectForeignKey from "../../FormView/SelectForeignKey/SelectForeignKey";
import { Input } from "../../ui/input";

export default function FilterValueInput({
  type,
  name,
  value,
  onChange,
}: {
  type: InputTypes;
  name: string;
  value: string;
  onChange: (value: string | number) => void;
}) {
  switch (type) {
    case InputTypes.foreignKey:
      return (
        <SelectForeignKey
          foreignKey={name}
          defaultValue={value}
          onValueChange={onChange}
        />
      );
    case InputTypes.date:
      return (
        <Input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case InputTypes.colorPicker:
      return (
        <Input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case InputTypes.checkbox:
      return (
        <Input
          type="checkbox"
          checked={value === "true"}
          onChange={(e) => onChange(e.target.checked.toString())}
        />
      );
    case InputTypes.number:
      return (
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case InputTypes.text:
    default:
      return (
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
}
