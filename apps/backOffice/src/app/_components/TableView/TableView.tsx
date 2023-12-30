import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Pencil, Trash } from "lucide-react";

import { Row, TableViewProps } from ".";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export function TableView({
  title,
  data,
  headersConfig,
  onDeleteRow,
}: TableViewProps) {
  const pathname = usePathname();
  const Router = useRouter();

  const getOrderedHeaderElements = () => {
    if (headersConfig) {
      return Object.entries(headersConfig)
        .sort(([aKey, aValue], [bKey, bValue]) => {
          return headersConfig ? aValue.orderNumber - bValue.orderNumber : 0;
        })
        .map(([key, header]) => (
          <TableHead key={header.name} className={header.classNames}>
            {header.label}
          </TableHead>
        ));
    } else if (data[0]) {
      const headers = Object.entries(data[0]).map(([key, value]) => (
        <TableHead key={key} className="w-[100px]">
          {key}
        </TableHead>
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
        console.log(id, "delete");
        onDeleteRow && onDeleteRow(parseInt(id));
      } else {
        console.log("delete - id is not defined");
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

  const getOrderedTableCells = (row: Row) => {
    const res = Object.entries(row)
      .sort(([aKey], [bKey]) => {
        return headersConfig ? getHeaderOrder(aKey) - getHeaderOrder(bKey) : 0;
      })
      .map(([key, Field]) => Field);

    return res;
  };

  return (
    <>
      <h2 className="mt-6 scroll-m-20 border-b pb-2 text-center text-3xl font-semibold tracking-tight first:mt-0">
        {title}
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            {getOrderedHeaderElements()}
            <TableHead key="actions" className="w-[100px]">
              actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {getOrderedTableCells(row).map((field) => (
                <TableCell
                  key={index + (field.name || field.value)}
                  className="font-medium"
                >
                  {field.value}
                </TableCell>
              ))}
              <TableCell key="actions" className="font-medium">
                <Button
                  onClick={() => {
                    editRow(row);
                  }}
                  variant="secondary"
                >
                  <Pencil />
                </Button>
                <Button
                  onClick={() => {
                    deleteRow(row);
                  }}
                  variant="destructive"
                >
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
