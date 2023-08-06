import { createSlice, AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";

export const getNews = createAsyncThunk("news/getNews",async()=>{
    return fetch("https://newsapi.org/v2/top-headlines?country=in&apiKey=9886e6225b1943c6bfb6801c39b1ba52").then((res)=>res.json())
})

const newsSlice = createSlice({
    name:"news",
    initialState:{
        news:[],
        loading:false
    },
extraReducers: {
    [getNews.pending]: (state, action) =>{
        state.loading = true;
    },
    [getNews.fulfilled]: (state, action) =>{
        state.loading = false;
        state.news = action.payload;
    },
    [getNews.rejected]: (state, action) =>{
        state.loading = false;
    },
},
}
)
export default newsSlice.reducer