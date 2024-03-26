import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Update(props) {
  const id = props.id;

  const [data, setData] = useState({
    title: '',
    date: '',
    amount: '',
    type: props.type,
    ref: ''
  });

  useEffect(() => {
    axios.get(`https://money-tracker-mern-kfd7.vercel.app/transactions/${id}`)
      .then(response => {
        const { title, date, amount, ref } = response.data;
        console.log(response.data); // Check the data received from the server
        setData({
          title: title || '',
          date: date || '',
          amount: amount || '',
          type: props.type,
          ref: ref || ''
        });
      })
      .catch(err => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('Submit Data:', data); 
    axios.put(`https://money-tracker-mern-kfd7.vercel.app/transactions/${id}`, data)
      .then()
      .catch(error => {
        console.error('Update failed:', error.response.data.error || 'Unknown error');
        window.alert('Update failed');
      });
  };

  const resetHandler = () =>{
    props.resetDecide();
  }

  return (
    <div className="row h-75 justify-content-around me-1 rounded border align-items-start pt-5">
      <h4 style={{ color: 'skyblue' }}><i>Update {props.type}</i></h4>
      <form onSubmit={submitHandler} onReset={resetHandler}>
        <div className="mb-3 row">
          <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
          <div className="col-sm-9 ms-3">
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Ex: Salary, Shopping etc"
              name="title"
              value={data.title}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="date" className="col-sm-2 col-form-label">Date</label>
          <div className="col-sm-9 ms-3">
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
              value={data.date}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="amount" className="col-sm-2 col-form-label">Amount</label>
          <div className="col-sm-9 ms-3">
            <input
              type="text"
              className="form-control"
              id="amount"
              placeholder="Ex: 200, 25.78 etc"
              name="amount"
              value={data.amount}
              onInput={handleChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="ref" className="col-sm-2 col-form-label">Reference</label>
          <div className="col-sm-9 ms-3">
            <input
              type="text"
              className="form-control"
              id="ref"
              placeholder="Ex: Rahul`s bityhday party etc"
              name="ref"
              value={data.ref}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='ps-3'>
          <input type='submit' className='btn btn-success me-1' value='Update' />
          <input type='reset' className='btn btn-secondary ms-1' value='Cancle' />
        </div>
      </form>
    </div>
  );
}

export default Update;
