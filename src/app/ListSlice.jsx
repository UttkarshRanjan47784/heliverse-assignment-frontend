import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    listHome : [],
    currentPageHome : 1,
    totalPagesHome : 0,
    retrieveNumberHome : true,
    listFilter : [],
    currentPageFilter : 1,
    totalPagesFilter : 0,
}

export const ListSlice = createSlice({
    name : 'list',
    initialState,
    reducers : {
        setListHome : (state, action) => {
            state.listHome = [...action.payload.newList]
        },
        setCurrentPageHome : (state, action) => {
            state.currentPageHome = action.payload.newPage
        },
        nextCurrentPageHome : (state, action) => {
            state.currentPageHome += 1
        },
        prevCurrentPageHome : (state, action) => {
            state.currentPageHome -= 1
        }, 
        setTotalPagesHome : (state, action) => {
            state.totalPagesHome = action.payload.newTotal
        },
        setRetrieveNumberHome : (state, action) => {
            state.retrieveNumberHome = action.payload.newState
        },

        setListFilter : (state, action) => {
            state.listFilter = [...action.payload.newList]
        },
        setCurrentPageFilter : (state, action) => {
            state.currentPageFilter = action.payload.newPage
        },
        nextCurrentPageFilter : (state, action) => {
            state.currentPageFilter += 1
        },
        prevCurrentPageFilter : (state, action) => {
            state.currentPageFilter -= 1
        }, 
        setTotalPagesFilter : (state, action) => {
            state.totalPagesFilter = action.payload.newTotal
        },
    }
})

export const { setListHome, setCurrentPageHome, nextCurrentPageHome,
     prevCurrentPageHome, setTotalPagesHome, setRetrieveNumberHome,
     
     setListFilter, setCurrentPageFilter, nextCurrentPageFilter, prevCurrentPageFilter,
     setTotalPagesFilter } = ListSlice.actions
export default ListSlice.reducer