import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';


export const getProducts = createAsyncThunk("products/getProducts", async () => {
    try {
        const response = await axios.get("https://novacomputer-server.onrender.com/products");
        return response.data;
    }
    catch(error) {
        throw new Error("Get Items Failed");
    }
});





export const updateProduct = createAsyncThunk("products/updateProduct", async ({ id, productData }) => {
    try {
        const response = await axios.put(`http://localhost:4040/products/${id}`, productData);
        return { 
            id, 
            product: response.data.product,
            message: response.data.message 
        };
    }
    catch(error) {
        throw new Error("Update Product Failed");
    }
});




export const saveProduct = createAsyncThunk("products/saveProduct", async (productData) => {
    try {
        const response = await axios.post("https://novacomputer-server.onrender.com/addProduct", productData);
        return response.data.message;
    }
    catch(error) {
        throw new Error("Add Items Failed");
    }
});


export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id) => {
    try {
        await axios.delete(`http://localhost:4040/products/${id}`);
        return id;
    }
    catch(error) {
        throw new Error("Delete Product Failed");
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



            .addCase(updateProduct.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const { id, product } = action.payload;
                state.products = state.products.map(p => 
                    p._id === id ? { ...p, ...product } : p
                );
                state.message = "Product updated successfully";
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })




            .addCase(deleteProduct.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products = state.products.filter(product => product._id !== action.payload);
                state.message = "Product deleted successfully";
            })
            .addCase(deleteProduct.rejected, (state, action) => {
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