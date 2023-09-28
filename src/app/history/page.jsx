'use client';

import React, { useState, useEffect, useRef } from 'react';
import {PiMicrosoftExcelLogoDuotone} from 'react-icons/pi'
import Sidebar from '../components/Sidebar'
import {RxPerson} from 'react-icons/rx'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import BarChart from '../components/BarChart'
import { Chart as ChartJS, 
         ArcElement,
        Tooltip,
        LineElement, 
        LinearScale,
        PointElement,
        CategoryScale,

      Legend } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import {useDownloadExcel} from 'react-export-table-to-excel'

import {
  collection,
  //   querySnapshot,
  query,
  onSnapshot,
  deleteDoc,
  where,
  doc,
  orderBy,
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
    labels:["Laundry", 'Dry Cleaning',  "Ironing"],
    datasets:[{
      label:'Revenue Breakdown',
      data:[525,750, 920],
      backgroundColor:['#e2725b', '#938ba1', "#33261d" ],
      borderColor:['#e2725b', '#938ba1', "#33261d"],
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

  


  // Read items from database
  useEffect(() =>  {
    const q = query(collection(db, 'orders'));
    // const q = db.collection('laundromat');

    const queryRef = query(q, where('laundromat', '==', 'WashALot' ), where('orderStatus', '==','Complete'), orderBy("pickup", 'desc'));
    const unsubscribe = onSnapshot(queryRef, (querySnapshot) => {
      let itemsArr = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);
      
     
      return () => unsubscribe();
    });
  }, []);


  const tableRef =useRef(null);

  const {onDownload} = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename:"Active Orders",
    sheet:'Active Orders'
  })


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
    <h2 className='text-2xl font-semibold'>Analytics</h2>
    
    </div>
    
    <div className="overflow-hidden rounded-lg border block border-gray-200 shadow-md m-5">
  <button onClick={onDownload} className="px-16 m-5 py-5 font-semibold text-white rounded-xl bg-blue-500 justify-between"><span className='flex place-items-center justify-center items-baseline'>Export Data < PiMicrosoftExcelLogoDuotone className='ml-2 pt-0 pb-0' size={25}/> </span>   </button>
  <table ref={tableRef} className="w-full border-collapse bg-white text-left text-sm text-gray-500">
    <thead className="bg-gray-50">
      <tr>
      <th scope="col" className="px-6 py-4 font-medium text-gray-900">Order Number</th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Client Name</th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Order Status</th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900"> Order Value</th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Delivery Status</th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Laundromat</th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Order type</th>
      </tr>
    </thead>
    {items.map((item, index)=>
    
   
    <tbody key={index} className="divide-y divide-gray-100 border-t border-gray-100">
      
      <tr className="hover:bg-gray-50"  >
      <td className="px-6 py-4">{item.orderNumber}</td>
        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
          <div className="relative py-2">
          {/* <RxPerson size={20}/> */}
            
          </div>
          <div className="text-sm">
            <div className="">{item.userName}</div>
            
          </div>
        </th>
        <td className="px-6 py-4">
             {item.orderStatus}
          
        </td>
        <td className="px-6 py-4">R {item.orderAmount.toFixed(2)}</td>
        <td className="px-6 py-4">
          
          {item.deliveryStatus}
        </td>
        <td className="px-6 py-4">
          {item.laundromat}
        </td>
        <td className="px-6 py-4">
          online
        </td>
      </tr>
     
    </tbody>
     )}
  </table>
  
</div>

  <div className="overflow-hidden max-h-fit rounded-lg border flex grid-cols-3 border-gray-200 shadow-md m-5">
    <div className="w-full max-w-md px-6 py-6 border-collapse bg-white text-left text-sm text-gray-500">
    
          <a href="#" className="block p-6 py-6 px-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
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

      <div className="w-full px-6 py-6 border-collapse bg-white text-left text-sm text-gray-500">
    
          <a href="#" className="block  p-6 py-6 px-6 h-full w-full bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
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
  <div className="w-full px-6 py-6 border-collapse bg-white text-left text-sm text-gray-500">
    
    <a href="#" className="block p-6 py-6 px-6 h-full w-full bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
   
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
<div className="overflow-hidden max-h-fit rounded-lg border flex grid-cols-4 border-gray-200 shadow-md m-5">
    <div className="w-full max-w-md px-6 py-6 border-collapse bg-white text-left text-sm text-gray-500">
    
          <a href="#" className="block h-full p-6 py-6 px-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
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

      <div className="w-full px-6 py-6 border-collapse bg-white text-left text-sm text-gray-500">
    
          <a href="#" className="block  p-6 py-6 px-6 h-full w-full bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
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
  <div className="w-full px-6 py-6 border-collapse bg-white text-left text-sm text-gray-500">
    
    <a href="#" className="block p-6 py-6 px-6 h-full w-full bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
   
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


 
       
    </div>
    
    </Sidebar>
  )
}

History.requireAuth = true