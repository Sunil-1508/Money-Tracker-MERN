import React,{useState,useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import 'bootstrap'
import Dashboard from './Dashboard'
import Transactions from './Transactions'
import Income from './Income'
import Expenses from './Expenses'

function Home() {

  const [heading, setheading] = useState("Dashboard");

const [logindata,setLoginData] = useState({
    username: ''
  })
  const {id} = useParams();
  useEffect(()=>{
        axios.get('http://localhost:5001/getdata/'+id)
        .then(
          res=>{setLoginData(res.data); }
          )
        .catch(err=>console.log(err));
  },[id])
  
  const navigate = useNavigate();
  const handleLogout = ()=> {
    navigate('/')
  }

  return (
    <dvi className="bg-secondary container-fluid row px-3 py-5 vh-100 w-100 m-0 gap-5">
      <div className="col-md-2 left rounded bg-dark vh-80  text-white p-5">
        <h5 >Hi, {logindata.username} </h5>
        <div className="d-flex flex-column justify-content-between align-items-center h-100" >
          <div className="left-up d-flex flex-column gap-3  pt-4 rounded">
            <div className="btn btn-primary" onClick={ ()=> {setheading("Dashboard")}}>Dashboard</div>
            <div className="btn btn-primary" onClick={ ()=> {setheading("Transactions")}}>All Transactions</div>
            <div className="btn btn-primary" onClick={ ()=> {setheading("Incomes")}}>Incomes</div>
            <div className="btn btn-primary" onClick={ ()=> {setheading("Expenses")}}>Expenses</div>
          </div>
          <div className='left-down'>
        <div className="btn btn-sm btn-info" onClick={handleLogout}>logout</div>
        </div>
        </div>
      </div>
      <div className="col-md-9 right rounded bg-dark vh-80 text-white p-5">
        <h2 className='pb-5'>Your {heading} </h2>
        {heading==='Dashboard' && <Dashboard />}
        {heading==='Transactions' && <Transactions />}
        {heading==='Incomes' && <Income />}
        {heading==='Expenses' && <Expenses />}
        </div>
      </dvi>
  )
}

export default Home
