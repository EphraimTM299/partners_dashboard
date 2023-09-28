'use client';

import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { redirect } from 'next/navigation';
import TopCards from '../components/TopCards'
import RecentOrders from '../components/RecentOrders';
import SideBar from '../components/Sidebar'
import DoughnutChart from '../components/Doughnut'
import CustomHeader from '../components/Header';

import ActiveOrders from '../components/ActiveOrders'
import BarChart from '../components/BarChart';

export default function Dashboard() {
    
  const session = useSession({
    required: true,
    
    onUnauthenticated() {
       
      redirect('/signin');
    },
    
    
  });
 
  
  return (
    
      <SideBar>
    <><Head>
      <title>teillo laundry dashboard</title>
      <meta name="description" content="teillo laundromat dashboard" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head> 

    <main  className="bg-gray-100 min-h-screen">
    

      {/* <CustomHeader/> */}
    <TopCards/>
    <ActiveOrders/>
    
      <div className='p-4 grid md:grid-cols-3 grid-cols-1 gap-4'>
       
     
         
          
          
         

    </div>
     
    </main>
    
    
      </>
      </SideBar>
  )
}

Dashboard.requireAuth = true