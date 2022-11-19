import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BsCash } from 'react-icons/bs';
import { GrClose, GrTransaction } from 'react-icons/gr';
import Context from '../context/Context';
import getBalance from '../services/getBalance';
import getTransactions from '../services/getTransactions';
import postTransaction from '../services/postTransaction';
import '../styles/Payment.css';

function Payment() {
  const {
    user,
    setUser,
    setTransactions,
    setAreYouDoingATransaction,
    setTransactionToRender,
  } = useContext(Context);
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
    const transactions = await getTransactions(user.userId, user.token);
    setTransactionToRender(transactions);
    setTransactions(transactions);
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
    <section className="payment">
      <div className="payment-content">
        <div className="payment-header">
          <h2>Transação</h2>
          <button
            onClick={() => setAreYouDoingATransaction(false)}
            type="button"
          >
            <GrClose />
          </button>
        </div>
        <main>
          <form className="payment-form">
            <label htmlFor="userDebited">
              <AiOutlineUser fontSize={22} />
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
              <GrTransaction fontSize={22} />
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
              <BsCash fontSize={22} />
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
          </form>
          <p>{transactionMessage}</p>
          <button
            className="btn-payment"
            type="button"
            disabled={isBtnDisabled}
            onClick={handleClick}
          >
            Transferir
          </button>
        </main>
      </div>
    </section>
  );
}

export default Payment;
