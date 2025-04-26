import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  cryptos: [
    {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 93759.48,
      change1h: 0.43,
      change24h: 0.93,
      change7d: 11.11,
      marketCap: 1861618902186,
      volume24h: 43874950947,
      circulatingSupply: '19.85 BTC',
      logo: 'https://th.bing.com/th/id/OIP.W9TeteQE_AVvFfs1M1HaxAHaHZ?w=250&h=249&c=8&rs=1&qlt=90&o=6&dpr=1.1&pid=3.1&rm=2',
    },
    {
      id: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      price: 1802.46,
      change1h: 0.60,
      change24h: 3.21,
      change7d: 13.68,
      marketCap: 217581279327,
      volume24h: 23547469307,
      circulatingSupply: '120.71 ETH',
      logo: 'https://th.bing.com/th/id/OIP.kdvLNBdk2OW4gErUPpK3_QHaHa?rs=1&pid=ImgDetMain',
    },
    {
      id: 3,
      name: 'Tether',
      symbol: 'USDT',
      price: 1.0,
      change1h: 0.00,
      change24h: 0.00,
      change7d: 0.04,
      marketCap: 145320022085,
      volume24h: 92288882007,
      circulatingSupply: '145.27 USDT',
      logo: 'https://th.bing.com/th/id/OIP.syal359xumkfXWRk8L_chQHaHa?rs=1&pid=ImgDetMain',
    },
    {
      id: 4,
      name: 'XRP',
      symbol: 'XRP',
      price: 2.22,
      change1h: 0.46,
      change24h: 0.54,
      change7d: 6.18,
      marketCap: 130073814966,
      volume24h: 5131481491,
      circulatingSupply: '58.39 XRP',
      logo: 'https://static.vecteezy.com/system/resources/previews/011/307/281/non_2x/xrp-badge-crypto3d-rendering-free-png.png',
    },
    {
      id: 5,
      name: 'Solana',
      symbol: 'SOL',
      price: 151.51,
      change1h: 0.53,
      change24h: 1.26,
      change7d: 14.74,
      marketCap: 78381958361,
      volume24h: 4881674486,
      circulatingSupply: '517.31 SOL',
      logo: 'https://cryptologos.cc/logos/solana-sol-logo.png',
    },
  ],
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateCrypto(state, action) {
      const updated = action.payload;
      state.cryptos = state.cryptos.map(crypto =>
        crypto.id === updated.id ? { ...crypto, ...updated } : crypto
      );
    },
  },
});

export const { updateCrypto } = cryptoSlice.actions;

const store = configureStore({
  reducer: {
    crypto: cryptoSlice.reducer,
  },
});

export default store;
