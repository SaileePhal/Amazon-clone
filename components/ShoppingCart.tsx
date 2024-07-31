"use client"
import React from 'react';
import Image from "next/image";
import { useAppDispatch } from '@/lib/supabase/hooks/redux';
import { clearAllCart, decrementQuantity, incrementQuantity, removeFromTheCart } from '@/redux/cartSlice';
import Subtotal from './shared/Subtotal';
import { TbTruckDelivery } from "react-icons/tb";

const ShoppingCart = ({ cart, totalPrice }: { cart: any, totalPrice: number }) => {
    const dispatch = useAppDispatch();
    return (
        <div className='w-[90%] lg:w-[70%] mx-auto dark:text-black'>
            <div className='flex justify-between items-center border-b border-gray-300 py-5'>
                <h1 className='font-bold text-2xl'>Shopping Cart</h1>
                <h1 className='font-medium text-lg'>Price</h1>
            </div>
            {
                cart.map((product: any) => {
                    return (
                        <div key={product.id} className='py-4 flex justify-between items-center border-b border-gray-200'>
                            <div className='flex'>
                                <div>
                                    <Image src={product.image} width={180} height={180} alt={product.title} />
                                </div>
                                <div className='ml-8'>
                                    <h1 className='font-medium text-l'>{product.title}</h1>
                                    <p className='text-[#007600] font-bold my-1 text-xs'>In Stock</p>
                                    <p className='my-1 text-sm'>Sold by <span className='text-[#007185] font-medium'>BrazoIndia</span></p>
                                    <div className='flex items-center my-1'>
                                        <TbTruckDelivery />
                                        <p className='text-xs ml-2'>Delivery by Amazon</p>
                                    </div>
                                    <p className='my-1 text-xs'>Gift options not available. <span className='text-[#007185] font-medium'>Learn more</span></p>
                                    <p className='text-xs'><span className='font-bold'>Size:</span> M</p>
                                    <p className='text-xs'><span className='font-bold'>Colour:</span> Light Brown</p>

                                    <h1 onClick={() => {
                                        dispatch(removeFromTheCart(product.id));
                                    }} className='font-bold text-red-600 cursor-pointer w-fit'>REMOVE</h1>
                                    <div className='flex text-xl my-4 font-medium justify-between items-center w-fit bg-gray-200 rounded-md px-5 py-1'>
                                        <div
                                            onClick={() => {
                                                product.quantity > 1 && dispatch(decrementQuantity(product));
                                            }}
                                            className='cursor-pointer mr-4'>-</div>
                                        <div>{product.quantity}</div>
                                        <div
                                            onClick={() => {
                                                dispatch(incrementQuantity(product));
                                            }}
                                            className='cursor-pointer ml-4'>+</div>
                                    </div>
                                </div>

                            </div>
                            <div>
                                <h1 className='font-bold text-xl'>{`$${product.price}`}</h1>
                                <p className='text-xs py-1'>M.R.P.: <span className='line-through '>{`₹${product.price*80}`}</span></p>
                            </div>

                        </div>
                    )
                })
            }

            <h1 onClick={() => {
                dispatch(clearAllCart());
            }}
                className='text-red-600 font-bold cursor-pointer py-2'>CLEAR ALL</h1>
            <div className='text-green-600 font-bold '>
                <Subtotal left={false} length={cart.length} totalPrice={totalPrice} />
            </div>
        </div>
    )
}

export default ShoppingCart