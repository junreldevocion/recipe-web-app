
import { Recipe } from "@/model/recepi.model";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


type InitialStateType = {
  data: Recipe[] | undefined;
  loading: boolean;
  hasError?: boolean
  message?: string
}

const initialState: InitialStateType = {
  data: undefined,
  loading: false,
  hasError: false,
  message: ''
}

export const getRecipies = createAsyncThunk('recipe/recipies', async () => {
  const res = await axios.get('/api/recipe')
  return res.data
});

export const updateRecipe = createAsyncThunk('recipe/updateRecipe', async (params: Recipe, { rejectWithValue }) => {
  try {
    const res = await axios.put('/api/updateRecipe', params)
    return res.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data)
    }
    throw error;
  }

});

export const filterRecipies = createAsyncThunk('recipe/filterRecipies', async (params: { isYesFavorites: Recipe['favorite'], isNoFavorites: Recipe['favorite'] }) => {
  const res = await axios.post('/api/filterRecipe', params)
  return res.data
});

export const searchRecipies = createAsyncThunk('recipe/searchRecipies', async (params: { title: Recipe['title'] }) => {
  const res = await axios.post('/api/searchRecipies', params)
  return res.data
});

export const addRecipe = createAsyncThunk('recipe/addRecipe', async (params: FormData, { rejectWithValue }) => {
  try {
    const res = await axios.post('/api/saveRecipe', params)
    return res.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data)
    }
    throw error;
  }

})

export const removeRecipe = createAsyncThunk('recipe/remove', async (params: { id: Recipe['id'] }, { rejectWithValue }) => {
  try {
    const res = await axios.delete('/api/recipe', { data: params })
    return res.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
})

export const updateFavorite = createAsyncThunk('recipe/updateFavorite', async (params: { id: Recipe['id'], favorite: Recipe['favorite'] }, { rejectWithValue }) => {
  try {
    console.log(params, 'llll')
    const { id, favorite } = params
    const res = await axios.put(`/api/updateFavorite?id=${id}`, { favorite })
    return res.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
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
        state.loading = false
        state.data = action.payload.data
        state.message = action.payload.message
      })
      .addCase(updateRecipe.rejected, (state, action) => {
        state.loading = false;
        state.hasError = !!action.error.message
        state.message = action.error.message
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
        state.message = action.payload.message
      })
      .addCase(addRecipe.rejected, (state, action) => {
        state.loading = false;
        state.hasError = !!action.error.message
        state.message = action.error.message
      })
      .addCase(updateFavorite.pending, (state) => {
        state.loading = true
      })
      .addCase(updateFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data
      })
  },
})