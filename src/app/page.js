import QuizListing from '@/components/Quiz'
import useFetchData from '@/hooks/useFetchData'
import React from 'react'

const page = () => {
  const{refineData}=useFetchData()
  console.log(refineData)
  return (
    <div className='min-h-screen'>
      <QuizListing/>
    </div>
  )
}

export default page