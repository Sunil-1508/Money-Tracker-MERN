import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import 'bootstrap'

function Dashboard() {
    const [Trandata,setTData] = useState([])
  useEffect(()=>{
        axios.get('http://localhost:5001/transactions')
        .then(res=>{
          const sortedData = res.data.sort((a, b) => { return new Date(b.date) - new Date(a.date); });     
          setTData(sortedData)
      })
        .catch(err=>console.log(err));
  },[])
  return (
    <div className="right-down row pb-2 justify-content-around align-items-center h-100">
          <div className="col-md-4 h-100 rounded text-center">
            <div className="row h-50 justify-content-around align-items-center">
              <div className="col-md-5 border rounded h-50 text-warning fw-bold pt-4">
                Total Income<h4 className='p-1 pt-3 text-success  fw-bold'>3000₹</h4>
              </div>
              <div className="col-md-5 border rounded h-50 text-warning fw-bold pt-4">
                Total Expenses<h4 className='p-1 pt-3 text-danger  fw-bold'>2000₹</h4>
              </div>
            </div>
            <div className="row h-50 justify-content-center align-items-center">
              <div className="col-md-7 border rounded h-50 text-warning fw-bold pt-4">
                Total Balance Left<h3 className='p-2 pt-3 text-primary  fw-bold'>100000 ₹</h3>
              </div>
            </div>
          </div>
          <div className="col-md-8  border pt-2 h-100 rounded">
          <div className="d-flex flex-column justify-content-evenly h-100 rounded  text-center">
        <div><h3>Recent Transactions</h3></div>
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
                    Trandata.slice(0, 9).map((item,id) => (
                        <tr key={id}>
                            <td>{id+1}</td>
                            <td>{item.title}</td>
                            <td>{item.date}</td>
                            <td style={{color: (item.type==='Expense')?'red':'green', fontWeight : 'bold'}} >{item.amount}₹</td>
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
