import axios from 'axios';

const getBalance = async (user, setUser) => {
  const endpoint = `http://localhost:3333/transactions/balance/${user.userId}`;
  await axios.get(endpoint, {
    headers: {
      'x-access-token': user.token,
    },
  })
    .then((response) => setUser({ ...user, balance: response.data.message }));
};

export default getBalance;
