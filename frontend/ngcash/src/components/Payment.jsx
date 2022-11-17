import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';
import getBalance from '../services/getBalance';
import getTransactions from '../services/getTransactions';
import postTransaction from '../services/postTransaction';

function Payment() {
  const { user, setUser, setTransactions } = useContext(Context);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [transactionMessage, setTransactionMessage] = useState();
  const [transaction, setTransaction] = useState({
    userCredited: '',
    userDebited: user.username,
    value: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setTransaction({
      ...transaction,
      [name]: name === 'value' ? Number(value) : value,
    });
  };

  const handleClick = async () => {
    const { message } = await postTransaction(transaction, user.token);
    setTransactionMessage(message);
    getBalance(user, setUser);
    getTransactions(user.userId, user.token, setTransactions);
  };

  useEffect(() => {
    const isTransferValid = [
      transaction.userDebited.length > 2,
      transaction.value > 0,
    ].every(Boolean);
    if (isTransferValid) setIsBtnDisabled(false);
    else setIsBtnDisabled(true);
  }, [transaction]);

  return (
    <div>
      <h3>Payment</h3>
      <main className="login-card">
        <form className="login-form">
          <label htmlFor="userDebited">
            <input
              autoComplete="off"
              placeholder="Nome de usuário"
              type="text"
              id="userDebited"
              name="userDebited"
              value={transaction.userDebited}
            />
          </label>
          <label htmlFor="userCredited">
            <input
              autoComplete="off"
              placeholder="Destino"
              type="userCredited"
              id="userCredited"
              name="userCredited"
              value={transaction.userCredited}
              onChange={(e) => handleChange(e)}
            />
          </label>
          <label htmlFor="value">
            <input
              type="number"
              name="value"
              id="value"
              step="0.1"
              min="0"
              value={transaction.value}
              onChange={(e) => handleChange(e)}
            />
          </label>
          <button
            data-testid="login-submit-btn"
            type="button"
            disabled={isBtnDisabled}
            onClick={handleClick}
          >
            Transferir
          </button>
        </form>
        <p>{transactionMessage}</p>
      </main>
    </div>
  );
}

export default Payment;
