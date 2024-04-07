import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    list : []
}

export const ListSlice = createSlice({
    name : 'list',
    initialState,
    reducer : {
        setThisList : (state, action) => {
            state = [...action.payload]
        },
    }
})

export default ListSlice.reducer
export { setThisList }