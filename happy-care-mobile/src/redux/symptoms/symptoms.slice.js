import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  symptoms: [],
};

const symptomsSlice = createSlice({
  name: 'symptoms',
  initialState,
  reducers: {
    getSymptoms: (state, action) => {
      const { symptoms } = action.payload;
      state.symptoms = symptoms;
    },
  },
});

export const symptomsAction = symptomsSlice.actions;
export default symptomsSlice.reducer;
