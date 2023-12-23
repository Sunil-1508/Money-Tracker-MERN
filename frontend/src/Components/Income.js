import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import 'bootstrap'

function Income() {
const [Trandata,setTData] = useState([])
useEffect(()=>{
        axios.get('http://localhost:5001/transactions')
        .then(res=>{setTData(res.data)})
        .catch(err=>console.log(err));
},[])
  return (
    <div className="right-down row p-2 justify-content-around align-items-center h-75">
    <div className="col-md-5 h-100 rounded text-center">
      <div className="row h-100 justify-content-around me-1 rounded border align-items-center">
        <form >
        <div class="mb-3 row">
            <label for="title" class="col-sm-2 col-form-label">Title</label>
        <div class="col-sm-9 ms-3">
            <input type="text" class="form-control" id="title" placeholder='Enter Income Source Title' />
        </div>
        </div>
        <div class="mb-3 row">
            <label for="date" class="col-sm-2 col-form-label">Date</label>
        <div class="col-sm-9 ms-3">
            <input type="date" class="form-control" id="date" />
        </div>
        </div>
        <div class="mb-3 row">
            <label for="amount" class="col-sm-2 col-form-label">Amount</label>
        <div class="col-sm-9 ms-3">
            <input type="Number" class="form-control" id="amount" placeholder='Enter Amount' />
        </div>
        </div>
        <div class="mb-3  row">
            <label for="ref" class="col-sm-2 col-form-label">Reference</label>
        <div class="col-sm-9 ms-3">
            <textarea type="text" class="form-control" id="ref" placeholder='Enter Brief Reference' />
        </div>
        </div>
        <div className='ps-3'>
          <input type='submit' className='btn btn-success me-1' value='Add' /> 
          <button className='btn btn-warning ms-1' >Cancle</button>          
        </div>
        </form>
      </div>
    </div>
    <div className="col-md-7  border p-2 h-100 rounded">
    <div className="d-flex flex-column gap-2 h-100 rounded  text-center">
  <table className='table table-striped'>
      <thead>
          <tr>
          <th>S.No</th>
          <th>Title</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Type</th>
          <th>Reference</th>
          <th>Balance</th>
      
          </tr>
      </thead>
      <tbody>
          {
              Trandata.map((item,id) => (
                  <tr key={id}>
                      <td>{id+1}</td>
                      <td>{item.title}</td>
                      <td>{item.date}</td>
                      <td>{item.amount}</td>
                      <td>{item.type}</td>
                      <td>{item.ref}</td>
                      <td>1000</td>
                  </tr>
              ))
          }
      </tbody>
  </table>
  </div>
    </div>
    </div>
  )
}

export default Income
