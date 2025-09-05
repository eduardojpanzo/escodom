// import { deleteSession, getSession } from "@/lib/session";
import {
  type ApiErrorResponse,
  type EnhancedError,
  ErrorMessages,
  ErrorType,
  type FieldError,
  type FormattedFieldError,
} from "~/types/api.axios";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Accept-Language": "pt",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = { token: "await getSession();" };

    if (token?.token) {
      config.headers.Authorization = `Bearer ${token.token}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

export const getErrorType = (
  error: AxiosError<ApiErrorResponse>
): ErrorType => {
  if (!error.response) {
    return error.code === "ECONNABORTED"
      ? ErrorType.TIMEOUT
      : ErrorType.NETWORK;
  }

  const { status } = error.response;
  const { data } = error.response;

  // Se tiver campos na resposta, é um erro de validação
  if (
    data &&
    data.fields &&
    Array.isArray(data.fields) &&
    data.fields.length > 0
  ) {
    return ErrorType.VALIDATION;
  }

  switch (status) {
    case 400:
      return ErrorType.BAD_REQUEST;
    case 401:
      return ErrorType.UNAUTHORIZED;
    case 403:
      return ErrorType.FORBIDDEN;
    case 404:
      return ErrorType.NOT_FOUND;
    case 500:
    case 502:
    case 503:
    case 504:
      return ErrorType.SERVER;
    default:
      return ErrorType.UNKNOWN;
  }
};

export const formatFieldErrors = (
  fields: FieldError[]
): FormattedFieldError[] => {
  if (!fields || !Array.isArray(fields) || fields.length === 0) {
    return [];
  }

  return fields.map((field) => {
    const fieldName = field.nome || "campo";
    const messages = field.messages || [];
    return { fieldName, messages };
  });
};

// Função para processar respostas de erro e melhorar o objeto Error
const processApiError = (
  error: AxiosError<ApiErrorResponse>
): EnhancedError => {
  const errorType = getErrorType(error);
  let errorMessage = ErrorMessages[errorType];
  let fieldErrors: FormattedFieldError[] = [];

  if (error.response && error.response.data) {
    const { data } = error.response;

    if (data.error) {
      errorMessage = data.error;
    } else if (data.message) {
      errorMessage = data.message;
    }

    if (data.fields && Array.isArray(data.fields)) {
      fieldErrors = formatFieldErrors(data.fields);
    }
  }

  return {
    type: errorType,
    userMessage: errorMessage,
    fieldErrors: fieldErrors,
  } as EnhancedError;
};

// Função para tratar erros da API de forma global
export const handleApiError = (
  error: AxiosError<ApiErrorResponse>,
  navigate?: (path: string) => void
): EnhancedError => {
  const enhancedError = processApiError(error);

  toast.error(enhancedError.userMessage, {
    duration: 5000,
  });

  if (enhancedError.fieldErrors && enhancedError.fieldErrors.length > 0) {
    enhancedError.fieldErrors.forEach((field) => {
      if (field.messages && field.messages.length > 0) {
        field.messages.forEach((message) => {
          toast(`${field.fieldName}: ${message}`, {
            duration: 5000,
          });
        });
      }
    });
  }

  // Ações especiais para determinados tipos de erro
  if (enhancedError.type === ErrorType.UNAUTHORIZED && navigate) {
    console.log(" deleteSession();");

    navigate("/login");
  }

  return enhancedError;
};
