import React from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <div>
        {localStorage.getItem('username')}
        <Link to='/addTopic'>AddTopic</Link>
        
    </div>
  )
}

export default Dashboard