import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import getTransactions from '../services/getTransactions';
import formatDate from '../utils/formatDate';

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
    <div>
      <h3>Transactions</h3>
      {transactionsToRender.map(({
        id, usernameCredited, usernameDebited, value, createdAt,
      }, index) => (
        <section key={id}>
          <p>{`Transação ${index + 1}`}</p>
          <p>{`Valor: ${usernameDebited === username ? '(-)' : '(+)'} R$ ${value}`}</p>
          <p>{`${usernameDebited === username ? `Para: ${usernameCredited}` : `De: ${usernameDebited}`}`}</p>
          <p>{`data: ${formatDate(createdAt.split('T', 2)[0])}`}</p>
        </section>
      ))}
    </div>
  );
}

export default Transactions;
