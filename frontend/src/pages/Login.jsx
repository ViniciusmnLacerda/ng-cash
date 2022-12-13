import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Link, useHistory } from 'react-router-dom';
import Context from '../context/Context';
import postLogin from '../services/postLogin';
import '../styles/Login.css';

function Login() {
  const { user, setUser } = useContext(Context);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [areCredentialValid, setAreCredentialValid] = useState(false);
  const history = useHistory();

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  useEffect(() => {
    setUser({
      username: '',
      password: '',
      token: '',
      userId: '',
      balance: '',
    });
  }, []);

  const handleClick = async () => {
    const { token, userId } = await postLogin(user);
    if (token.length > 0) {
      setAreCredentialValid(false);
      setUser({
        ...user,
        token,
        userId,
      });

      history.push(`ngcash/home/${userId}`);
    } else {
      setAreCredentialValid(true);
    }
  };

  useEffect(() => {
    const isLoginValid = [
      user.username.length > 2,
      user.password.length > 7,
    ].every(Boolean);
    if (isLoginValid) setIsBtnDisabled(false);
    else setIsBtnDisabled(true);
    setAreCredentialValid(false);
  }, [user]);

  return (
    <div className="login-container">
      <main className="login-card">
        <header className="login-header">
          <h1>TRANSFERS APP</h1>
        </header>
        <section className="login-form">
          <form>
            <label htmlFor="username">
              <AiOutlineUser fontSize={22} />
              <input
                autoComplete="off"
                placeholder="Nome de usuário"
                type="text"
                value={user.username}
                onChange={(event) => handleChange(event)}
                id="username"
                name="username"
              />
            </label>
            <label htmlFor="password">
              <RiLockPasswordLine fontSize={22} />
              <input
                autoComplete="off"
                placeholder="Sua senha aqui"
                type="password"
                value={user.password}
                onChange={(event) => handleChange(event)}
                id="password"
                name="password"
              />
            </label>
          </form>
          <p className="alert">{areCredentialValid && 'Senha ou nome de usuários estão incorretos'}</p>
        </section>
        <div className="btn-login">
          <button
            data-testid="login-submit-btn"
            type="button"
            disabled={isBtnDisabled}
            onClick={handleClick}
          >
            entrar
          </button>
          <button
            type="button"
          >
            <Link to="/ngcash/signup">Criar conta</Link>
          </button>
        </div>
      </main>
    </div>
  );
}

export default Login;
