import React from 'react'
import { ThemeProvider } from './components/theme-provider'
import NavBar from './components/NavBar'
import DisplayAll from './components/DisplayAll'

export default function App() {
  return (
    <ThemeProvider >
        <NavBar />
        <div>Filters</div>
        <DisplayAll />
    </ThemeProvider>
  )
}
