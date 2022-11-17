import React, { useContext, useEffect } from 'react';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import Context from '../context/Context';
import getTransactions from '../services/getTransactions';
import '../styles/Transactions.css';
import formatDate from '../utils/formatDate';
import formatValue from '../utils/formatValues';

function Transactions() {
  const {
    user: { userId, token, username },
    setTransactions,
    setTransactionToRender,
    transactionsToRender,
  } = useContext(Context);

  const fetchTransactions = async () => {
    const data = await getTransactions(userId, token, setTransactions);
    setTransactions(data);
    setTransactionToRender(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <article className="transactions">
      <div className="header-transactions">
        <h3>Transações</h3>
      </div>
      <main className="transactions-container">
        {transactionsToRender.map(({
          id, usernameCredited, usernameDebited, value, createdAt,
        }) => (
          <section
            className={usernameDebited === username ? 'cashout' : 'cashin'}
            key={id}
          >
            {usernameDebited === username ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
            <div>
              <p>{`R$ ${formatValue(value)}`}</p>
            </div>
            <div>
              <p>{`${usernameDebited === username ? usernameCredited : usernameDebited}`}</p>
            </div>
            <p>{formatDate(createdAt.split('T', 2)[0])}</p>
          </section>
        ))}
      </main>
    </article>
  );
}

export default Transactions;
