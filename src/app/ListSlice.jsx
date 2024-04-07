import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    list : [],
    currentPage : 1,
    totalPages : 0,
    retrieveNumber : true
}

export const ListSlice = createSlice({
    name : 'list',
    initialState,
    reducers : {
        setThisList : (state, action) => {
            state.list = [...action.payload.newList]
        },
        setCurrentPage : (state, action) => {
            state.currentPage = action.payload.newPage
        },
        nextCurrentPage : (state, action) => {
            state.currentPage += 1
        },
        prevCurrentPage : (state, action) => {
            state.currentPage -= 1
        }, 
        setTotalPages : (state, action) => {
            state.totalPages = action.payload.newTotal
        },
        setRetrieveNumber : (state, action) => {
            state.retrieveNumber = action.payload.newState
        }
    }
})

export const { setThisList, setCurrentPage, nextCurrentPage, prevCurrentPage, setTotalPages, setRetrieveNumber } = ListSlice.actions
export default ListSlice.reducer