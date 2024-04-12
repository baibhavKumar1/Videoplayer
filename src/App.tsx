import React from 'react'
import Navbar from './components/Navbar'
import AllRoutes from './components/AllRoutes'
import { ThemeProvider } from './components/themeProvider'

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className='dark:bg-black '>
        <Navbar />
        <AllRoutes />
        <div className="w-[100%] dark:bg-black flex flex-col items-center mt-[20px]">
          <hr className="w-[95vw] my-4" />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App