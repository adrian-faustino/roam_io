const generateRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomCoord = () => {
  const data = {
    x: generateRandomNumber(0, 600),
    y: generateRandomNumber(0, 600)
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