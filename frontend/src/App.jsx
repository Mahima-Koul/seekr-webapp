import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Item from './pages/Item'
import {Toaster} from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Item/:id" element={<Item />} />
      </Routes>
    </div>
  )
}

export default App
