'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar'
import {RxPerson} from 'react-icons/rx'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Chart as ChartJS, 
         ArcElement,
        Tooltip,
        LineElement, 
        LinearScale,
        PointElement,
        CategoryScale,

      Legend } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

import {
  collection,
  //   querySnapshot,
  query,
  onSnapshot,
  deleteDoc,
  where,
  doc,
} from 'firebase/firestore';
import { db } from '../firebase';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement, 
  LinearScale,
  PointElement,
  CategoryScale,
)

export default function History()  {
  const [ items, setItems] = useState([
    // { name: 'Coffee', price: 4.95 },
    // { name: 'Movie', price: 24.95 },
    // { name: 'candy', price: 7.95 },
  ]);

  const data = {
    labels:["Online", 'Onsite'],
    options:{
      
    },
    datasets:[{
      label:'Order Type',
      data:[5,7],
      backgroundColor:['#2660a4', '#938ba1'],
      borderColor:['#2660a4', '#938ba1'],
      aspectRatio:1/2
     
    }]
  }

  const data1 = {
    labels:["Mon", "Tue","Wed","Thur","Fri","Sat"],
    datasets:[{
      label:'Revenue',
      data:[2504,3502,4850,3250,],
      backgroundColor:[ '#274690'],
      tension: 0.25,
      borderColor:['#274690'],
      
    }]
  }

  const data2 = {
    labels:["Jan", "Feb","Mar","Apr","May","Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
    datasets:[{
      label:'Revenue',
      data:[2504,3502,4850,3250,2250,3150,3502,4850,3120],
      backgroundColor:[ '#274690'],
      tension: 0.25,
      borderColor:['#274690'],
      
    }]
  }
  const data3 = {
    labels:["Mon", "Tue","Wed","Thur","Fri","Sat"],
    datasets:[{
      label:'Revenue',
      data:[2504,3502,4850,3250,1250,],
      backgroundColor:[ '#274690'],
      tension: 0.25,
      borderColor:['#274690'],
      
    }]
  }
  const data4 = {
    labels:["Laundry", 'Dry Cleaning', "Sneaker Cleaning", "Ironing"],
    datasets:[{
      label:'Revenue Breakdown',
      data:[525,750, 920, 480],
      backgroundColor:['#e2725b', '#938ba1', "#33261d", "#e0b0ff"],
      borderColor:['#e2725b', '#938ba1', "#33261d", "#e0b0ff"],
    }]
  }

  const options =
  {
    responsive: true,
  layout:{
    padding:15
  },
   
    plugins:{
      legend:{
        position:'left'
      }
    }
  }
  const options1 ={ 
    responsive: true,
    
    plugins:{
    legend:{
      position:'top'
    }
  }}

  const links = [
    { href: '/account-settings', label: 'Account settings' },
    { href: '/support', label: 'Support' },
    { href: '/license', label: 'License' },
    { href: '/sign-out', label: 'Sign out' },
  ]


  // Read items from database
  useEffect(() =>  {
    const q = query(collection(db, 'orders'));
    // const q = db.collection('laundromat');

    const queryRef = query(q, where('laundromat', '==', 'WashALot' ), where('orderStatus', '==','Complete'));
    const unsubscribe = onSnapshot(queryRef, (querySnapshot) => {
      let itemsArr = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);
      
     
      return () => unsubscribe();
    });
  }, []);

  // Delete items from database
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'items', id));
  };

  const session = useSession({
    required: true,
    
    onUnauthenticated() {
       
      redirect('/signin');
    },
    
    
  });
    
  return (
    
    <Sidebar>
    
    <div className='bg-gray-100 min-h-screen'>
    <div className='flex justify-between px-6 pt-4'>
    <h2 className='text-xl font-semibold'>Metrics</h2>
    
    </div>

  <div class="overflow-hidden max-h-fit rounded-lg border flex grid-cols-3 border-gray-200 shadow-md m-5">
    <div class="w-full max-w-md px-6 py-6 border-collapse bg-white text-left text-sm text-gray-500">
    
          <a href="#" class="block p-6 py-6 px-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
         <div className='text-xl text-center mb-4 font-semibold text-black justify-center '>
         Order Makeup
        
          </div>
          
          <Doughnut 
          data = {data} 
          options={options}
          >  
            </Doughnut>
          </a>

      
      </div>

      <div class="w-full px-6 py-6 border-collapse bg-white text-left text-sm text-gray-500">
    
          <a href="#" class="block  p-6 py-6 px-6 h-full w-full bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
         <div className='text-xl text-center mb-4 font-semibold text-black justify-center '>
         Daily Revenue
        
          </div>
          
          <Line 
          data = {data1} 
          options={options1}
          >  
            </Line>
          </a>
          
      
      </div>
  <div class="w-full px-6 py-6 border-collapse bg-white text-left text-sm text-gray-500">
    
    <a href="#" class="block p-6 py-6 px-6 h-full w-full bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
   
      <div className='text-xl text-center mb-4 font-semibold text-black justify-center '>
        Monthly Revenue
        
          </div>
          
          <Line 
          data = {data2} 
          options={options1}
          >  
            </Line>
          </a>
          

  </div>
  
</div>
<div class="overflow-hidden max-h-fit rounded-lg border flex grid-cols-4 border-gray-200 shadow-md m-5">
    <div class="w-full max-w-md px-6 py-6 border-collapse bg-white text-left text-sm text-gray-500">
    
          <a href="#" class="block h-full p-6 py-6 px-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
         <div className='text-xl text-center mb-4 font-semibold text-black justify-center '>
         Revenue Split
        
          </div>
          
          <Doughnut 
          data = {data4} 
          options={options}
          >  
            </Doughnut>
          </a>

      
      </div>

      <div class="w-full px-6 py-6 border-collapse bg-white text-left text-sm text-gray-500">
    
          <a href="#" class="block  p-6 py-6 px-6 h-full w-full bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
         <div className='text-xl text-center mb-4 font-semibold text-black justify-center '>
         Daily Revenue
        
          </div>
          
          <Line 
          data = {data1} 
          options={options1}
          >  
            </Line>
          </a>
          
      
      </div>
  <div class="w-full px-6 py-6 border-collapse bg-white text-left text-sm text-gray-500">
    
    <a href="#" class="block p-6 py-6 px-6 h-full w-full bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
   
      <div className='text-xl text-center mb-4 font-semibold text-black justify-center '>
        Monthly Revenue
        
          </div>
          
          <Line 
          data = {data2} 
          options={options1}
          >  
            </Line>
          </a>
          

  </div>
  
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
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Order type</th>
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
             {item.orderStatus}
          
        </td>
        <td class="px-6 py-4">R {item.orderAmount.toFixed(2)}</td>
        <td class="px-6 py-4">
          
          {item.deliveryStatus}
        </td>
        <td class="px-6 py-4">
          {item.laundromat}
        </td>
        <td class="px-6 py-4">
          online
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

History.requireAuth = true