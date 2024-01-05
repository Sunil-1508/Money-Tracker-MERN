import React,{useState,useEffect} from 'react'
import axios from 'axios'
import 'bootstrap'
import Update from './Update.js'
import PostData from './PostData.js'

function Income() {
const [Trandata,setTData] = useState([])
const [Tincome, setTIncome] = useState(0);
const [inc,setInc] = useState(0);
const [decide, setDecide] = useState(0);
const [currId, setCurr] = useState(0);

useEffect(()=>{
        axios.get('http://localhost:5001/transactions')
        .then(res=>{
            const sortedData = res.data.sort((a, b) => { return new Date(b.date) - new Date(a.date); });     
            setTData(sortedData);

            let Tinc = 0;
            sortedData.forEach( item => { if(item.type=== 'Income'){ Tinc += item.amount; }});
            setTIncome(Math.round(Tinc*1000)/1000);
        })
        .catch(err=>console.log(err));
},[])



const [page,pageNav]=useState([0,8]);
const maxlen = Trandata.filter(item => item.type === 'Income' ).length;
const show = maxlen >= 8;

const deleteHandler = (id)=> {

    console.log("Delete item with id " + id);

    axios.delete('http://localhost:5001/transactions/'+id)
    .then(response => {
      console.log("Item deleted successfully");
      window.location.reload();
    })
    .catch(error => {
      console.error("Error deleting item:", error.response.data.error || 'Unknown error');
    });


}
  return (
    <div className="right-down row p-2 " style={{height : '93%'}}>
    <div className="col-md-5 rounded text-center">
      {decide === 0 && <PostData />}
      {decide === 1 && <Update id={currId}/>}
      <div className="row h-25 justify-content-around align-items-center">
              <div className="col-md-5 border rounded text-warning fw-bold p-2 ">
                Total Income<h4 className='pt-1 text-success  fw-bold'>{Tincome} ₹</h4>
              </div>
      </div>
    </div>
    <div className="col-md-7  border h-100 rounded">
    <div className="d-flex flex-column gap-2 h-75 rounded  text-center pt-2">
    <h4 style={{color : 'skyblue'}} ><i>Recent Incomes</i></h4>
    <table className='table table-striped' >
      <thead>
          <tr>
          <th>S.No</th>
          <th>Title</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Reference</th>
          <th>Edit/Delete</th>
          </tr>
      </thead>
      <tbody>
          {  
              Trandata.filter(item => item.type === 'Income').slice(page[0],page[1]).map((item,id) => (
                  <tr key={id}>
                      <td>{id+1+inc}</td>
                      <td>{item.title}</td>
                      <td>{item.date}</td>
                      <td style={{'color': 'green', fontWeight : 'bold'}} >{item.amount}₹</td>
                      <td>{item.ref}</td>
                      <td><button className='btn btn-warning btn-sm me-2' onClick={()=> {setDecide(1); setCurr(item._id)}}><b><i class="bi bi-arrow-repeat"></i></b></button>
                          <button className='btn btn-danger btn-sm' onClick={()=> {deleteHandler(item._id)}}><i class="bi bi-trash"></i></button>
                      </td>
                  </tr>
              ))
          }
      </tbody>
  </table>
  {show && <div className="row w-100 align-items-center justify-content-around p-0 ">
    <button className='col-md-2 btn btn-light p-0' onClick={()=>{ pageNav([page[0]-8,page[1]-8]); setInc(inc-8); }} disabled={page[0] === 0} ><i class="bi bi-arrow-left-short"></i> Previous </button>
    <button className='col-md-2 btn btn-light p-0' onClick={()=>{ pageNav([page[0]+8,page[1]+8]); setInc(inc+8); }} disabled={page[1] >= Trandata.filter(item => item.type === 'Income').length} > Next <i class="bi bi-arrow-right-short"></i> </button>
  </div>}
  </div>
  </div>
    </div>
  )
}

export default Income
