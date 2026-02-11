export interface Errors {
  [field: string]: string;
}

export interface ResponseWithErrors {
  errors?: Errors;
  error_messages?: string[];
  error?: string;
  restricted_records?: RestrictedRecord[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface RestrictedRecord {
  field: string;
  ids: number[];
}

interface MetaVars {
  page: string;
  items: string;
  outset: number;
  size: Array<number>;
  page_param: string;
  fragment: string;
  link_extra: string;
  i18n_key: string;
  cycle: boolean;
  metadata: Array<string>;
  count: number;
}

export interface Meta {
  scaffold_url: string;
  first_url: string;
  prev_url: string;
  page_url: string;
  next_url: string;
  last_url: string;
  count: number;
  page: number;
  items: number;
  vars: MetaVars;
  pages: number;
  last: number;
  in: number;
  from: number;
  to: number;
  prev: number | null;
  next: number | null;
  series: Array<string>;
}
