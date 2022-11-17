import React, { useContext } from 'react';
import Payment from '../components/Payment';
import Transactions from '../components/Transactions';
import Context from '../context/Context';

function Home() {
  const { user: { username } } = useContext(Context);

  return (
    <div>
      <h1>{`Home - Bem Vindo ${username}`}</h1>
      <Transactions />
      <Payment />
    </div>
  );
}

export default Home;
