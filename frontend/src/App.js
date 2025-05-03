import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Admin from './pages/Admin';
import Student from './pages/Student';

function App() {
  return (
    <div style={{width:'100vw', height:'100vh'}}>
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