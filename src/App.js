import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCrypto } from './store'; 
import './App.css';

function App() {
  const dispatch = useDispatch();
  const cryptos = useSelector((state) => state.crypto.cryptos); 
  const [sortBy, setSortBy] = useState('price');

  useEffect(() => {
    const socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade'); 

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const newPrice = parseFloat(data.p); 
      const id = cryptos.find((c) => c.symbol === 'BTC')?.id; 
      if (id) {
        dispatch(updateCrypto({
          id,
          price: newPrice,
          change1h: +(Math.random() * 2 - 1).toFixed(2), 
          change24h: +(Math.random() * 4 - 2).toFixed(2),
          change7d: +(Math.random() * 10 - 5).toFixed(2),
          volume24h: Math.floor(Math.random() * 5000000),
        }));
      }
    };

    return () => socket.close(); 
  }, [dispatch, cryptos]);


  const sortedCryptos = [...cryptos].sort((a, b) => {
    if (sortBy === 'price') {
      return b.price - a.price; 
    }
    return b.change24h - a.change24h; 
  });

  
  useEffect(() => {
    localStorage.setItem('cryptos', JSON.stringify(cryptos));
  }, [cryptos]);

  useEffect(() => {
    const savedCryptos = localStorage.getItem('cryptos');
    if (savedCryptos) {
      dispatch(updateCrypto(JSON.parse(savedCryptos)));
    }
  }, [dispatch]);

  return (
    <div className="container">
      <h1>Crypto Price Tracker</h1>
      <div>
        <button onClick={() => setSortBy('price')}>Sort by Price</button>
        <button onClick={() => setSortBy('change24h')}>Sort by 24h Change</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>S. NO.</th>
            <th>Logo</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>1h %</th>
            <th>24h %</th>
            <th>7d %</th>
            <th>Market Cap</th>
            <th>24h Volume</th>
            <th>Circulating Supply</th>
            <th>Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {sortedCryptos.map((crypto, idx) => (
            <tr key={crypto.id}>
              <td>{idx + 1}</td>
              <td><img src={crypto.logo} alt={crypto.symbol} width="24" /></td>
              <td>{crypto.name}</td>
              <td>{crypto.symbol}</td>
              <td>${crypto.price.toLocaleString()}</td>
              <td className={crypto.change1h >= 0 ? 'green' : 'red'}>
                {crypto.change1h}%
              </td>
              <td className={crypto.change24h >= 0 ? 'green' : 'red'}>
                {crypto.change24h}%
              </td>
              <td className={crypto.change7d >= 0 ? 'green' : 'red'}>
                {crypto.change7d}%
              </td>
              <td>${crypto.marketCap.toLocaleString()}</td>
              <td>${crypto.volume24h.toLocaleString()}</td>
              <td>{crypto.circulatingSupply}</td>
              <td><img src="/7d.png" alt="7D Chart" width="100%" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
