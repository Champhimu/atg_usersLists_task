import React from 'react'
import {BiError} from 'react-icons/bi'

const Error = () => {
  return (
    <>
    <div className='d-flex align-items-center justify-content-center pt-5'>
      <BiError fontSize={"3em"}/>
    </div>
      <h5 className='text-center pt-1'>Error, no data to show</h5>
      <p className='text-center'>Something went wrong! Please refresh or reopen tab agin</p>
    </>
  )
}

export default Error
