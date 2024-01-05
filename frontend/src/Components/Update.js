import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Update(props) {
  const id = props.id;

  const [data, setData] = useState({
    title: '',
    date: '',
    amount: '',
    ref: '',
    type: 'Income'
  });

  useEffect(() => {
    axios.get(`http://localhost:5001/transactions/${id}`)
      .then(response => {
        const { title, date, amount, ref } = response.data;
        console.log(response.data); // Check the data received from the server
        setData({
          title: title || '',
          date: date || '',
          amount: amount || '',
          ref: ref || '',
          type: 'Income'
        });
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('Submit Data:', data); // Check the data being sent to the server
    axios.put(`http://localhost:5001/transactions/${id}`, data)
      .then(() => window.location.reload())
      .catch(error => {
        console.error('Update failed:', error.response.data.error || 'Unknown error');
        window.alert('Update failed');
      });
  };

  return (
    <div className="row h-75 justify-content-around me-1 rounded border align-items-start pt-5">
      <h4 style={{ color: 'skyblue' }}><i>Update Income</i></h4>
      <form onSubmit={submitHandler}>
        <div className="mb-3 row">
          <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
          <div className="col-sm-9 ms-3">
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter Title"
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
              placeholder="Enter Amount"
              name="amount"
              value={data.amount}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="ref" className="col-sm-2 col-form-label">Reference</label>
          <div className="col-sm-9 ms-3">
            <select
              type="text"
              className="form-control"
              id="ref"
              value={data.ref}
              onChange={handleChange}
            >
              <option value="Salary">Salary</option>
              <option value="Part-Time">Part-Time</option>
              <option value="FreeLancing">FreeLancing</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>
        <div className='ps-3'>
          <input type='submit' className='btn btn-success me-1' value='Update' />
          <input type='reset' className='btn btn-secondary ms-1' value='Clear' />
        </div>
      </form>
    </div>
  );
}

export default Update;
