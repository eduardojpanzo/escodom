// Parâmetros genéricos de paginação
export interface PaginationParams {
  pageNumber: number;
  pageSize: number;
  orderBy?: string[];
}

export interface PaginatedResult<T> {
  success: boolean;
  data: T[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
export function paginate<T>(
  items: T[],
  totalCount: number,
  pageNumber: number,
  pageSize: number
): PaginatedResult<T> {
  const totalPages = Math.ceil(totalCount / pageSize);
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalCount);

  const paginatedItems = items.slice(startIndex, endIndex);

  return {
    success: true,
    data: paginatedItems,
    currentPage: pageNumber,
    totalPages,
    totalCount,
    pageSize,
    hasPreviousPage: pageNumber > 1,
    hasNextPage: pageNumber < totalPages,
  };
}
