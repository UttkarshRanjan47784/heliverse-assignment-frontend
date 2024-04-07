import React from 'react'
import { Button } from './components/ui/button'
import { ThemeProvider } from './components/theme-provider'
import { ModeToggle } from './components/mode-toggler'

export default function App() {
  return (
    <ThemeProvider >
      <div className='mx-5'>
        <Button>Click Me!</Button>
        <ModeToggle />
      </div>
    </ThemeProvider>
  )
}
