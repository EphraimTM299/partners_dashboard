'use client';

import React from 'react'
import Sidebar from '../components/Sidebar'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { GeoPoint, addDoc,Timestamp, collection, doc, getFirestore, setDoc} from 'firebase/firestore';
import { db } from '../firebase';



export default function Banking() {

    const { register,setValue, handleSubmit } = useForm({
        criteriaMode: "all",
      });

    async function sendData (bankName, accountNumber, branchCode, accountType) {

        try {
           addDoc(collection(db, 'ordertest'), {
            bankName:bankName,
            branchCode:branchCode,
            accountNumber:accountNumber, 
            accountType:accountType
            
           //  pricelist:pricelist
          }).then(result => alert("item added"));
        } catch (error) {
          alert(error);
        }
      }

      const onSubmit = async (data, event) => {

        try {
            sendData(
            data.bankName,
            data.accountNumber,
            data.branchCode,
            data.accountType
             )            
             
            } catch (error) {
                alert(error);
            }
        
        // data.preventDefault();
        console.log("data",data.email);
        console.log(event);
        // throw new Error();
      
      } 
      

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
    <h2 className='text-xl font-semibold'>Banking</h2>
    
</div>

        
<div class="overflow-hidden w-[90vw] py-16 px-10 bg-white justify-between flex flex-wrap rounded-lg border border-gray-200 shadow-md m-5">

    
            
        <form onSubmit={handleSubmit(onSubmit)} className='px-4 py-4 ml-10 w-full sm:w-1/2  '>
        <div className='mb-10 font-semibold text-2xl'>
        Add Bank Account details

        </div>
        
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="bankName" class="block mb-2  font-medium text-gray-900 dark:text-white">Bank Name</label>
                        <select {...register("bankName", { required: true, 
         
        }
        )} className=' bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ' name="" id="">
                            <option >First National Bank (FNB)</option>
                            <option >ABSA</option>
                            <option >Nedbank</option>
                            <option >Standard Bank</option>
                            
                        </select>
                        </div>
                    <div>
                        <label for="last_name" class="block mb-2 font-medium text-gray-900 dark:text-white">Bank Account Number</label>
                        <input {...register("accountNumber", { required: true, 
         
        }
        )} type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="65658545814" required/>
                    </div>
                    
                    <div>
                        <label for="Branch Code" class="block mb-2 font-medium text-gray-900 dark:text-white">Branch Code</label>
                        <input {...register("branchCode", { required: true, 
         
        }
        )} type="tel" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678"  required/>
                    </div>
                  


                    <div>
                    
                        <label for="visitors" class="block mb-2 font-medium text-gray-900 dark:text-white">Bank Account Type</label>
                        <select {...register("accountType", { required: true, 
         
        }
        )}  className=' bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ' name="" id="">
                            <option >Business</option>
                            <option >Transmission</option>
                            <option >Current</option>
                            <option >Savings</option>
                            
                        </select>
                    </div>
                   
                </div>
                
               
                <label class="block mb-2 font-medium  text-gray-900 dark:text-white" for="file_input">Upload Account Confirmation Letter</label>
                <input class="block w-full text-sm mb-8 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>


               
                <button type="submit" class="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit Account Details</button>

        </form>
        <div className='bg-white px-20 mx-8 py-12 justify-center items-center' >
            <a href="#" class="block max-w-sm p-6 mb-4 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <p class="font-semibold text-xl text-gray-700 dark:text-gray-400">Total Balance</p>
                <h5 class="mb-2 text-3xl mt-4 font-bold tracking-tight text-gray-900 dark:text-white">R 12 584.89</h5>
                <p class="font-normal text-gray-700 dark:text-gray-400">The total amount Earned for the week.</p>
                
            </a>
            <a href="#" class="block max-w-sm p-6  border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 ">
                <p class="font-semibold text-xl text-gray-700 dark:text-gray-400">Total Balance Available</p>
                <h5 class="mb-2 text-3xl mt-4 font-bold tracking-tight text-gray-900 dark:text-white">R 4 558.89</h5>
                <p class="font-normal text-gray-700 dark:text-gray-400">The amount you can withdraw.</p>
                
            </a>
        </div>
       
      


</div>


       
</div>
</Sidebar>


    )
}

Banking.requireAuth = true