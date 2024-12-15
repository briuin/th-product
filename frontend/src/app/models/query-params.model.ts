import { SortOptions } from "./sort-options.model";

export interface QueryParams extends SortOptions {
    searchText: string;
    page: number; 
    perPage: number;
  }
  