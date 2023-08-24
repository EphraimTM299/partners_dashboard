'use client';

import React, { useState, useEffect } from 'react';
import { data } from '../data/data'
import{FaShoppingBag} from 'react-icons/fa'
import{BsPersonFill, BsThreeDotsVertical} from 'react-icons/bs'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import moment from 'moment';
import {RxSketchLogo, RxDashboard, RxPerson} from 'react-icons/rx'

import {
  collection,
  addDoc,
  getDoc,
//   querySnapshot,
  query,
  onSnapshot,
  deleteDoc,
  where,
  doc,
} from 'firebase/firestore';
import { db } from '../firebase';


const Orders =  () => {
  const [ items, setItems] = useState([
    // { name: 'Coffee', price: 4.95 },
    // { name: 'Movie', price: 24.95 },
    // { name: 'candy', price: 7.95 },
  ]);

  // Read items from database
  useEffect(() =>  {
    const q = query(collection(db, 'orders'));
    // const q = db.collection('laundromat');

    const queryRef = query(q, where('laundromat', '==', 'WashALot'));
    const unsubscribe = onSnapshot(queryRef, (querySnapshot) => {
      let itemsArr = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);
      // console.log(itemsArr[0].pickup)


      // Read total from itemsArr
     
      return () => unsubscribe();
    });
  }, []);

  // Delete items from database
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'items', id));
  };
    
  return (
    <Sidebar>
    
    <div className='bg-gray-100 min-h-screen'>
    <div className='flex justify-between px-6 pt-4'>
     <h2>Orders</h2>
     
      <h2>Welcome Back, Tom</h2>
    </div>

<div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
  <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
    <thead class="bg-gray-50">
      <tr>
      <th scope="col" class="px-6 py-4 font-medium text-gray-900">Order Number</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Client Name</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Order Status</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900"> Order Value</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Delivery Status</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Laundromat</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
      </tr>
    </thead>
    {items.map((item, index)=>
    
   
    <tbody key={index} class="divide-y divide-gray-100 border-t border-gray-100">
      
      <tr class="hover:bg-gray-50">
      <td class="px-6 py-4">{item.orderNumber}</td>
        <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
          <div class="relative py-2">
          <RxPerson size={20}/>
            
          </div>
          <div class="text-sm">
            <div class="font-medium text-gray-700">{item.userName}</div>
            <div class="text-gray-400">{item.orderNumber}</div>
          </div>
        </th>
        <td class="px-6 py-4">
          <span
            class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
            {item.orderStatus}
          </span>
        </td>
        <td class="px-6 py-4">R {item.orderAmount.toFixed(2)}</td>
        <td class="px-6 py-4">
          {item.deliveryStatus}
        </td>
        <td class="px-6 py-4">
          {item.laundromat}
        </td>
      </tr>
     
    </tbody>
     )}
  </table>
</div>
       
    </div>
    
    </Sidebar>
  )
}

export default Orders
