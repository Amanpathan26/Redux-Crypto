import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { cryptoApi } from '../redux/slice/cryptoApi';

function SearchedCoin() {
    const { coinName } = useParams(); 
    const dispatch = useDispatch();
    const cryptoData = useSelector(state => state.cryptoApi.data); 
    
    const currencySymbol = useSelector(state => state.currency.symbol); 
    const currency = useSelector(state => state.currency.value); 

     const [initialLoading, setInitialLoading] = useState(true);

    const [coin, setCoin] = useState(null); 

    useEffect(() => {
        dispatch(cryptoApi()).then(() => setInitialLoading(false));
         setInterval(() => {
            dispatch(cryptoApi());
        }, 2000);
    }, [dispatch, currency]);

    useEffect(() => {
        const foundCoin = cryptoData?.find(c => c.name.toLowerCase() === coinName.toLowerCase());
        setCoin(foundCoin);
    }, [cryptoData, coinName, currency]); 

    if (initialLoading) {
        return (
            <div className="h-[90vh] flex justify-center items-center">
                <div className="text-center">
                    Loading...
                </div>
            </div>
        );
    }

    if (!coin) {
        return (
            <div className="h-[90vh] flex justify-center items-center">
                <div className="text-center">
                    <p>Coin "{coinName}" not found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-[90vh] flex justify-center items-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">
                    {coin.name} ({coin.symbol.toUpperCase()})
                </h1>
                <img src={coin.image} alt={coin.name} className="w-20 h-20 mb-4 mx-auto" />
                <div className="text-start">
                    <p><strong>Current Price:</strong> {currencySymbol}{new Intl.NumberFormat().format(coin.current_price)}</p>
                    <p><strong>1h %: </strong>
                        {coin.price_change_percentage_1h_in_currency?.toFixed(2) ?? "Null"}
                    </p>
                    <p><strong>24h Change: </strong>
                        <span style={{ color: coin.price_change_percentage_24h < 0 ? "red" : "green" }} >
                            {coin.price_change_percentage_24h.toFixed(2)}%
                        </span>
                    </p>
                    <p><strong>7d Change: </strong>
                        {coin.price_change_percentage_7d_in_currency?.toFixed(2) ?? "Null"}
                    </p>
                    <p><strong>Market Cap:</strong> {currencySymbol}{new Intl.NumberFormat().format(coin.market_cap)}</p>
                    <p className="text-end hidden md:table-cell">
                        <strong>Volume(24h):</strong> {currencySymbol}{new Intl.NumberFormat().format(coin.total_volume)}
                    </p>
                    <p><strong>Circulating Supply:</strong> {coin.circulating_supply}</p>
                    <p className="text-center text-7xl">📈</p>
                </div>
            </div>
        </div>
    );
}

export default SearchedCoin;
