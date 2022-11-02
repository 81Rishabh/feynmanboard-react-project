import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


function LandingPage() {


    const [userName, setUserName] = useState();
    let navigate = useNavigate()

    const onHandleEvent = (event) => {
        setUserName(event.target.value)
    }

    const onSubmit =() =>{
        localStorage.setItem('username', userName);
        navigate('/dashboard')
    }

  return (
    <div>

    
        <input
         type= 'text'
         placeholder='Enter your name...'
         name='user_name'
         onChange={(e) => onHandleEvent(e)} />


        <button onClick={() => onSubmit()}>Enter</button>

    </div>
  )
}

export default LandingPage