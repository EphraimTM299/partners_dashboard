import React from 'react'
import { data } from '../data/data'
import{FaShoppingBag} from 'react-icons/fa'
import{BsPersonFill, BsThreeDotsVertical} from 'react-icons/bs'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { db } from '../firebase'






const orders = async () => {
    
      // 


    // Read items from database

    
  return (
    <Sidebar>
    <div className='bg-gray-100 min-h-screen'>
       <Header/>
        <div className='p-4'>
            
            <div className='w-full m-auto border rounded-lg bg-white overflow-y-auto'>
                <div className='my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
                    <span className='text-md'>Orders</span>
                    <span className='sm:text-left text-md text-right'>Status</span>
                    <span className='hidden text-md md:grid'>Last Order</span>
                    <span className='hidden text-md sm:grid'>Method</span>
                </div>

                <ul>
                    {data.map((order, id)=>(
                        <li key={id} className='bg-gray-50 text-sm hover:bg-gray100 rounded-lg my-3 p-2 grid  md:grid-cols-4 sm:grid-cols-3 items-center justify-between cursor-pointer'>
                            <div className='flex'>
                                <div className='bg-purple-100 p-3 rounded-lg'>
                                    <FaShoppingBag className='text-purple-800'/>
                                </div>
                                <div className='pl-4'>
                                    <p className='text-gray-800 font-bold'>R{order.total.toLocaleString()}</p>
                                    <p className='text-gray-800 text:sm'>{order.name.first}</p>
                                </div>
                            </div>
                            <p className='text-gray-600 sm:text-left text-right'>
                                <span className={
                                    order.status =='Processing'? 'bg-green-200 p-2 rounded-lg':order.status == 'Completed'? 'bg-blue-300 p-2 rounded-lg':'bg-yellow-200 p-2 rounded-lg100'
                                }
                                >{order.status}</span>
                            </p>
                            <p className='hidden md:flex'>{order.date}</p>
                            <div className='sm:flex hidden justify-between items-center'>
                                <p>{order.method} </p>
                                <BsThreeDotsVertical/>
                            </div>

                        </li>
                    ))}
                </ul>
            </div>

        </div>
    </div>
    </Sidebar>
  )
}

export default orders
