import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

interface SelectProps {
  placeholder?: string;
  defaultValue?: string;
  onValueChange?: (value: number | string) => void;
  type: "string" | "number";
  options: {
    name: string;
    value: string;
  }[];
}

export function SelectUi({
  placeholder,
  options,
  defaultValue,
  type = "number",
  onValueChange,
}: SelectProps) {
  return (
    <Select
      defaultValue={defaultValue + ""}
      value={defaultValue + ""}
      onValueChange={(value: string) =>
        onValueChange &&
        onValueChange(type === "number" ? parseInt(value) : value)
      }
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => {
          return (
            <SelectItem key={option.value} value={option.value}>
              {option.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
