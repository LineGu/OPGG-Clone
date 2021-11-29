export const convertUnixTime = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  return { year, month, day, hour, minute };
};

export const getTimeDiff = (date: Date) => {
  const currentDate = convertUnixTime(new Date());
  const gameDate = convertUnixTime(date);

  if (currentDate.year - gameDate.year) return [currentDate.year - gameDate.year, '년'];
  if (currentDate.month - gameDate.month) return [currentDate.month - gameDate.month, '월'];
  if (currentDate.day - gameDate.day) return [currentDate.day - gameDate.day, '일'];
  if (currentDate.hour - gameDate.hour) return [currentDate.hour - gameDate.hour, '시간'];
  return [currentDate.minute - gameDate.minute, '분'];
};

export const getGameLength = (unixTime: number) => {
  const hour = unixTime > 3600 && Math.floor(unixTime / 3600);
  const minute = Math.floor(unixTime / 60);
  if (hour) return [hour, '시간', minute, '분'];
  const second = Math.floor(unixTime - minute * 60);
  if (minute) return [minute + '분', second + '초'];
};
