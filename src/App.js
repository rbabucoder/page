import React, {useState, useEffect} from "react";
import "./App.css";
import axios from "axios";

const App =() =>{
 const [num , setNum] = useState(null);
 const [list , setList] = useState({
   users: null,
    total: null,
    per_page: null,
    current_page: null
 });
 

let users, renderPageNumbers;

    if (list.users !== null) {
      users = list.users.map(user => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.first_name}</td>
          <td>{user.last_name}</td>
        </tr>
      )); 
    }



  useEffect( () => {
    
    

const fetchApi = async () =>{

const response = await axios.get(`https://reqres.in/api/users?page=${num}`);
      const data = await response.data;
      setList({
        users: data.data,
      total: data.total,
      per_page: data.per_page,
      current_page: data.page,
      });
};
fetchApi(1);
  
  },[]);
  
      
  
  const pageNumbers = [];
    if (list.total !== null) {
      for (let i = 1; i <= Math.ceil(list.total / list.per_page); i++) {
        pageNumbers.push(i);
      }
  
  renderPageNumbers = pageNumbers.map(number => {
        let classes = list.current_page === number;

        return (
<span key={num} onClick={() => setNum(num)}>{num}</span>
        );
      });
    }

  
  return (
<>
  <h1>Hello</h1>
  


<table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {users}
          </tbody>
        </table>
        
<div>
  <span onClick={() => setNum(1)}>&laquo;</span>
          {renderPageNumbers}
 <span onClick={() => setNum(2)}>&raquo;</span>
        

      </div>
        

</>
    );
}

export default App;