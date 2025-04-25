import { configureStore } from '@reduxjs/toolkit'
import currencyReducer from './slice/currencySlice'
import cryptoReducer from './slice/cryptoApi'

export default configureStore({
  reducer: {
    currency: currencyReducer,
    cryptoApi: cryptoReducer
  }
});