import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice(
    {
        name: "todos",
        initialState: [],
        reducers: {
            addTodo: (state, action) => { 
                return [...state, action.payload];
            },
            removeTodo: (state, action) => {
                return state.filter(todo => todo.id !== action.payload)
            },
            updateTodo: (state, action) => {
                const { id, update } = action.payload;
                return state.map(todo => {
                    if(todo.id === id)
                    return {
                        ...todo,
                        description: update,
                    }
                });
            },
        },
    }
);

export const { addTodo, removeTodo, updateTodo } = todosSlice.actions;
export const todosSliceReducer = todosSlice.reducer;
export const selectTodosSlice = state => state.todos;