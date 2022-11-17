import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import getTransactions from '../services/getTransactions';

function Transactions() {
  const { user: { userId, token }, setTransactions } = useContext(Context);

  useEffect(() => {
    getTransactions(userId, token, setTransactions);
  }, []);

  return (
    <div><h3>Transactions</h3></div>
  );
}

export default Transactions;
