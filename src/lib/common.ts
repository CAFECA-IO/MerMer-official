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

export const truncateText = (text: string, limitLength: number) => {
  const words = text.split(' ');
  let result = '';

  for (let i = 0; i < words.length; i++) {
    if ((result + words[i]).length > limitLength) break;
    if (result.length != 0) result += ' ';

    result += words[i];
  }
  if (text.length > limitLength) result += '...';

  return result;
};
