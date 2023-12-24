import React,{useState,useEffect} from 'react'
import axios from 'axios'
import 'bootstrap'

function Transactions() {
    const [Trandata,setTData] = useState([])
  useEffect(()=>{
        axios.get('http://localhost:5001/transactions')
        .then(res=>{
            const sortedData = res.data.sort((a, b) => { return new Date(b.date) - new Date(a.date); });     
            setTData(sortedData)
        })
        .catch(err=>console.log(err));
  },[])

  const [page,pageNav]=useState([0,9]);
  const show = Trandata.length > 9;


  return (
    <div className="h-100 pb-2">
    <div className="col-md-12 h-100 border px-2 pt-2 rounded ">
        <div className="d-flex flex-column gap-2  rounded  text-center" >
        <table className='table table-striped '>
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
                    Trandata.slice(page[0],page[1]).map((item,id) => (
                        <tr key={id}>
                            <td >{id+1}</td>
                            <td >{item.title}</td>
                            <td >{item.date}</td>
                            <td style={{'color': (item.type==='Expense')?'red':'green', fontWeight : 'bold'}} >{item.amount}₹</td>
                            <td >{item.type}</td>
                            <td >{item.ref}</td>
                            <td >1000</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        {show && <div className="row w-100 align-items-center justify-content-around pb-3 ">
            <button className='col-md-2 btn btn-light p-0' onClick={()=>pageNav([page[0]-9,page[1]-9])} disabled={page[0] === 0} > Previous </button>
            <button className='col-md-2 btn btn-light p-0' onClick={()=>pageNav([page[0]+9,page[1]+9])} disabled={page[1] >= Trandata.length} > Next </button>
        </div>}
        </div>
        </div>
    </div>
  )
}

export default Transactions
