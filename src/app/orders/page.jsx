'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar'
import moment from 'moment';
import {RxPerson} from 'react-icons/rx'

import {
  collection,
  updateDoc,
  orderBy,
  query,
  onSnapshot,
  where,
  doc,
} from 'firebase/firestore';
import { db } from '../firebase';
import DefaultModal from '../components/modal';




function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const Orders =  () => {
  const [ items, setItems] = useState([
    
  ]);

  // Read items from the database
  useEffect(() =>  {
    const q = query(collection(db, 'orders'));
    // const q = db.collection('laundromat');

    const queryRef = query(q, where('laundromat', '==', 'WashALot' ), orderBy("pickup"));
    const unsubscribe = onSnapshot(queryRef, (querySnapshot) => {
      let itemsArr = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);
      console.log(itemsArr)
      
     
      return () => unsubscribe();
    });
  }, []);

  // Delete items from database
  const updateOrder = async (orderId, orderStatus) => {
    
    const order = doc(db, "orders", orderId);

   

    try {
      await updateDoc(order,{
        orderStatus
      });
      
    } catch (error) {
      alert(error)
      
    }
    
  };

  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
    
  return (
    <Sidebar>
    
    <div className='bg-gray-100 min-h-screen'>
    <div className='flex justify-between px-6 pt-4'>
    <h2 className='text-xl font-semibold'>Active Orders</h2>
     
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
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Due Date</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Order Type</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Contents</th>
      </tr>
    </thead>
    {items.map((item, index)=>
    
   
    <tbody key={index} class="divide-y divide-gray-100 border-t border-gray-100">
      
      <tr class="hover:bg-gray-50"  >
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
          
            <select  onChange={(e)=>{
              updateOrder(item.orderId, e.target.value)

            }} className=' border border-blue-50 text-gray-900 text-sm rounded-lg focus:ring-0 focus:ring-offset-00 block w-3/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ' name="" id="">
                <option value="Placed">{item.orderStatus}</option>
                <option value="Picked Up">Picked Up</option>
                <option value="Processing">Processing</option>
                <option value="Done Processing">Done Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Complete">Complete</option>
            </select>
               
          
        </td>
        <td class="px-6 py-4">R {(item.orderAmount.toFixed(2) - item.deliveryFee.toFixed(2)).toFixed(2)}</td>
        <td class="px-6 py-4">
          
          {moment.unix(`${item.delivery}`).format("DD/MM/YYYY")}
        </td>
        <td class="px-6 py-4">
          {item.laundromat}
        </td>

        <td class="px-6 py-4">
          
        

          <DefaultModal number = {item.orderNumber}
          
          count = {

            item.cartItems.map((cartItem, i) => (
           
            <>
               
              <div className=' flex items-center justify-center'>
              <a href="#"  class="block max-w-sm p-6 bg-white border w-1/2 border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{cartItem.productName}</h5>
                  <p class="font-normal text-l text-black dark:text-gray-400">Service: <span className='font-semibold'> { cartItem.service.name }</span></p>
                  <p class="font-normal text-l text-black dark:text-gray-400">Qty: <span className='font-semibold'> { cartItem.itemCount }</span></p>
                  
                
              </a>


              </div>
             
              <br /></>
          ))
            
            } />
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
