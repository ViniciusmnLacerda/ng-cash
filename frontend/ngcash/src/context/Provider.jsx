/* eslint-disable react/jsx-no-constructed-context-values */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Context from './Context';

function Provider({ children }) {
  const [user, setUser] = useState({
    username: '',
    password: '',
    token: '',
    userId: '',
    balance: '',
  });

  const [transactions, setTransactions] = useState([]);

  const [transactionsToRender, setTransactionToRender] = useState([]);

  const [filters, setFilters] = useState({
    type: 'all',
    date: '',
  });

  const value = {
    user,
    setUser,
    transactions,
    setTransactions,
    transactionsToRender,
    setTransactionToRender,
    filters,
    setFilters,
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
