import React from 'react'
import { ThemeProvider } from './components/theme-provider'
import NavBar from './components/NavBar'
import DisplayAll from './components/DisplayAll'
import {useSelector} from 'react-redux'
import FilterSection from './components/FilterSection'

export default function App() {
  
  const head = useSelector(state => state.headTitle)

  return (
    <ThemeProvider >
        <NavBar />
        {head == "Find People"? <div>Search</div> : null}
        {head == "Filter" ? <FilterSection /> : null}
        {head == "Teams"? <div>Teams</div> : null}
        <DisplayAll />
    </ThemeProvider>
  )
}
