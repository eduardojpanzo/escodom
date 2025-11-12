import { AsyncLocalStorage } from "async_hooks";

export interface RequestContext {
  personId: string;
}

export const requestContext = new AsyncLocalStorage<RequestContext>();

export function runWithRequestContext<T>(
  context: RequestContext,
  callback: () => T
) {
  return requestContext.run(context, callback);
}

export function getRequestContext(): RequestContext | undefined {
  return requestContext.getStore();
}
