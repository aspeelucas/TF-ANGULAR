export interface IPagination<T> {
  first: number;
  prev: null | number;
  next: null | number;
  last: number;
  page: number;
  items: number;
  data: T[];
}
