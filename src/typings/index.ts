export type Partial<T> = {
  [P in keyof T]?: T[P];
};

export interface PageQueryParams {
  page: number;
  size: number;
}

export interface PageResponseData {
  dataTotal?: number;
  pageTotal?: number;
  pageSize?: number;
  page?: number;
  size?: number;
  p?: number;
  pagesize?: number
  uid?: string|number;
}

export interface QueryListResponseData<T> {
  list: T[];
  page: PageResponseData;
}
