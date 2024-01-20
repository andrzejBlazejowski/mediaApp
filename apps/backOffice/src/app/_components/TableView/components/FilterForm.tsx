import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { HeadersConfig } from "../TableView.types";

export function FilterForm({
  onColumnChange,
  onValueChange,
  onButtonPressed,
  currentColumn,
  currentValue,
  isButtonDisabled,
  headersConfig,
}: {
  headersConfig?: HeadersConfig;
  onColumnChange: (value: string) => void;
  onValueChange: (value: string) => void;
  onButtonPressed: () => void;
  currentValue: string;
  currentColumn: string;
  isButtonDisabled: boolean;
}) {
  return (
    <>
      <Select onValueChange={onColumnChange} defaultValue={currentColumn}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="choose table collumn to filter in" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {typeof headersConfig !== "undefined" ? (
              Object.entries(headersConfig).map(([key, config]) => (
                <SelectItem
                  key={config.name + config.label + key}
                  value={config.name}
                >
                  {config.label}
                </SelectItem>
              ))
            ) : (
              <SelectItem key="filter_id" value="id">
                Id
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Input />

      <Button disabled={isButtonDisabled} onClick={onButtonPressed}>
        Filter
      </Button>
    </>
  );
}
