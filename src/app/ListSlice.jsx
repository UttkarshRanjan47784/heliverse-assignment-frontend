import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    list : [],
    currentPage : 1,
    totalPages : 0,
    retrieveNumber : true,
    headTitle : 'Home',
    filterOn : false,
    searchOn : false,
    allOn : true
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
        },
        setHeadTitle : (state, action) => {
            state.headTitle = action.payload.newTitle
        },
        setFilterOn : (state, action) => {
            state.filterOn = action.payload.newState
        },
        setSearchOn : (state, action) => {
            state.filterOn = action.payload.newState
        },
        setAllOn : (state, action) => {
            state.filterOn = action.payload.newState
        }
    }
})

export const { setThisList, setCurrentPage, nextCurrentPage,
     prevCurrentPage, setTotalPages, setRetrieveNumber, setHeadTitle, 
     setFilterOn, setSearchOn, setAllOn } = ListSlice.actions
export default ListSlice.reducer