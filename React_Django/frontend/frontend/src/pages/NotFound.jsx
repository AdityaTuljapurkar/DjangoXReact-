import React from 'react'
import '../style/style.css'

function NotFound() {
  return (
    <>
      <div className='h-screen bg-[#414141]'>
        <div className=" text-white flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl font-bold">404-error</h1>
          <h2 className="text-lg">PAGE NOT FOUND</h2>
        </div>
      </div>

    </>
  )
}

export default NotFound
