export enum ErrorType {
  NETWORK = "NETWORK",
  TIMEOUT = "TIMEOUT",
  SERVER = "SERVER",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  BAD_REQUEST = "BAD_REQUEST",
  VALIDATION = "VALIDATION",
  UNKNOWN = "UNKNOWN",
}

export interface FieldError {
  nome: string;
  messages: string[];
}

export interface ApiErrorResponse {
  error?: string;
  message?: string;
  fields?: FieldError[];
  status?: number;
}

export interface EnhancedError extends Error {
  type: ErrorType;
  userMessage: string;
  response?: {
    status: number;
    data: ApiErrorResponse;
  };
  code?: string;
  fieldErrors?: FormattedFieldError[];
}

export interface FormattedFieldError {
  fieldName: string;
  messages: string[];
}

export interface ErrorHandlingOptions {
  showNotification?: boolean;
  redirect?: string | null;
  autoClear?: boolean;
  hideFieldErrors?: boolean;
}

export const ErrorMessages: Record<ErrorType, string> = {
  [ErrorType.NETWORK]: "Erro de conexão. Verifique sua internet.",
  [ErrorType.TIMEOUT]:
    "A requisição demorou muito para responder. Tente novamente.",
  [ErrorType.SERVER]: "Erro no servidor. Tente novamente mais tarde.",
  [ErrorType.UNAUTHORIZED]: "Sessão expirada. Faça login novamente.",
  [ErrorType.FORBIDDEN]: "Você não tem permissão para acessar este recurso.",
  [ErrorType.NOT_FOUND]: "O recurso solicitado não foi encontrado.",
  [ErrorType.BAD_REQUEST]: "Dados inválidos enviados para o servidor.",
  [ErrorType.VALIDATION]: "Dados inválidos. Verifique os campos destacados.",
  [ErrorType.UNKNOWN]: "Ocorreu um erro inesperado. Tente novamente.",
};
