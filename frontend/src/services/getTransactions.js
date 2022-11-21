import axios from 'axios';

const getTransactions = async (userId, token) => {
  const endpoint = `http://localhost:3333/transactions/${userId}`;
  const data = await axios.get(endpoint, {
    headers: {
      'x-access-token': token,
    },
  })
    .then((response) => response.data);

  return data;
};

export default getTransactions;
