import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const cryptoApi = createAsyncThunk("cryptoApi", async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const currency = state.currency.value;
    const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`,
        {
            method: "GET",
            headers: {
                accept: "application/json",
                "x-cg-demo-api-key": "CG-UrQ8rDcqgt6qBE99EkPqqVqV",
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch crypto data");
    }

    return response.json();
});

const cryptoData = createSlice({
    name: "cryptoApi",
    initialState: {
        isLoading: false,
        data: null,
        isError: false,
    },

    reducers: {
        
    },

    extraReducers: (builder) => {
        builder
            .addCase(cryptoApi.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(cryptoApi.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(cryptoApi.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                console.error("Error fetching data:", action.error.message);
            });
    },
});

export default cryptoData.reducer;
