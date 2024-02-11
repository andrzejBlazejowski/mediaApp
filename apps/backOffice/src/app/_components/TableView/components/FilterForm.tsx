import React from "react";
import { Button, Select } from "@radix-ui/themes";

import { InputTypes } from "../../FormView/FormView.types";
import { HeadersConfig } from "../TableView.types";
import FilterValueInput from "./FilterValueInput";

export function FilterForm({
  onColumnChange,
  onValueChange,
  onButtonPressed,
  currentColumn,
  currentValue,
  isButtonDisabled,
  onClearButtonPressed,
  isClearButtonDisabled,
  headersConfig,
}: {
  headersConfig?: HeadersConfig;
  onColumnChange: (value: string) => void;
  onValueChange: (value: string) => void;
  onButtonPressed: () => void;
  onClearButtonPressed: () => void;
  currentValue: string;
  currentColumn: string;
  isButtonDisabled: boolean;
  isClearButtonDisabled: boolean;
}) {
  let inputType = InputTypes.text;
  let columnName = currentColumn;

  if (typeof headersConfig !== "undefined" && headersConfig[currentColumn]) {
    const columnSchema = headersConfig[currentColumn];
    inputType = columnSchema?.type ?? InputTypes.text;
    columnName = columnSchema?.foreignKey ?? currentColumn;
  }

  return (
    <div className="mb-5 mt-10 flex justify-evenly border-b pb-10">
      <div className=" ">
        <Select.Root key="select-filter-column" onValueChange={onColumnChange}>
          <Select.Trigger placeholder="choose table collumn to filter in" />

          <Select.Content>
            {typeof headersConfig !== "undefined" ? (
              Object.entries(headersConfig).map(
                ([key, config]) =>
                  config.filterable !== false && (
                    <Select.Item
                      key={config.name + config.label + key}
                      value={config.name}
                    >
                      {config.label}
                    </Select.Item>
                  ),
              )
            ) : (
              <Select.Item key="filter_id" value="id">
                Id
              </Select.Item>
            )}
          </Select.Content>
        </Select.Root>
      </div>

      <div className="inline w-1/2 ">
        <FilterValueInput
          key="filter-value-input"
          type={inputType}
          name={columnName}
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

      <div className="inline ">
        <Button
          key="clear-filter-button"
          disabled={isClearButtonDisabled}
          onClick={onClearButtonPressed}
        >
          Clear
        </Button>
      </div>
    </div>
  );
}
