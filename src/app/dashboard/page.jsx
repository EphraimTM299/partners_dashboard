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

export default function Dashboard() {
    
  const session = useSession({
    required: true,
    
    onUnauthenticated() {
       
      redirect('/signin');
    },
    
    
  });
  const [items, setItems] = useState([
    
  ]);

  useEffect(() =>  {
    const q = query(collection(db, 'laundryUsers'));
  

    const queryRef = query(q, where('userEmail', '==', `${session?.data?.user?.email}`));
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
  
  return (
    
      <SideBar>
    <><Head>
      <title>teillo laundry dashboard</title>
      <meta name="description" content="teillo laundromat dashboard" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    {items.map((item, index)=> 


    <main key={index} className="bg-gray-100 min-h-screen">

    <div className='flex justify-between px-6 pt-4'>
    <h2>{item.laundromatName} Dashboard</h2>

      {/* <h2>Welcome Back, {item.userName}</h2> */}
      <h2>Welcome Back, Manager</h2>
    </div>
    <TopCards />
    <div className='p-4 grid md:grid-cols-3 grid-cols-1 gap-4'>

      <BarChart />
      <RecentOrders />
      
    </div>
    </main>
    
    )}
      </>
      </SideBar>
  )
}

Dashboard.requireAuth = true