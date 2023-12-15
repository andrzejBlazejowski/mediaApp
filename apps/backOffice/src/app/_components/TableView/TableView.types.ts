interface FieldCommon {
  name?: string;
}

type FieldText = FieldCommon & {
  value: string;
  type: "text";
};

type FieldDate = FieldCommon & {
  value: number;
  type: "date";
};

type FieldNumber = FieldCommon & {
  value: number;
  type: "number";
  format: "price" | "smthElse";
};

type Field = FieldText | FieldDate | FieldNumber;

export type Row = Record<string, Field>;
export type Rows = Row[];

export interface Header {
  name: string;
  label: string;
  sortable: boolean;
  classNames: string;
  orderNumber: number;
}

export type HeadersConfig = Record<string, Header>;

export interface TableViewProps {
  title: string;
  data: Rows;
  headersConfig?: HeadersConfig;
}
