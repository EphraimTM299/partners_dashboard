'use client';
import {FaShoppingBag}from 'react-icons/fa'
import React, { useState, useEffect } from 'react';
import {
  collection,
  //   querySnapshot,
  query,
  onSnapshot,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';

const RecentOrders = () => {
    const [items, setItems] = useState([
       
      ]);

    useEffect(() =>  {
        const q = query(collection(db, 'orders'));
           
        const queryRef = query(q, where('laundromat', '==', 'WashALot'));
        const unsubscribe = onSnapshot(queryRef, (querySnapshot) => {
          let itemsArr = [];
    
          querySnapshot.forEach((doc) => {
            itemsArr.push({ ...doc.data(), id: doc.id });
          });
          setItems(itemsArr);
                  
          return () => unsubscribe();
        });
      }, []);
  return (
    <div>
        <div className=' w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border bg-white rounded-lg bg white overflow-scroll'>
            <h1>Recent Orders</h1>
            <ul>
                {items.map((item, id)=>(
                    <li key={id} className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer'>
                        <div className='bg-purple-100 rounded-lg p-3'>
                            <FaShoppingBag className='text-purple-800'/>
                        </div>
                        <div  className='pl-4'>
                            <p className='text-gray-800 font-bold'>R {item.orderAmount.toFixed(2)}</p>
                             <p className='text-gray-400 text-sm'>{item.userName}</p>
                        </div>
                        <p className='lg:flex md:hidden absolute right-6 text-sm'>{item.orderStatus}</p>
                    </li>
                ))}
            </ul>
        </div>
      
    </div>
  )
}

export default RecentOrders
