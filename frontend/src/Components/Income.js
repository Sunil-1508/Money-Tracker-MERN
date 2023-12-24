import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import 'bootstrap'

function Income() {
const [Trandata,setTData] = useState([])
useEffect(()=>{
        axios.get('http://localhost:5001/transactions')
        .then(res=>{
            const sortedData = res.data.sort((a, b) => { return new Date(b.date) - new Date(a.date); });     
            setTData(sortedData)
        })
        .catch(err=>console.log(err));
},[])

const [data,setData] = useState({
    title:'',
    date:'',
    amount:'',
    type:'Income',
    ref:'Salary'
})

const [page,pageNav]=useState([0,8]);

const show = Trandata.filter(item => item.type === 'Income' ).length >= 8;

const submitHandeler =  (e)=>{ 
        e.preventDefault();
        console.log(data);
        axios.post('http://localhost:5001/transactions',data)
        .then(window.location.reload())
        .catch(error=>{
        console.error('Login failed:', error.response.data.error || 'Unknown error');
        window.alert('Invalid Credentials');
        })
}
  return (
    <div className="right-down row p-2 h-100">
    <div className="col-md-5 rounded text-center">
      <div className="row h-75 justify-content-around me-1 rounded border align-items-start pt-5">
        <h3><i>Add A New Income</i></h3>
        <form onSubmit={submitHandeler}>
        <div className="mb-3 row">
            <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
        <div className="col-sm-9 ms-3">
            <input type="text" className="form-control" id="title" placeholder='Enter Income Source Title' 
            onChange={(e)=>setData({...data,title:e.target.value })}/>
        </div>
        </div>
        <div className="mb-3 row">
            <label htmlFor="date" className="col-sm-2 col-form-label">Date</label>
        <div className="col-sm-9 ms-3">
            <input type="date" className="form-control" id="date" 
            onChange={(e)=>setData({...data,date:e.target.value })}/>
        </div>
        </div>
        <div className="mb-3 row">
            <label htmlFor="amount" className="col-sm-2 col-form-label">Amount</label>
        <div className="col-sm-9 ms-3">
            <input type="text" className="form-control" id="amount" placeholder='Enter Amount' 
            onChange={(e)=>setData({...data,amount:e.target.value })}/>
        </div>
        </div>
        <div className="mb-3  row">
            <label htmlFor="ref" className="col-sm-2 col-form-label">Reference</label>
        <div className="col-sm-9 ms-3">
            <select type="text" className="form-control" id="ref"  
            onChange={(e)=>setData({...data,ref:e.target.value })}>
                <option>Salary</option>
                <option>Part-Time</option>
                <option>FreeLancing</option>
                <option>Others</option>
            </select>
        </div>
        </div>
        <div className='ps-3'>
          <input type='submit' className='btn btn-success me-1' value='Add' /> 
          <button className='btn btn-warning ms-1' >Cancle</button>          
        </div>
        </form>
      </div>
      <div className="row h-25 justify-content-around align-items-center">
              <div className="col-md-5 border rounded text-warning fw-bold p-2 ">
                Total Income<h4 className='pt-1 text-success  fw-bold'>3000₹</h4>
              </div>
      </div>
    </div>
    <div className="col-md-7  border h-100 rounded">
    <div className="d-flex flex-column gap-2 h-75 rounded  text-center pt-2">
    <h3><i>Recent Incomes</i></h3>
    <table className='table table-striped' >
      <thead>
          <tr>
          <th>S.No</th>
          <th>Title</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Reference</th>
          <th>Balance</th>
      
          </tr>
      </thead>
      <tbody>
          {  
              Trandata.filter(item => item.type === 'Income').slice(page[0],page[1]).map((item,id) => (
                  <tr key={id}>
                      <td>{id+1}</td>
                      <td>{item.title}</td>
                      <td>{item.date}</td>
                      <td>{item.amount}₹</td>
                      <td>{item.ref}</td>
                      <td>1000</td>
                  </tr>
              ))
          }
      </tbody>
  </table>
  {show && <div className="row w-100 align-items-center justify-content-around p-0 ">
  <button className='col-md-2 btn btn-light p-0' onClick={()=>pageNav([page[0]-8,page[1]-8])} disabled={page[0] === 0} > Previous </button>
  <button className='col-md-2 btn btn-light p-0' onClick={()=>pageNav([page[0]+8,page[1]+8])} disabled={page[1] >= Trandata.length} > Next </button>
  </div>}
  </div>
  </div>
    </div>
  )
}

export default Income
