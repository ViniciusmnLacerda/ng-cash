import React, { useEffect, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { ImCross } from 'react-icons/im';
import { MdOutlineDone } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useHistory } from 'react-router-dom';
import postAccount from '../services/postAccount';
import '../styles/SignUp.css';

function SignUp() {
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [userWasCreated, setUserWasCreated] = useState(true);
  const history = useHistory();
  const [validations, setValidations] = useState({
    uppercase: false,
    number: false,
    username: false,
    password: false,
  });
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  useEffect(() => {
    const isTheDataValid = [
      validations.uppercase,
      validations.number,
      validations.password,
      validations.username,
    ].every(Boolean);
    setIsBtnDisabled(!isTheDataValid);
  }, [validations]);

  useEffect(() => {
    const regexUppercase = /(?=.*[A-Z])/;
    const regexNumber = /(?=.*\d)/;
    setValidations({
      username: user.username.length > 2,
      password: user.password.length > 7,
      uppercase: regexUppercase.test(user.password),
      number: regexNumber.test(user.password),
    });
    setUserWasCreated(true);
  }, [user]);

  const handleClick = async () => {
    const { username } = await postAccount(user);
    if (username !== 'error') {
      history.push('/');
    } else {
      setUserWasCreated(false);
    }
  };

  return (
    <div className="login-container">
      <main className="login-card">
        <div className="login-header signup-h">
          <h1>NG.CASH</h1>
        </div>
        <section className="login-form signup-f">
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
            <p className={validations.username ? 'right' : 'wrong'}>
              {validations.username ? <MdOutlineDone /> : <ImCross />}
              {'  '}
              Seu nome de usuário deve ter pelo menos três caracteres
            </p>
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
            <p className={validations.password ? 'right' : 'wrong'}>
              {validations.password ? <MdOutlineDone /> : <ImCross />}
              {'  '}
              Sua senha deve ter pelo menos oito caracteres
            </p>
            <p className={validations.uppercase ? 'right' : 'wrong'}>
              {validations.uppercase ? <MdOutlineDone /> : <ImCross />}
              {'  '}
              Sua senha deve ter pelo menos uma letra maiúscula
            </p>
            <p className={validations.number ? 'right' : 'wrong'}>
              {validations.number ? <MdOutlineDone /> : <ImCross />}
              {'  '}
              Sua senha deve ter pelo menos um número
            </p>
          </form>
        </section>
        <div className="btn-login signup-b">
          <button
            data-testid="login-submit-btn"
            type="button"
            disabled={isBtnDisabled}
            onClick={handleClick}
          >
            Criar conta
          </button>
          {!userWasCreated && <p>O nome de usuário não está disponível</p>}
        </div>
      </main>
    </div>
  );
}

export default SignUp;
