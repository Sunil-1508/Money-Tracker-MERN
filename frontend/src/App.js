import {BrowserRouter , Routes, Route } from 'react-router-dom'
import './App.css';
import Register from './Components/Register.js'
import Login from './Components/Login.js'
import Home from './Components/Home.js'
import Update from './Components/Update.js'
import "bootstrap-icons/font/bootstrap-icons.css";


function App() {
  return (
    <>
    <div className="app-content">
      {<BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />}/>
          <Route path='/home/:id' element={<Home />}/>
          <Route path='/update/:id' element={<Update />}/>
        </Routes>
      </BrowserRouter>}
    </div>
    <div className="unsupported-message d-flex flex justify-content-center align-items-center">
      <h2 style={{display:'none', color:'red'}}>This Application is Not Compatible with Current Screen Size. Please use a Laptop or Higher Screen Size.</h2>
    </div>
      
    </>

    
    
  );
}

export default App;
