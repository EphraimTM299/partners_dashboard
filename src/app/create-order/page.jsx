"use client";

import React from 'react'
import { useState } from 'react';
import Sidebar from '../components/Sidebar'
import { collection, addDoc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useForm, useWatch } from "react-hook-form";
import { useSession } from 'next-auth/react';
import SearchBox from '../components/searchbox';


export default function NewOrder() {
    let [showForm, updateSHowForm]= useState(false);
    let [isChecked, setIsChecked] = useState(false);
    let [isLaundry, setIsLaundry] = useState('');
    let [isDry, setIsDry] = useState('');
    let [laundryP, updateLaundryP]= useState()
    let [dryP, updateDryP]= useState(0)
    let [deliveryFee, updateDeliveryFee]= useState(0)
    let [weight, updateWeight]=useState(0.0)
    let [total, updateTotal]= useState(dryP+(laundryP * weight)+ deliveryFee);
   
   function onCreateNewOrder(){
        updateSHowForm(true);
    }

    function calcPrice(event){
      updateTotal(event.target.value)

    }

    function onLaundrySelect(event){
        console.log(event.target.value)
    }
    function onServiceSelect(event){
        setIsLaundry(event.target.value)
    }

    function onSelectDry(event){
        setIsDry(event.target.value)
        console.log(event.target.value)
    }

    const handleChange = event => {
        setIsChecked(!isChecked);
        console.log(event.target.value)
      };


    const { register, setValue, handleSubmit } = useForm({
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

      const serviceType = [
        {
            label: "Select Service",
            value: "",
          },
        {
          label: "Clothes",
          value: "Laundry",
        },
        {
          label: "Dry Cleaning",
          value: "Dry Cleaning",
        },
        
        
      ];
      const laundryType = [
        {
          label: "Select Type",
          value: "",
        },
        
        {
          label: "Wash,Dry & Fold",
          value: "30",
        },
        {
          label: "Wash,Dry,Fold & Iron",
          value: "38",
        },
        {
          label: "Iron Only",
          value: "30",
        },
      ];

      const dryClean = [
        {
          label: "Select Item",
          value: "",
        },
        {
          label: "Coat",
          value: "200",
        },
        {
          label: "Wedding Dress",
          value: "120",
        },
        {
          label: "Suit",
          value: "150",
        },
        {
          label: "Jacket",
          value: "100",
        },
        {
          label: "Coat",
          value: "200",
        },
        {
          label: "Wedding Dress",
          value: "120",
        },
        {
          label: "Suit",
          value: "150",
        },
        {
          label: "Jacket",
          value: "100",
        },
      ];
      
            return (
            <Sidebar>

            <div className='bg-white min-h-screen'>
                {/* <div className='flex justify-between px-6 pt-4'>
                <h2 className='text-xl font-semibold'>Create New Order</h2>
            </div> */}

            {!showForm && <div className='h-screen flex justify-center items-center px-6 pt-4'>
            <button onClick={onCreateNewOrder} className='bg-blue-500 text-white text-3xl rounded-lg px-6 m-10 py-4'>Create New Order</button>
            </div>}

                    
            {showForm && <div className="overflow-hidden mt-16 w-5/6 px-16 py-16 ml-16 bg-white justify-center flex flex-wrap rounded-lg border border-gray-200 shadow-md m-5">
                
                        
                    <form className='px-4 py-10 w-full sm:w-1/2  '>
                            <div className="grid gap-6 mb-6 md:grid-cols-2">
                                <div>
                                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                                    <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required/>
                                </div>
                                <div>
                                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                                    <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required/>
                                </div>
                                
                                <div>
                                    <label htmlFor="tel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                                    <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678"  required/>
                                </div>
                                <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required/>
                                </div>

                                <div>
                                
                                <label htmlFor="service" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Service</label>
                                <select onChange={onServiceSelect} className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'  name="" id="">
                                    
                                {serviceType .map((option, index) => (
                                <option key={index} value={option.value}>{option.label}</option>
                                ))}
                                </select>
                            </div>
                            {isLaundry == 'Laundry' && 
                            <div>
                                    <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Weight(kg)</label>
                                    <input onChange={e=> updateWeight(+e.target.value)} min={5} type="number" id="visitors" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={5} placeholder="" required/>
                            </div>}

                                {isLaundry == 'Laundry' && <div> 
                                    <label htmlFor="laundry" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Laundry Type</label>
                                    <select onChange={e=> updateLaundryP(+e.target.value)}  className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ' name="" id="">
                                    {laundryType .map((option, i) => (
                                    <option key={i} value={option.value}>{option.label}</option>
                                    ))}
                                        
                                    </select>
                            </div>}

                            {/* field for dy cleaning */}
                            {isLaundry == 'Dry Cleaning' && <div> 
                                    <label htmlFor="drycleaning" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Items</label>
                                    <select  onChange={e=> updateDryP(+e.target.value)}  className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ' name="" id="">
                                    {dryClean.map((option, i) => (
                                    <option key={i} value={option.value}>{option.label}</option>
                                    ))}
                                        
                                    </select>
                            </div>}

                            {/* field for sneakers
                            {isLaundry == 'Sneakers' && <div> 
                                    <label htmlFor="drycleaning" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Care Type</label>
                                    <select   className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ' name="" id="">
                                    {sneakerCare.map((option, i) => (
                                    <option key={i} value={option.value}>{option.label}</option>
                                    ))}
                                        
                                    </select>
                            </div>}
                             */}
                            </div>
                            
                                    <label className="relative mb-8 inline-flex items-center cursor-pointer">
                                    <input onChange={handleChange} checked={isChecked}  type="checkbox" value="" className="sr-only peer"/>
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Deliver when Complete</span>
                                    </label>

                                {isChecked && <div>
                                    <label htmlFor="address" className="block  mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                    <SearchBox {...register("businessAddress")}{...register("latitude")} {...register("longitude")} onSelectAddress={(address, latitude, longitude )=>{
                                    setValue ("businessAddress", address)
                                    setValue ("latitude", latitude)
                                    setValue ("longitude", longitude)
                                  }}
                                  defaultValue=""/>
                                                          
                                </div>}

                            <button type="submit" className="text-white mt-6 bg-blue-700 block hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Order</button>

            </form>
            <div className='bg-white ml-8 px-10 py-8 mt-5  justify-center' >
                <div className="block max-w-sm p-6  border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <p className="font-semibold text-xl text-gray-700 dark:text-gray-400" >Service Cost : {(laundryP*weight)+ dryP}</p>
                    
                    {isChecked && <><p className="font-semibold mt-2 text-xl text-gray-700 dark:text-gray-400">Delivery Fee : {deliveryFee}</p>
                  </>}
                  <h4 className="mb-2 mt-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Total Due : {(laundryP*weight)+deliveryFee +dryP}</h4>
                    <p className="font-normal text-gray-700 dark:text-gray-400">The total due on the current order, cash or card.</p>
                   
                    
                        </div>
                    </div>
 
            </div>}
              
            </div>
            </Sidebar>


                )
            }