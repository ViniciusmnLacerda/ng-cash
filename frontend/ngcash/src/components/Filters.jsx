import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import formatDate from '../utils/formatDate';

function Filters() {
  const {
    filters, setFilters, transactions, setTransactionToRender, user,
  } = useContext(Context);

  const filterTransactionsByType = (transactionsToFilter) => {
    if (filters.type !== 'all') {
      const filteredTransactions = transactionsToFilter
        .filter((transaction) => (filters.type === 'cashin'
          ? transaction.usernameCredited === user.username
          : transaction.usernameCredited !== user.username));
      return filteredTransactions;
    }
    return transactions;
  };

  const filterTransactions = () => {
    if (filters.date !== '') {
      const transactionsToFilter = filterTransactionsByType(transactions);
      const transactionsToRender = transactionsToFilter
        .filter((transaction) => formatDate(transaction.createdAt.split('T', 2)[0]) === filters.date);
      setTransactionToRender(transactionsToRender);
    } else {
      setTransactionToRender(filterTransactionsByType(transactions));
    }
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFilters({
      ...filters,
      [name]: name === 'type' ? value : formatDate(value),
    });
  };

  useEffect(() => {
    filterTransactions();
  }, [filters]);

  return (
    <section>
      <h3>Filters</h3>
      <form>
        <label htmlFor="type">
          <select
            name="type"
            id="type"
            onChange={(e) => handleChange(e)}
            value={filters.type}
          >
            <option value="all">
              Todas
            </option>
            <option value="cashin">
              Cash-in
            </option>
            <option value="cashout">
              Cash-out
            </option>
          </select>
        </label>
        <label htmlFor="date">
          <input
            type="date"
            name="date"
            id="date"
            onChange={(e) => handleChange(e)}
          />
        </label>
      </form>
    </section>
  );
}

export default Filters;
