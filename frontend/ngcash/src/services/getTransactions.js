import axios from 'axios';

const getTransactions = async (userId, token, setTransactions) => {
  const endpoint = `http://localhost:3333/transactions/${userId}`;
  await axios.get(endpoint, {
    headers: {
      'x-access-token': token,
    },
  })
    .then((response) => setTransactions(response.data));
};

export default getTransactions;
