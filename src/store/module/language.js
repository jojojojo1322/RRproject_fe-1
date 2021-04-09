import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const languageReducer = createSlice({
  name: 'language',
  initialState: {
    language: 'en',
  },
  reducers: {
    setLangauge(state, {payload: {language}}) {
      AsyncStorage.setItem('deviceLanguage', language);
      return {
        ...state,
        language: language,
      };
    },
  },
});

export const {setLangauge} = languageReducer.actions;

export default languageReducer.reducer;
