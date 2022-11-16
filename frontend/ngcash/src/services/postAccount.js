import axios from 'axios';

const postAccount = async (user) => {
  try {
    const endpoint = 'http://localhost:3333/ngcash/signup';
    const { data } = await axios.post(endpoint, user);
    return data;
  } catch {
    return { username: 'error', password: '' };
  }
};

export default postAccount;
