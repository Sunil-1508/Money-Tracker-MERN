import React,{useState} from 'react'
import axios from 'axios'


function PostData(props) {

    const [data,setData] = useState({
        title:'',
        date:'',
        amount:'',
        type: props.type,
        ref:''
    })
    
    const submitHandeler =  (e)=>{ 
        e.preventDefault();
        console.log(data);
        axios.post('https://money-tracker-mern-kfd7.vercel.app/transactions',data)
        .then()
        .catch(error=>{
        console.error('Login failed:', error.response.data.error || 'Unknown error');
        window.alert('Invalid Credentials');
        })
}
return (
    <div className="row h-75 justify-content-around me-1 rounded border align-items-start pt-5">
        <h4 style={{color : 'skyblue'}} ><i>Add New {props.type}</i></h4>
        <form onSubmit={submitHandeler}>
        <div className="mb-3 row">
            <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
        <div className="col-sm-9 ms-3">
            <input type="text" className="form-control" id="title" placeholder='Ex: Salary, Shopping etc' 
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
            <input type="text" className="form-control" id="amount" placeholder='Ex: 200, 25.78 etc' 
            onChange={(e)=>setData({...data,amount:e.target.value })}/>
        </div>
        </div>
        <div className="mb-3  row">
            <label htmlFor="ref" className="col-sm-2 col-form-label">Reference</label>
        <div className="col-sm-9 ms-3">
            <input type="text" className="form-control" id="ref" placeholder='Ex: Rahul`s bityhday party etc'
            onChange={(e)=>setData({...data,ref:e.target.value })}/>
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
