export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as K))
  ) as Omit<T, K>;
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0][0].toUpperCase();
  }
  const first = parts[0][0].toUpperCase();
  const last = parts[parts.length - 1][0].toUpperCase();
  return first + last;
}
