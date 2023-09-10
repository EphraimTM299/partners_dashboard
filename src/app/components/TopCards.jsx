import React from 'react'

const TopCards = () => {
  return (
    <div className='grid lg:grid-cols-8 gap-4 p-4'>
      <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
        <div className='flex flex-col w-full pb-4'>
            <p className='tex-2xl font-bold'>R 7,505.86</p>
            <p className='text-gray-600'>Onsite Orders</p>
        </div>
        <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
            <span className='text-green-700 text-lg'>
                +18%
            </span>
        </p>
      </div>
      <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
        <div className='flex flex-col w-full pb-4'>
            <p className='tex-2xl font-bold'>R 7,505.86</p>
            <p className='text-gray-600'>Online Orders</p>
        </div>
        <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
            <span className='text-green-700 text-lg'>
                +18%
            </span>
        </p>
      </div>
      <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
        <div className='flex flex-col w-full pb-4'>
            <p className='tex-2xl font-bold'>R 1,434,505.98</p>
            <p className='text-gray-600'>YTD Revenue</p>
        </div>
        <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
            <span className='text-green-700 text-lg'>
                +18%
            </span>
        </p>
      </div>
      <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
        <div className='flex flex-col w-full pb-4'>
            <p className='tex-2xl font-bold'>R 1,434,505.98</p>
            <p className='text-gray-600'>YTD Revenue</p>
        </div>
        <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
            <span className='text-green-700 text-lg'>
                +18%
            </span>
        </p>
      </div>
      
    </div>
  )
}

export default TopCards
