import md5 from 'crypto-js/md5';

export const handleGravatar = (email) => {
  const hash = md5(email);
  return `https://www.gravatar.com/avatar/${hash}`;
};

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
