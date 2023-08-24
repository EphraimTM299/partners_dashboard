'use client';
import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import { redirect } from 'next/navigation';
import Header  from '../app/components/Header';
import TopCards from '../app/components/TopCards'
import BarChart  from '../app/components/BarChart';
import RecentOrders from '../app/components/RecentOrders';
import SideBar from '../app/components/Sidebar'
import { Suspense } from 'react';

export default function Home() {

  // const session = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect('/signin');
  //   },
  // });
  return (
    
      
    <><Head>
      <title>teillo laundry dashboard</title>
      <meta name="description" content="teillo laundromat dashboard" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
   
    <main className="bg-gray-100 min-h-screen">

        {/* <Header /> */}
        {/* <TopCards /> */}
        


      </main>
     
      {/* <div className="p-8">
        <div className=''>{session?.data?.user?.email}</div>
        <button className='' onClick={() => signOut()}>Logout</button>
      </div> */}
      </>
      
      
  )
}

