import { useState } from 'react';
import TransactionsTable from './components/TransactionsTable';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';

const App = () => {
  const [month, setMonth] = useState('March');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  return (
    <div>
      <h1>Product Transactions</h1>
      <div>
        <label htmlFor="month">Select Month: </label>
        <select
          id="month"
          value={month}
          onChange={e => {
            setMonth(e.target.value);
            setPage(1);
          }}
        >
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>
      <div>
        <label htmlFor="search">Search Transactions: </label>
        <input
          id="search"
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={() => setSearch('')}>Clear</button>
      </div>
      <TransactionsTable month={month} search={search} page={page} setPage={setPage} />
      <Statistics month={month} />
      <BarChart month={month} />
      <PieChart month={month} />
    </div>
  );
};

export default App;