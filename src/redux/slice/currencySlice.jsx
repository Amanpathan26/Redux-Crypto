import { createSlice } from '@reduxjs/toolkit';


const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    value: 'usd',
    symbol: '$'
  },
  reducers: {
    setCurrency: (state, action) => {
      state.value = action.payload;
      state.symbol = state.value === 'usd' ? '$' : '₹';
    }
  }
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
