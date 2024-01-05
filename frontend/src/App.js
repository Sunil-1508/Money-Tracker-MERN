import {BrowserRouter , Routes, Route } from 'react-router-dom'
import './App.css';
import Register from './Components/Register.js'
import Login from './Components/Login.js'
import Home from './Components/Home.js'
import Update from './Components/Update.js'
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />}/>
        <Route path='/home/:id' element={<Home />}/>
        <Route path='/update/:id' element={<Update />}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
