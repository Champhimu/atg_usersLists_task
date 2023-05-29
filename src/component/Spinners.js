import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

const Spinners = () => {
  return (
    <>
    <div className='d-flex align-items-denter justify-content-center pt-5'>
      <Spinner animation="border" role="status" size="lg">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
      <p className='text-center'>Loading User List... Please Wait !</p>
    </>
  )
}

export default Spinners
