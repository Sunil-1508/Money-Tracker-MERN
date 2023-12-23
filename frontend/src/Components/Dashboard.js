import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import 'bootstrap'

function Dashboard() {
    const [Trandata,setTData] = useState([])
  useEffect(()=>{
        axios.get('http://localhost:5001/transactions')
        .then(res=>{setTData(res.data)})
        .catch(err=>console.log(err));
  },[])
  return (
    <div className="right-down row p-2 justify-content-around align-items-center h-75">
          <div className="col-md-4 h-100 rounded text-center">
            <div className="row h-50 justify-content-around align-items-center">
              <div className="col-md-5 border rounded h-50 text-warning fw-bold p-2">
                Total Income<h3 className='pt-4 text-success  fw-bold'>3000$</h3>
              </div>
              <div className="col-md-5 border rounded h-50 text-warning fw-bold p-2">
                Total Expenses<h3 className='pt-4 text-danger  fw-bold'>2000$</h3>
              </div>
            </div>
            <div className="row h-50 justify-content-center align-items-center">
              <div className="col-md-7 border rounded h-50 text-warning fw-bold p-2">
                Total Balance Left<h3 className='pt-4 text-primary  fw-bold'>1000$</h3>
              </div>
            </div>
          </div>
          <div className="col-md-8  border p-2 h-100 rounded">
          <div className="d-flex flex-column gap-2 h-100 rounded  text-center">
        <div className='d-flex justify-content-between pb-3'><h3>Recent Transactions</h3></div>
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

export default Dashboard
