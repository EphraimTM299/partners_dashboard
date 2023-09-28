'use client';
import React from 'react'
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';

export default function CustomHeader() {
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
    
  });[];


return (
<div> 
  {items.map((item, index)=> 

<><div key={index} className='flex justify-between px-6 pt-4'>
    <h2 className='text-2xl font-semibold'>{item.laundromatName} Dashboard</h2>

   
    <h2 className='text-l font-semibold'>Welcome Back, {item.userName}</h2>
  </div>
  
  <div className='p-4 grid md:grid-cols-3 grid-cols-1 gap-4'>

    

</div></>
 )}</div>
   
  )
}


