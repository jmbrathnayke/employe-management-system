import React from 'react'
import EmployeePage from './pages/EmployeePage'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import EmployeeManagementApp from './components/EmployeeManagementApp'
import EmployeeMS from './pages/EmployeeMS'


const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<EmployeePage/>}/>
        {/* <Route path='/' element={<EmployeeMS/>}/> */}
        <Route path='/add' element={<EmployeeManagementApp/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App