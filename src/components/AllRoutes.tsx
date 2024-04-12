import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import VideoPlayer from './VideoPlayer'

const AllRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/video/:id' element={<VideoPlayer/>} />
        </Routes>
    )
}

export default AllRoutes