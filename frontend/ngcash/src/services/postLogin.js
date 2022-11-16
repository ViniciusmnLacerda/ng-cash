import axios from 'axios';

const endpoint = 'http://localhost:3333/ngcash/login';

const postLogin = async ({ username, password }) => {
  try {
    const { data } = await axios.post(endpoint, { username, password });
    return data;
  } catch (err) {
    return { token: '', userId: '' };
  }
};

export default postLogin;
