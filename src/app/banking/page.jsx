'use client';

import React from 'react'
import Sidebar from '../components/Sidebar'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';


export default function Banking() {

    const session = useSession({
        required: true,
        
        onUnauthenticated() {
           
          redirect('/signin');
        },
        
        
      });
    const bankName = [
        
    ]
  

return (
<Sidebar>

<div className='bg-gray-100 min-h-screen'>
    <div className='flex justify-between px-6 pt-4'>
    <h2 className='text-xl font-semibold'>Banking</h2>
    
</div>

        
<div class="overflow-hidden w-3/4 bg-white justify-center flex flex-wrap rounded-lg border border-gray-200 shadow-md m-5">
            
        <form className='px-4 py-10   w-full sm:w-1/2  '>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bank Name</label>
                        <select  className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ' name="" id="">
                            <option value="Laundry">First National Bank (FNB)</option>
                            <option value="Dry Cleaning">ABSA</option>
                            <option value="Processing">Nedbank</option>
                            <option value="Done Processing">Standard Bank</option>
                            
                        </select>                    </div>
                    <div>
                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bank Account Number</label>
                        <input type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="65658545814" required/>
                    </div>
                    
                    <div>
                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Branch Code</label>
                        <input type="tel" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678"  required/>
                    </div>
                  


                    <div>
                    
                        <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bank Account Type</label>
                        <select  className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ' name="" id="">
                            <option value="Laundry">Business</option>
                            <option value="Dry Cleaning">Transmission</option>
                            <option value="Processing">Current</option>
                            <option value="Done Processing">Savings</option>
                            
                        </select>
                    </div>
                   
                </div>
                
               
                <label class="block mb-2 text-sm font-medium  text-gray-900 dark:text-white" for="file_input">Upload Account Confirmation Letter</label>
                <input class="block w-full text-sm mb-8 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>


                <div class="flex items-start mb-6">
                    <div class="flex items-center h-5">
                    <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required/>
                    </div>
                    <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
                </div>
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit Account Details</button>

        </form>
        <div className='bg-white px-10 py-16 justify-center' >
            <a href="#" class="block max-w-sm p-6 mb-4 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <p class="font-semibold text-xl text-gray-700 dark:text-gray-400">Total Balance</p>
                <h5 class="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">R 12584.89</h5>
                <p class="font-normal text-gray-700 dark:text-gray-400">The total amount Earned for the week.</p>
                
            </a>
            <a href="#" class="block max-w-sm p-6  border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <p class="font-semibold text-xl text-gray-700 dark:text-gray-400">Total Balance Available</p>
                <h5 class="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">R 4558.89</h5>
                <p class="font-normal text-gray-700 dark:text-gray-400">The amount you can withdraw.</p>
                
            </a>
        </div>
       
      


</div>


       
</div>
</Sidebar>


    )
}

Banking.requireAuth = true