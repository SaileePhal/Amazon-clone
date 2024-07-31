"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import amazonLogo from "../public/amazon-logo.png"
import { FaLock } from "react-icons/fa";
import Link from 'next/link';
import { useAppSelector } from '@/lib/supabase/hooks/redux';
import { getCart } from '@/redux/cartSlice';
import OrderSummary from './ordersummary';
import { supabase } from '@/lib/supabase/products';


const Checkout = () => {
    const [user, setUser] = useState<any>(null);
    const cart = useAppSelector(getCart);

    useEffect(()=>{
        const getUserData = async () =>{
            const {data:{user}} = await supabase.auth.getUser();
            setUser(user);
        }
        getUserData();

    },[])

    return (
        <div className='absolute top-0 w-full p-8 bg-white dark:text-black'>
            <div className='max-w-[1200px] mx-auto px-4'>
                <div className='flex items-center justify-between py-4 border-b border-gray-300'>
                    <Link href={'/'}><Image src={amazonLogo} alt={"amazon-logo"} width={150} height={150} /></Link>
                    <h1 className='font-normal text-3xl'>Checkout</h1>
                    <FaLock size={"25px"} className="text-gray-500" />
                </div>
                <hr/>
                <hr/>
                <hr/>
                <hr/>
                <div className='flex flex-col lg:flex-row justify-between mt-8'>
                    <div className='w-full lg:w-[70%] mx-auto lg:mx-0'>
                        <div className='mt-2 flex justify-between border-b border-gray-300 my-2'>
                            <h2 className='font-bold text-lg'>1. Delivery address</h2>
                            <Link href={"/signin"}><p className='font-medium text-xl text-black hover:text-[#347bed] transition-colors'>{`${user ? user.identities[0].identity_data.full_name:"Please sign in"}`}<br />  
                                <span className='text-[#007185] text-xs'>Add Delivery Instructions</span>
                            </p></Link>
                        </div>

                        <div className='mt-6 justify-between border-b border-gray-300 my-2'>
                            <h2 className='font-bold text-lg'>2. Items and Delivery</h2>
                            {
                                cart.map((product: any) => {
                                    return (
                                        <div className='my-4'>
                                            <div className='flex text-center justify-between'>
                                                <Image src={product.image} alt={product.title} width={150} height={150} />
                                                <h1 className='font-bold text-lg'>{product.title}</h1>
                                                <p className='font-bold text-2xl'>{`$${product.price}`}</p>
                                            </div>
                                        </div>
                                    )

                                })
                            } 
                        </div>
                    </div>
                    <div className='w-full lg:w-[30%] mt-2 lg:mt-0'>
                        <OrderSummary/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout