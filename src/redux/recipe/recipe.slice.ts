import { Recipe } from "@/model/recepi.model";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


type InitialStateType = {
  data: Recipe[] | undefined;
  loading: boolean;
}

const initialState: InitialStateType = {
  data: undefined,
  loading: false,
}

export const getRecipies = createAsyncThunk('get/queue', async () => {
  const res = await axios.get('/api/recipe')
  return res.data
});

export const RecipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder.addCase(getRecipies.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.loading = false
    }).addCase(getRecipies.pending, (state) => {
      state.loading = true
    })
  },
})