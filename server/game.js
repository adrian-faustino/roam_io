const BOARD_WIDTH = 600;
const BOARD_HEIGHT = 600;
const CIRCLE_CIRCUMFERENCE = 50;

const generateRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomCoord = () => {
  const data = {
    x: Math.random() * (BOARD_HEIGHT - CIRCLE_CIRCUMFERENCE),
    y: Math.random() * (BOARD_WIDTH - CIRCLE_CIRCUMFERENCE)
  };

  return data
};

const circleID = () => {
  const LIST = '1234567890abcdefghijklmnopqrstuvwxyz'.split('');

  const template = [1, 2, 3];
  uID = template.map((e) => {
    return LIST[generateRandomNumber(0, LIST.length - 1)];
  });

  return uID.join('');
};

module.exports = {
  randomCoord,
  circleID
};