import axios from 'axios';

const postTransaction = async (transaction, token) => {
  try {
    const endpoint = 'http://localhost:3333/transactions';
    await axios.post(endpoint, transaction, {
      headers: {
        'x-access-token': token,
      },
    });
    return { message: 'Transferência realizada com sucesso' };
  } catch {
    return { message: 'Dados inválidos' };
  }
};

export default postTransaction;
