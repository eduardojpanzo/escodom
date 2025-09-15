export type HttpSearchResponseModel<T> = {
  data: T[];
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

export type HttpGetResponseModel<T> = {
  data: T;
  mensagem: string;
  success: boolean;
};
