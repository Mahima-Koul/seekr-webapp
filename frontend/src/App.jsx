import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Item from './pages/Item'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Item/:id" element={<Item />} />
      </Routes>
    </div>
  )
}

export default App
