import React from 'react'
import CreateOptions from './_components/CreateOptions'
import LatestInterviewList from './_components/LatestInterviewList'

const Dashboard = () => {
  return (
    <div className='mt-5'>
        <h2 className='text-xl font-bold'>Dashboard</h2>
        <CreateOptions/>
        <LatestInterviewList/>
    </div>
  )
}

export default Dashboard