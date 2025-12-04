import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';


export const getProducts = createAsyncThunk("products/getProducts", async () => {
    try {
        const response = await axios.get("http://localhost:4040/products");
        return response.data;
    }
    catch(error) {
        throw new Error("Get Items Failed");
    }
});



export const saveProduct = createAsyncThunk("products/saveProduct", async (productData) => {
    try {
        const response = await axios.post("http://localhost:4040/addProduct", productData);
        return response.data.message;
    }
    catch(error) {
        throw new Error("Add Items Failed");
    }
});



const initVal = {
    products: [],
    message: "",
    isLoading: false,
    isSuccess: false,
    isError: false
}

export const ProductSlice = createSlice({
    name: "products",
    initialState: initVal,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveProduct.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(saveProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(saveProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(getProducts.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
    }
});

export default ProductSlice.reducer;