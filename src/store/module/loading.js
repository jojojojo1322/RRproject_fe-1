import {createSlice} from '@reduxjs/toolkit';

const loadingReducer = createSlice({
  name: 'loading',
  initialState: {},
  reducers: {
    startLoading(state, {payload: type}) {
      return {
        ...state,
        [type]: true,
      };
    },
    finishLoading(state, {payload: type}) {
      return {
        ...state,
        [type]: false,
      };
    },
    loading(state, {payload: {name}}) {
      return {
        ...state,
        [name]: true,
      };
    },
    stopLoading(state, {payload: {name}}) {
      return {
        ...state,
        [name]: false,
      };
    },
  },
});

export const {
  startLoading,
  finishLoading,
  loading,
  stopLoading,
} = loadingReducer.actions;

export default loadingReducer.reducer;
