import React,{ useState, useEffect } from 'react';
import './App.css';
import ReactTable from "react-table";
import "react-table/react-table.css";  

import axios from 'axios';

function App() {

  const [data , setData] = useState([]);
  const [total , setTotal] = useState([]);

  useEffect(() => { 
    axios.get(`http://localhost:8080/api/rewards`)
    .then(res => {
      setData(res.data);
    });

    axios.get(`http://localhost:8080/api/rewards/total-rewards`)
    .then(res => {
      console.log(res.data);
      setTotal(res.data);
    });
  },[]);

  const columns = [
    {
      Header:'Customer',
      accessor: 'custname',
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },    
    {
      Header:'Total Amount',
      accessor: 'amountspent',
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
      Header: "Month",
      accessor: 'transdate',
      Cell: row => <div style={{ textAlign: "center" }}>{new Intl.DateTimeFormat('en-US').format(new Date(row.value))}</div>
    },
    {
      Header:'Reward Points',
      accessor: 'rewardPoints',
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    }
  ];

  const totalsByColumns = [
    {
      Header:'Customer',
      accessor: 'custname'      
    },    
    {
      Header:'Points',
      accessor: 'total'
    }
  ];

  return (
    <div className="container" style={{width: '50%'}}> 
    <div className="row">
    <div className="col-10">
      <h2>Customer Rewards By Transaction</h2>
    </div>
  </div>
    <div className="row">
    <div className="col-8">          
    <ReactTable  
        data={data}  
        columns={columns} 
        defaultPageSize={5}
      />  
      </div>
      </div>

      <div className="row">
    <div className="col-10">
      <h2>Total Rewards By Customer</h2>
    </div>
  </div>
    <div className="row">
    <div className="col-8">          
    <ReactTable  
        data={total}  
        columns={totalsByColumns} 
        defaultPageSize={3}
      />  
      </div>
      </div>
      </div>        
  );
}


export default App;
