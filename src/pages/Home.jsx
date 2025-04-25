import React, { useEffect, useState } from "react";
import loaderImg from "../assets/loader.svg";
import { useDispatch, useSelector } from "react-redux";
import { cryptoApi } from "../redux/slice/cryptoApi";
import { useNavigate, Link } from "react-router-dom";

export default function Home() {
    const dispatch = useDispatch();
    const cryptoData = useSelector((state) => state.cryptoApi.data);
    const isLoading = useSelector((state) => state.cryptoApi.isLoading);
    const isError = useSelector((state) => state.cryptoApi.isError);
    const currency = useSelector((state) => state.currency.value);
    const currencySymbol = useSelector((state) => state.currency.symbol);

    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("name");
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(cryptoApi());
    }, [dispatch, currency]);

    const filteredData = cryptoData?.filter((coin) => {
        const matchesSearch = coin.name.toLowerCase().includes(searchQuery.toLowerCase());

        switch (filterType) {
            case "gainers":
                return matchesSearch && coin.price_change_percentage_24h > 0;
            case "losers":
                return matchesSearch && coin.price_change_percentage_24h < 0;
            case "name":
            default:
                return matchesSearch;
        }
    });

    const cellClickHandler = (coinName) => {
        navigate(`/search/${coinName}`);
    };

    const filterHandler = (e) => {
        setFilterType(e.target.value);
    };

    return (
        <>
            <main className="w-[98%] h-[85vh] mx-auto mt-4 overflow-x-auto">
                <div className="flex mb-1">
                    <input
                        type="text"
                        placeholder="Search for a coin..."
                        className="p-2 w-full border border-gray-300 rounded focus:outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <select
                        className="focus:outline-none text-black border border-gray-300 rounded p-2 w-full sm:w-auto"
                        onChange={filterHandler}
                        value={filterType}
                    >
                        <option value="name">Filter by Name</option>
                        <option value="gainers">Top Gainers</option>
                        <option value="losers">Top Losers</option>
                    </select>
                </div>

                {!isLoading ? (
                    filteredData && filteredData.length > 0 ? (
                        <table className="min-w-full border border-collapse text-sm md:text-base">
                            <thead className="sticky top-0 bg-gray-100">
                                <tr>
                                    <th className="text-end px-2">#</th>
                                    <th className="text-start px-2">Name</th>
                                    <th className="text-end px-2">Price</th>
                                    <th className="text-end hidden sm:table-cell px-2">1h %</th>
                                    <th className="text-end hidden sm:table-cell px-2">24h %</th>
                                    <th className="text-end hidden sm:table-cell px-2">7d %</th>
                                    <th className="text-end hidden sm:table-cell px-2">Market Cap</th>
                                    <th className="text-end hidden md:table-cell px-2">Volume(24h)</th>
                                    <th className="text-end hidden lg:table-cell px-2">Circulating Supply</th>
                                    <th className="text-end hidden sm:table-cell px-2">7d Chart</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((coin, i) => (
                                    <tr
                                        key={coin.id}
                                        className="hover:bg-gray-100 cursor-pointer"
                                        onClick={() => cellClickHandler(coin.name)}
                                    >
                                        <td className="text-end px-2 py-2">{i + 1}</td>
                                        <td className="flex items-center gap-2 px-2">
                                            <img src={coin.image} alt={coin.name} className="w-5 h-5" />
                                            {coin.name}
                                        </td>
                                        <td className="text-end px-2">
                                            {currencySymbol}{new Intl.NumberFormat().format(coin.current_price)}
                                        </td>
                                        <td className="text-end hidden sm:table-cell px-2">
                                            {coin.price_change_percentage_1h_in_currency?.toFixed(2) ?? "Null"}
                                        </td>
                                        <td className="text-end hidden sm:table-cell px-2" style={{ color: coin.price_change_percentage_24h < 0 ? "red" : "green" }}>
                                            {coin.price_change_percentage_24h.toFixed(2)}%
                                        </td>
                                        <td className="text-end hidden sm:table-cell px-2">
                                            {coin.price_change_percentage_7d_in_currency?.toFixed(2) ?? "Null"}
                                        </td>
                                        <td className="text-end hidden sm:table-cell px-2">
                                            {currencySymbol}{new Intl.NumberFormat().format(coin.market_cap)}
                                        </td>
                                        <td className="text-end hidden md:table-cell px-2">
                                            {currencySymbol}{new Intl.NumberFormat().format(coin.total_volume)}
                                        </td>
                                        <td className="text-end hidden lg:table-cell px-2">
                                            {coin.circulating_supply} {coin.symbol.toUpperCase()}
                                        </td>
                                        <td className="text-end hidden sm:table-cell px-2">📈</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center mt-5 text-gray-500">
                            No coins found matching the search query.
                        </div>
                    )
                ) : (
                    <div className="h-[80%] flex justify-center items-center">
                        <img className="w-[10%]" src={loaderImg} alt="Loading..." />
                    </div>
                )}

                {isError && (
                    <div className="text-center text-red-500 mt-10">
                        Failed to load data. Please try again later.
                    </div>
                )}
            </main>
        </>
    );
}
