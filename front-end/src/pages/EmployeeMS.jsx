import React, { use } from 'react'
import { useState,useEffect } from 'react';

const EmployeeMS = () => {

    const [getData, setData] = useState([]);

    useEffect(() => {
        const fetchData = async()=>{
            try {
                const response = await fetch("http://localhost:8080/employees/");
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchData();
    },[])

    console.log(getData);

  return (
    <div>
        <div>
            {getData?.map((employee,index)=>(
                <div key={index} className="employee-card">
                    <h2>{employee.first_name} {employee.last_name}</h2>
                    <p>{employee.job_title}</p>
                    <p>{employee.email}</p>
                    <p>{employee.phone}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default EmployeeMS