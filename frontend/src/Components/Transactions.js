import React,{useState,useEffect} from 'react'
import axios from 'axios'
import 'bootstrap'

function Transactions() {
    const [Trandata,setTData] = useState([])
  useEffect(()=>{
        axios.get('http://localhost:5001/transactions')
        .then(res=>{setTData(res.data)})
        .catch(err=>console.log(err));
  },[])
  return (
    <div className="col-md-12  border p-3 h-75 rounded">
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
  )
}

export default Transactions