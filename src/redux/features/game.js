import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    speed: 1000,
    timer: 180,
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        updateSpeedAndTime: (state, action) => {
            const { selectedLevel, selectedTime } = action.payload;
            if (selectedLevel === 0) {
                state.speed = 1500;
            } else if (selectedLevel === 1) {
                state.speed = 1000;
            } else if (selectedLevel === 2) {
                state.speed = 500;
            }
            state.timer = selectedTime * 60;
        },
    },
});

export const { updateSpeedAndTime } = gameSlice.actions;
export default gameSlice.reducer;
