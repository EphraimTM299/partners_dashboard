'use client';

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {RxSketchLogo, RxDashboard, RxPerson} from 'react-icons/rx'
import {BiCartAdd} from 'react-icons/bi'
import { signOut, useSession } from 'next-auth/react';

import { FiSettings } from 'react-icons/fi'
import {HiOutlineShoppingBag, HiOutlineLogout} from 'react-icons/hi'

const Sidebar = ({children}) => {
  return (
    <div className='flex'>
        <div className='fixed w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between'>
            <div className='flex flex-col items-center'>
                <Link href='/dashboard'>
                    <div className='bg-blue-500 p-3 rounded-lg inline-block text-white'>
                        <RxDashboard size={20}/>
                    </div>
                   
                </Link>
                <span className='border-b-[1px] border-gray-200 w-full p-2'></span>

                <Link href="/create-order">
                <div className='bg-gray-100 px-4 p-4 cursor-pointer my-4 hover:bg-gray-200  inline-block rounded-lg'>
                    <BiCartAdd size={20}/>
                    </div>

                    <div>
                        <p className='text-xs px-2 font-semibold'> New Order</p>
                    </div>
                </Link>
                <span className='border-b-[1px] border-gray-200 w-full p-2'></span>


                <Link href="/orders">
                <div className='bg-gray-100 px-4 p-4 cursor-pointer my-4 hover:bg-gray-200  inline-block rounded-lg'>
                    <HiOutlineShoppingBag size={20}/>
                    </div>

                    <div>
                        <p className='text-xs px-2 font-semibold'> Active Orders</p>
                    </div>
                </Link>
                <span className='border-b-[1px] border-gray-200 w-full p-2'></span>
                <Link href="/history">
                <div className='bg-gray-100 px-4 p-4 cursor-pointer my-4 hover:bg-gray-200  inline-block rounded-lg'>
                    <RxPerson size={20}/>
                    </div>

                    <div>
                    <p className='text-xs px-2 font-semibold'>Metrics</p>
                    </div>
                </Link>
                <span className='border-b-[1px] border-gray-200 w-full p-2'></span>
                <Link href="/banking">
                <div className='bg-gray-100 px-4 p-4 cursor-pointer my-4 hover:bg-gray-200  inline-block rounded-lg'>
                    <FiSettings size={20}/>
                    </div>
                    
                    <div>
                        <p className='text-xs px-2 font-semibold'>Banking</p>
                    </div>
                </Link>
                <span className='border-b-[1px] border-gray-200 w-full p-2'></span>
                <Link  onClick={() => signOut( {callbackUrl:"/"})} href="">
                <div className='bg-gray-100 px-4 p-4 cursor-pointer my-4 hover:bg-gray-200  inline-block rounded-lg'>
                    <HiOutlineLogout size={20}/>
                    </div>
                    
                    <div>
                        <p className='text-xs px-2 font-semibold'>LogOut</p>
                    </div>
                </Link>
                <span className='border-b-[1px] border-gray-200 w-full p-2'></span>
            </div>


        </div>
      <main className='ml-20 w-full'>{children}</main>
    </div>
  )
}

export default Sidebar
