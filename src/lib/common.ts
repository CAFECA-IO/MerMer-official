export const timestampToString = (timestamp: number) => {
  if (timestamp === 0)
    return {
      date: '-',
    };

  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const dateString = `${year}-${month}-${day}`;

  return {
    date: dateString,
  };
};
