import React from 'react'
import { Button } from './Button'
import { useNavigate } from 'react-router'

function Logout() {
  const navigate = useNavigate(); // Call useNavigate at the top

  return (
    <div className=''>
      <div>
        <button onClick={() => {
            localStorage.removeItem("token");
            navigate("/signin"); 
          }} 
        >LOGOUT</button>
      </div>
    </div>
  )
}

export default Logout;
