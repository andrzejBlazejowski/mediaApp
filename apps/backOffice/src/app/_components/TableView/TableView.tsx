import { useMemo } from "react";
import { Table } from "lucide-react";

import { Row, TableViewProps } from ".";
import {
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export function TableView({ title, data, headersConfig }: TableViewProps) {
  const orderedHeaderElements = useMemo(() => {
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
  }, [headersConfig, data[0]]);

  const getHeaderOrder = (key: string) =>
    headersConfig ? headersConfig[key]?.orderNumber || 0 : 0;

  const getOrderedTableCells = (row: Row) => {
    const res = Object.entries(row)
      .sort(([aKey], [bKey]) => {
        return headersConfig ? getHeaderOrder(aKey) - getHeaderOrder(bKey) : 0;
      })
      .map(([key, Field]) => Field);

    return res;
  };

  return (
    <Table>
      <TableCaption>{title}</TableCaption>
      <TableHeader>
        <TableRow>{orderedHeaderElements}</TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {getOrderedTableCells(row).map((field) => (
              <TableCell className="font-medium">{field.value}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
