import {createSlice} from '@reduxjs/toolkit'

const searchSlice = createSlice({
    name:"search",
    initialState:{
        destination:null,
        date:null,
        count:{
            adult:1,
            children:0,
            room:0,
        }
    },
    reducers:{
        update:(state,action) => {
            state.destination = action.payload.destination,
            state.date = action.payload.date,
            state.count.adult = action.payload.options.Adult,
            state.count.children = action.payload.options.Children,
            state.count.room = action.payload.options.Room
        },
        reset:(state) => {
            state.destination = null,
            state.date = null,
            state.count.adult = 1,
            state.count.children = 0,
            state.count.room = 0
        }
    }
});

export const {update,reset} = searchSlice.actions;
export default searchSlice.reducer;