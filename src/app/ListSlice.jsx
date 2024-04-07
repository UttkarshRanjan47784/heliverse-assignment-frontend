import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    list : []
}

export const ListSlice = createSlice({
    name : 'list',
    initialState,
    reducers : {
        setThisList : (state, action) => {
            state.list = [...action.payload.newList]
        },
    }
})

export const { setThisList } = ListSlice.actions
export default ListSlice.reducer