export const timestampToString = (timestamp: number) => {
  if (timestamp === 0) return '-';

  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
};
