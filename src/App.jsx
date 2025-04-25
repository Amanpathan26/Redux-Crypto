
import { Routes, Route, Link } from "react-router-dom";
import SearchedCoin from "./pages/SearchedCoin";
import Home from "./pages/Home";
import { useDispatch } from "react-redux";
import { setCurrency } from "./redux/slice/currencySlice"

function App() {

  const dispatch = useDispatch()

  const currencyHandler = (e) => {
    dispatch(setCurrency(e.target.value));
  }


  return (
    <>
      <div className="flex justify-between items-center bg-amber-500 h-[10vh] p-4 font-bold text-xl text-center md:text-left">
        <Link
          to="/"
          className="text-white font-bold text-2xl hover:text-amber-200 transition duration-300 ease-in-out"
        >
          Home
        </Link>

        <div className="relative">
          <select
            className="bg-white text-black font-semibold p-2 rounded-lg border border-amber-300 hover:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300"
            onChange={currencyHandler}
          >
            <option value="usd">USD</option>
            <option value="inr">INR</option>
          </select>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/search/:coinName" element={<SearchedCoin />} />
      </Routes>
    </>
  );
}

export default App;
