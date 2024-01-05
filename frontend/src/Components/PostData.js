import React,{useState,useEffect} from 'react'
import axios from 'axios'
import 'bootstrap'

function PostData() {

    const [data,setData] = useState({
        title:'',
        date:'',
        amount:'',
        type:'Income',
        ref:'Salary'
    })
    
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
    <div className="row h-75 justify-content-around me-1 rounded border align-items-start pt-5">
        <h4 style={{color : 'skyblue'}} ><i>Add New Income</i></h4>
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
          <input type='submit'className='btn btn-success me-1' value='Add' /> 
          <input type='reset' className='btn btn-secondary ms-1' value='Clear' />           
        </div>
        </form>
      </div>
  )
}

export default PostData
