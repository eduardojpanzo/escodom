let lastId = 0;

export const uniqueId = (prefix = "id") => {
  lastId++;
  return `${prefix}${lastId}`;
};
