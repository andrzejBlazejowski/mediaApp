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
  onValueChange?: (value: string) => void;
  options: {
    name: string;
    value: string;
  }[];
}

export function SelectForeignKey({
  placeholder,
  options,
  defaultValue,
  onValueChange,
}: SelectProps) {
  return (
    <Select defaultValue={defaultValue} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
