import React,{useState,useEffect} from 'react'
import axios from 'axios'
import 'bootstrap'

function Home() {
  const [data,setData] = useState([])
    useEffect(()=>{
        axios.get('/dashboard')
        .then(res=>{setData(res.data)})
        .catch(err=>console.log(err));
    },[])
  return (
    <dvi className="bg-secondary container-fluid row px-3 py-5 vh-100 w-100 m-0 gap-5">
      <div className="col-md-2 left rounded bg-dark vh-80  text-white p-5">
        <h5 >Hi, Sunil</h5>
        <div className="d-flex flex-column justify-content-between align-items-center h-100" >
          <div className="left-up d-flex flex-column gap-3  pt-4 rounded">
            <div className="btn btn-primary">Dashboard</div>
            <div className="btn btn-primary">All Transactions</div>
            <div className="btn btn-primary">Incomes</div>
            <div className="btn btn-primary">Expenses</div>
          </div>
          <div className='left-down'>
        <div className="btn btn-sm btn-info">logout</div>
        </div>
        </div>
      </div>
      <div className="col-md-9 right rounded bg-dark vh-80 text-white p-5">
        <h2>Your's Dashboard</h2>
        <div className="right-down row p-3 justify-content-around align-items-center h-100">
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
          <div className="col-md-7  border p-2 h-100 rounded">
          <div className="d-flex flex-column gap-2 h-100 rounded  text-center">
        <div className='d-flex justify-content-between pb-3'><h3>Recent Transactions</h3></div>
        <table className='table table-striped'>
            <thead>
                <tr>
                <th>No</th>
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
                    data.map((item,id) => (
                        <tr key={id}>
                            <td>{id+1}</td>
                            <td>{item.firstName}</td>
                            <td>{item.age}</td>
                            <td>{item.gender}</td>
                            <td>{item.phone}</td>
                            <td>{item.email}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </div>
          </div>
          </div>
        </div>
      </dvi>
  )
}

export default Home
