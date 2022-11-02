import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {


  const [topicList, setTopicList] = useState([])


  useEffect(() => {
    (async () => {
        const res = await fetch(`http://localhost:8000/topics`)
        const data = await res.json()
        console.log(data);
        setTopicList(data.topics)
        console.log('Topics', topicList[0].topicName, topicList[0].percentage);
    })()
  }, [])


  return (
    <div>
        {localStorage.getItem('username')}
        <Link to='/addTopic'>AddTopic</Link>

        {topicList && topicList.length > 0 
        ? topicList.map(i => <li>{i.topicName} {i.percentage}</li>)
        : "No data"}

       
        
    </div>
  )
}

export default Dashboard