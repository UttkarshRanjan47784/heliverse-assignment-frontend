import React from 'react'
import { ThemeProvider } from './components/theme-provider'
import NavBar from './components/NavBar'
import {useSelector} from 'react-redux'
import HomePage from './components/pages/HomePage'
import FilterPage from './components/pages/FilterPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SearchPage from './components/pages/SearchPage'
import BuildTeamPage from './components/pages/BuildTeamPage'
import ViewTeamsPage from './components/pages/ViewTeamsPage'

export default function App() {
  
  const head = useSelector(state => state.headTitle)

  return (
    <ThemeProvider >
      <BrowserRouter >
          <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />}  />
          <Route path='/filter' element={<FilterPage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/buildteam' element={<BuildTeamPage />} />
          <Route path='/viewteams' element={<ViewTeamsPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}