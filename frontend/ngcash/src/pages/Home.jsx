import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import getTransactions from '../services/getTransactions';

function Home() {
  const { user: { userId, token }, setTransactions } = useContext(Context);

  useEffect(() => {
    getTransactions(userId, token, setTransactions);
  }, []);

  return (
    <div>Home</div>
  );
}

export default Home;
