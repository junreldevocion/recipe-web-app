import { formSchema } from "@/components/RecipeForm";
import { Recipe } from "@/model/recepi.model";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { z } from "zod";


type InitialStateType = {
  data: Recipe[] | undefined;
  loading: boolean;
}

const initialState: InitialStateType = {
  data: undefined,
  loading: false,
}

export const getRecipies = createAsyncThunk('get/recipies', async () => {
  const res = await axios.get('/api/recipe')
  return res.data
});

export const updateRecipe = createAsyncThunk('put/recipe', async (params: Recipe) => {
  const res = await axios.put('/api/recipe', params)
  return res.data
});

export const filterRecipies = createAsyncThunk('post/filterRecipies', async (params: { isYesFavorites: Recipe['favorite'], isNoFavorites: Recipe['favorite'] }) => {
  const res = await axios.post('/api/filterRecipe', params)
  return res.data
});

export const searchRecipies = createAsyncThunk('post/searchRecipies', async (params: { title: Recipe['title'] }) => {
  const res = await axios.post('/api/searchRecipies', params)
  return res.data
});

export const addRecipe = createAsyncThunk('post/addRecipe', async (params: z.infer<typeof formSchema>) => {
  const res = await axios.post('/api/recipe', params, { headers: { 'content-type': 'multipart/form-data' } })
  return res.data
})

export const RecipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    sortRecipe: (state, action) => {
      state.data = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(getRecipies.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.loading = false
    }).addCase(getRecipies.pending, (state) => {
      state.loading = true
    })
      .addCase(updateRecipe.pending, (state) => {
        state.loading = true
      }).addCase(updateRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data
      })
      .addCase(filterRecipies.pending, (state) => {
        state.loading = true
      })
      .addCase(filterRecipies.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data
      })
      .addCase(searchRecipies.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchRecipies.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload.data
      })
      .addCase(addRecipe.pending, (state) => {
        state.loading = true
      }).addCase(addRecipe.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload.data
      })
  },
})