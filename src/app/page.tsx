'use client';
import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import { redirect } from 'next/navigation';
import Header  from '../app/components/Header';
import TopCards from '../app/components/TopCards'
import BarChart  from '../app/components/BarChart';
import RecentOrders from '../app/components/RecentOrders';
import SideBar from '../app/components/Sidebar'

export default function Home() {
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
   
    <main className="bg-gray-100 min-h-screen">

        <Header />
        <TopCards />
        <div className='p-4 grid md:grid-cols-3 grid-cols-1 gap-4'>

          <BarChart />
          <RecentOrders />
          {/* <p>{session?.data?.user?.email}</p>
          <button className='' onClick={() => signOut()}>Log Out</button> */}
        </div>


      </main>
     
      <div className="p-8">
        <div className=''>{session?.data?.user?.email}</div>
        <button className='' onClick={() => signOut()}>Logout</button>
      </div>
      </>
      </SideBar>
  )
}

Home.requireAuth = true