import React, { useContext, useEffect } from 'react';
import Filters from '../components/Filters';
import Payment from '../components/Payment';
import Transactions from '../components/Transactions';
import Context from '../context/Context';
import getBalance from '../services/getBalance';

function Home() {
  const { user, setUser } = useContext(Context);

  useEffect(() => {
    getBalance(user, setUser);
  }, []);

  return (
    <div>
      <h1>{`Saldo - Bem Vindo ${user.username}`}</h1>
      <h2>{`Balance R$ ${user.balance}`}</h2>
      <Filters />
      <Transactions />
      <Payment />
    </div>
  );
}

export default Home;
