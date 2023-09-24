'use client';

import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import { redirect } from 'next/navigation';
import Header from '../components/Header';
import TopCards from '../components/TopCards'
import BarChart  from '../components/BarChart';
import RecentOrders from '../components/RecentOrders';
import SideBar from '../components/Sidebar'
import { Suspense, useEffect, useState } from 'react';
import { collection, addDoc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import DoughnutChart from '../components/Doughnut'

export default function Dashboard() {
    
  const session = useSession({
    required: true,
    
    onUnauthenticated() {
       
      redirect('/signin');
    },
    
    
  });
  const [items, setItems] = useState([]);

  useEffect(() =>  {
    const q = query(collection(db, 'laundryUsers'));
  
    const queryRef = query(q, where('userEmail', '==', `${session?.data?.user?.email}`));
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
    
      <SideBar>
    <><Head>
      <title>teillo laundry dashboard</title>
      <meta name="description" content="teillo laundromat dashboard" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head> 

    


    <main  className="bg-gray-100 min-h-screen">
    {items.map((item, index)=> 

    <><div key={index} className='flex justify-between px-6 pt-4'>
        <h2 className='text-2xl font-semibold'>{item.laundromatName} Dashboard</h2>

       
        <h2 className='text-l font-semibold'>Welcome Back, {item.userName}</h2>
      </div><TopCards /><div className='p-4 grid md:grid-cols-3 grid-cols-1 gap-4'>

          <BarChart />
          {/* <DoughnutChart/> */}
          <RecentOrders />

    </div></>
     )}
    </main>
    
    
      </>
      </SideBar>
  )
}

Dashboard.requireAuth = true