export interface HttpSearchResponseModel<T> {
  data: T[];
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface HttpGetResponseModel<T> {
  dados: T;
  mensagem: string;
  status: boolean;
}
