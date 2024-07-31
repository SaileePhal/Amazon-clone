"use client"
import { useAppSelector } from '@/lib/supabase/hooks/redux'
import { getCart } from '@/redux/cartSlice'
import Image from 'next/image'
import React from 'react'
import Tick from '../public/Tick.jpeg'
import Link from 'next/link'

const Success = () => {
    const cart = useAppSelector(getCart);
    let totalPrice = 0;
    cart.forEach((item:any) => {
        totalPrice += item.price * item.quantity;
    });

    return (
        <div className='absolute top-0 w-full h-full '>
            <div className='min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900'>
                <div className='max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden dark:bg-gray-800'>
                    <div className='bg-green-500 px-4 py-5 sm:px-6 flex items-center'>
                        <Image src={Tick} alt="payment successful" width={50} height={50} className="mr-4" />
                        <h1 className='text-2xl font-bold text-white'>Thank You for purchasing from Amazon.in</h1>
                    </div>
                    <div className='px-4 py-5 sm:p-6'>
                        <h2 className='text-xl font-semibold mb-4 border-b pb-2 dark:text-white'>Order Details</h2>
                        <div className='space-y-4'>
                            {cart.map((product: any) => (
                                <div className='flex items-center justify-between py-4 border-b dark:border-gray-700'>
                                    <div className='flex items-center'>
                                        <Image src={product.image} alt={product.title} height={80} width={80} className="object-cover rounded" />
                                        <h3 className='ml-4 font-medium dark:text-white'>{product.title}</h3>
                                    </div>
                                    <span className='font-bold text-green-600 dark:text-green-400'>${product.price.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className='mt-6 flex justify-between items-center'>
                            <span className='text-lg font-semibold dark:text-white'>Total:</span>
                            <span className='text-2xl font-bold text-green-600 dark:text-green-400'>{`(${cart.length} items):$${totalPrice}`}</span>
                        </div>
                    </div>
                    <div className=' flex bg-gray-50 px-4 py-5 sm:px-6 dark:bg-gray-700'>
                        <p className='text-sm text-gray-600 dark:text-gray-300'>
                            Your order has been confirmed. You will receive an email confirmation shortly. 
                        </p>
                        <p className='text-sm text-gray-600 dark:text-gray-300 hover:underline'>
                          <Link href={"/"} className='text-[#8db3f0] hover:text-[#347bed] transition-colors'> Continue ordering</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Success