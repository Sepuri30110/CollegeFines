import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Admin from './pages/Admin';
import Student from './pages/Student';

import PrivatePath from './PrivatePath';

import NewFineEntry from './pages/NewFineEntry';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/Student' element={<Student />} />
          <Route element={<PrivatePath />}>
            <Route exact path='/Admin' element={<Admin />} />
            <Route exact path='/Admin/NewFineEntry' element={<NewFineEntry />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App