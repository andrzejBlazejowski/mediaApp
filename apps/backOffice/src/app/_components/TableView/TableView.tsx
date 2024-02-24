import React, { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@radix-ui/themes";
import { Pencil, Plus, Trash } from "lucide-react";

import type { Row, TableViewProps } from ".";
import { SortTypes } from ".";
import { FilterForm, SortIcon } from "./components";
import { useFiltering, useSortByColumn } from "./hooks/";

export function TableView({
  title,
  data,
  headersConfig,
  onDeleteRow,
  onSortByColumn,
  onFilter,
  onFilterClear,
  isAddButtonVisible = true,
  isLookupMode = false,
  defaultValues,
  setLookupData,
}: TableViewProps) {
  const pathname = usePathname();
  const Router = useRouter();
  const sortByColumn = useSortByColumn(onSortByColumn);
  const {
    onFilterColumnChange,
    onFilterButtonPressed,
    currentColumnForFilter,
    currentFilterValue,
    onFilterValueChange,
    isFilterButtonDisabled,
    onClearButtonPressed,
    isClearButtonDisabled,
  } = useFiltering({
    onFilter,
    onFilterClear,
    headersConfig,
  });

  const getOrderedHeaderElements = () => {
    if (headersConfig) {
      return Object.entries(headersConfig)
        .sort(([, aValue], [, bValue]) => {
          return headersConfig ? aValue.orderNumber - bValue.orderNumber : 0;
        })
        .map(
          ([
            ,
            {
              name,
              classNames,
              sortable,
              label,
              sortDirection = SortTypes.None,
            },
          ]) => (
            <Table.ColumnHeaderCell key={name} className={classNames}>
              <div className="flex items-center justify-evenly">
                <span key={`head-label-${name}`}>{label}</span>
                {sortable && (
                  <Button
                    key={`head-sort-button-${name}`}
                    onClick={() =>
                      sortByColumn({ name, sortDirection, sortable })
                    }
                    variant="outline"
                  >
                    <SortIcon sortDirection={sortDirection} />
                  </Button>
                )}
              </div>
            </Table.ColumnHeaderCell>
          ),
        );
    } else if (data[0]) {
      return Object.entries(data[0]).map(([key]) => (
        <Table.ColumnHeaderCell key={key} className="w-[100px]">
          {key}
        </Table.ColumnHeaderCell>
      ));
    } else {
      return null;
    }
  };

  const getHeaderOrder = (key: string) =>
    headersConfig ? headersConfig[key]?.orderNumber || 0 : 0;

  const deleteRow = useCallback(
    (row: Row) => {
      const id = row?.id?.value;
      if (id) {
        onDeleteRow && onDeleteRow(parseInt(id));
      } else {
        console.error("delete - id is not defined");
      }
    },
    [pathname, Router],
  );

  const editRow = useCallback(
    (row: Row) => {
      const id = row?.id?.value;
      if (id) {
        Router.push(`${pathname}/edit/${id}`);
      } else {
        console.error("edit action - id is not defined");
      }
    },
    [pathname, Router],
  );

  const onAddRow = useCallback(() => {
    Router.push(`${pathname}/add`);
  }, [pathname, Router]);

  const getOrderedTableCells = (row: Row) => {
    const res = Object.entries(row)
      .sort(([aKey], [bKey]) => {
        return headersConfig ? getHeaderOrder(aKey) - getHeaderOrder(bKey) : 0;
      })
      .map(([key, Field]) => Field);

    return res;
  };

  const onIsSelectedChange = (id: string) => {
    if (isLookupMode && setLookupData) {
      setLookupData((currentArray: number[]) => {
        if (currentArray.includes(parseInt(id))) {
          return currentArray.filter((value: number) => value !== parseInt(id));
        } else {
          return [...currentArray, parseInt(id)];
        }
      });
    }
    return true;
  };

  return (
    <>
      {!isLookupMode && (
        <>
          <h2 className="mt-6 scroll-m-20 border-b pb-10 text-center text-3xl font-semibold tracking-tight first:mt-0">
            <span className="mr-10">{title}</span>
            {isAddButtonVisible && (
              <Button onClick={onAddRow}>
                <Plus />
              </Button>
            )}
          </h2>
          <FilterForm
            onColumnChange={onFilterColumnChange}
            onValueChange={onFilterValueChange}
            onButtonPressed={onFilterButtonPressed}
            currentColumn={currentColumnForFilter}
            currentValue={currentFilterValue}
            isButtonDisabled={isFilterButtonDisabled}
            headersConfig={headersConfig}
            onClearButtonPressed={onClearButtonPressed}
            isClearButtonDisabled={isClearButtonDisabled}
          />
        </>
      )}
      <Table.Root>
        <TableHeader>
          <TableRow>
            {isLookupMode && (
              <Table.ColumnHeaderCell key="checkboxes" className="w-[50px]">
                is added
              </Table.ColumnHeaderCell>
            )}
            {getOrderedHeaderElements()}
            {!isLookupMode && (
              <Table.ColumnHeaderCell key="actions" className="w-[100px]">
                actions
              </Table.ColumnHeaderCell>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {isLookupMode && (
                <TableCell
                  key={index + (crypto?.randomUUID() || "") + "checkbox"}
                  className="font-medium"
                >
                  <Checkbox
                    onClick={() => onIsSelectedChange(row.id?.value ?? "")}
                    size="3"
                    {...(defaultValues?.includes(parseInt(row.id?.value ?? "0"))
                      ? { defaultChecked: true }
                      : {})}
                  />
                </TableCell>
              )}
              {getOrderedTableCells(row).map((field) => (
                <TableCell
                  key={index + (crypto?.randomUUID() || "") + field.value}
                  className="font-medium"
                >
                  {field.value}
                </TableCell>
              ))}
              {!isLookupMode && (
                <TableCell
                  key="actions"
                  className="flex space-x-4 font-medium "
                >
                  <Button
                    className=" mr-2"
                    onClick={() => {
                      editRow(row);
                    }}
                    variant="soft"
                    color="jade"
                  >
                    <Pencil />
                  </Button>
                  <Button
                    onClick={() => {
                      deleteRow(row);
                    }}
                    variant="soft"
                    color="amber"
                  >
                    <Trash />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table.Root>
    </>
  );
}
