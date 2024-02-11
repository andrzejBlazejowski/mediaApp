import React from "react";
import { Select } from "@radix-ui/themes";

interface SelectProps {
  placeholder?: string;
  defaultValue?: string;
  onValueChange?: (value: number | string) => void;
  type?: "string" | "number";
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
    <Select.Root
      defaultValue={defaultValue + ""}
      value={defaultValue + ""}
      onValueChange={(value: string) =>
        onValueChange &&
        onValueChange(type === "number" ? parseInt(value) : value)
      }
    >
      <Select.Trigger
        className="w-[180px]"
        placeholder={placeholder}
      ></Select.Trigger>
      <Select.Content>
        {options.map((option) => {
          return (
            <Select.Item key={option.value} value={option.value}>
              {option.name}
            </Select.Item>
          );
        })}
      </Select.Content>
    </Select.Root>
  );
}
