import React, { useContext, useEffect } from 'react';
import { GrTransaction } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import Filters from '../components/Filters';
import Payment from '../components/Payment';
import Transactions from '../components/Transactions';
import Context from '../context/Context';
import getBalance from '../services/getBalance';
import '../styles/Home.css';
import formatValue from '../utils/formatValues';

function Home() {
  const {
    user, setUser, areYouDoingATransaction,
    setAreYouDoingATransaction,
  } = useContext(Context);

  useEffect(() => {
    getBalance(user, setUser);
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>{`Bem Vindo ${user.username}`}</h1>
        <Link to="/">Sair</Link>
      </header>
      <section className="balance">
        <h2>{`Saldo: R$ ${formatValue(user.balance)}`}</h2>
        <button
          type="button"
          onClick={() => setAreYouDoingATransaction(true)}
        >
          <GrTransaction />
        </button>
      </section>
      <Filters />
      <Transactions />
      { areYouDoingATransaction && <Payment />}
    </div>
  );
}

export default Home;
