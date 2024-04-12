// store.js
import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./features/game";

const store = configureStore({
    reducer: {
        game: gameReducer,
    },
});

export default store;
