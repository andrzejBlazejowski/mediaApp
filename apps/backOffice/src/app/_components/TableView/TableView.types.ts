interface FieldCommon {
  name?: string;
}

interface FieldText {
  value: string;
  name?: string;
  type?: "text";
}

type Field = FieldText;

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
  onDeleteRow?: (id: number) => Promise<void>;
}
