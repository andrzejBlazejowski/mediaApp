import { InputTypes } from "../FormView/FormView.types";

interface FieldText {
  value: string;
  name?: string;
  type?: "text";
}

type Field = FieldText;

export type Row = Record<string, Field>;
export type Rows = Row[];

export enum SortTypes {
  Asc = "asc",
  Desc = "desc",
  None = "none",
}

export interface Header {
  name: string;
  label: string;
  classNames: string;
  orderNumber: number;
  sortable?: boolean;
  filterable?: boolean;
  sortDirection?: SortTypes;
  foreignKey?: string;
  type?: InputTypes;
}

export type HeadersConfig = Record<string, Header>;

export interface TableViewProps {
  title: string;
  data: Rows;
  headersConfig?: HeadersConfig;
  onDeleteRow?: (id: number) => void;
  onSortByColumn?: (column: string, sortDirection: SortTypes) => void;
  onFilter?: (column: string, value: string, eq: boolean) => void;
  onFilterClear?: () => void;
  isAddButtonVisible?: boolean;
  isLookupMode?: boolean;
}
