import { configureStore } from "@reduxjs/toolkit";
import { todosSliceReducer } from "../features/todosSlice";

const store = configureStore(
    {
        reducer: {
            todos: todosSliceReducer,
        },
    }
);

export default store;