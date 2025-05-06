import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Admin from './pages/Admin';
import Student from './pages/Student';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/Student' element={<Student />} />
          <Route exact path='/Admin' element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App