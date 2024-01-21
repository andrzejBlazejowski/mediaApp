import React from "react";

import { InputTypes, IuiSchema } from "../../FormView/FormView.types";
import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { HeadersConfig } from "../TableView.types";
import FilterValueInput from "./FilterValueInput";

export function FilterForm({
  onColumnChange,
  onValueChange,
  onButtonPressed,
  currentColumn,
  currentValue,
  isButtonDisabled,
  headersConfig,
  uiSchema,
}: {
  headersConfig?: HeadersConfig;
  onColumnChange: (value: string) => void;
  onValueChange: (value: string) => void;
  onButtonPressed: () => void;
  currentValue: string;
  currentColumn: string;
  isButtonDisabled: boolean;
  uiSchema?: IuiSchema;
}) {
  let inputType = InputTypes.text;
  if (typeof uiSchema !== "undefined" && uiSchema[currentColumn]) {
    const columnSchema = uiSchema[currentColumn];
    inputType = columnSchema?.type ?? InputTypes.text;
  }

  return (
    <div className="mb-5 mt-10 flex justify-evenly border-b pb-10">
      <div className=" ">
        <Select key="select-filter-column" onValueChange={onColumnChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="choose table collumn to filter in" />
          </SelectTrigger>
          <SelectContent>
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
          </SelectContent>
        </Select>
      </div>

      <div className="inline w-1/2 ">
        <FilterValueInput
          key="filter-value-input"
          type={inputType}
          name={currentColumn}
          value={currentValue}
          onChange={(value) =>
            onValueChange(typeof value === "number" ? value.toString() : value)
          }
        />
      </div>

      <div className="inline ">
        <Button
          key="filter-button"
          disabled={isButtonDisabled}
          onClick={onButtonPressed}
        >
          Filter
        </Button>
      </div>
    </div>
  );
}
