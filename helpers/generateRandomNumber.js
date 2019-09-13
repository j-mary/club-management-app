import randomNumber from 'random-number';

const generateRandomNumber = () => (
  randomNumber({
    min: 10000,
    max: 1000000000000000000,
    integer: true,
  })
);

export default generateRandomNumber;
