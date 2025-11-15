export function birthDateToAge(birthDate?: Date | string) {
  const currentYear = new Date().getFullYear();

  if (typeof birthDate === "string") {
    return currentYear - new Date(birthDate).getFullYear();
  }

  return currentYear - (birthDate?.getFullYear() ?? 0);
}
