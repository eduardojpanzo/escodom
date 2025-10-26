export const checkPermission = (
  required_permissions: string[],
  permissions: string[] = []
) => {
  return required_permissions.some((item) => permissions.includes(item));
};
