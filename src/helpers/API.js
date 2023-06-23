import md5 from 'crypto-js/md5';

const URL = 'https://opentdb.com/api_token.php?command=request';

export const returnToken = async () => {
  const response = await fetch(URL);
  const result = await response.json();
  return result.token;
};

export const returnQuestions = async (token) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const result = await response.json();
  return result;
};

export const handleGravatar = (email) => {
  const hash = md5(email);
  return `https://www.gravatar.com/avatar/${hash}`;
};
