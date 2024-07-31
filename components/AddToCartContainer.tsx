"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import prime from "../public/prime-logo.png"
import { IoLocationOutline } from "react-icons/io5";
import { useAppDispatch } from '@/lib/supabase/hooks/redux';
import { addToCart } from '@/redux/cartSlice';
import { useRouter } from 'next/navigation';
import CountdownTimer from './CountdownTimer';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/products';
import LocationFetcher from './LocationFetcher'

const AddToCartContainer = ({product}:{product:any}) => {
 const dispatch = useAppDispatch();
 const [dateTime, setDateTime] = useState(new Date());
 const targetDate = "2024-12-20T23:59:59";
 const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    getUserData();
  }, []);

 useEffect(() => {
   const intervalId = setInterval(() => {
     setDateTime(new Date());
   }, 1000);


   return () => clearInterval(intervalId);
 }, []);




 const router =useRouter();
 return (
   <div className='border border-gray-300 rounded-md w-[130%] h-fit text-sm'>
       <div className='p-4'>
       <Image src={prime} alt={"prime"} width={40} height={40}/>
       </div>
       <div className='p-4'>
           <h1 className='font-bold'><span className='text-[#147C8F]'>Free Delivery, </span>{dateTime.toLocaleString()}. <span className='text-[#147C8F]'>Details</span></h1>
           <h1 className='mt-4'>Or fastest delivery <span className='font-bold'>valid till, 20th December.</span> Order within <span className='text-[#32a832]'><CountdownTimer targetDate={targetDate}/></span><span className='text-[#147C8F]'>Details</span></h1>
           <div className='flex mt-4'>
               <div>
                   <IoLocationOutline size={"20px"} />
               </div>
               <p className='text-[#147C8F] my-2'>Deliver to <Link href={"/signin"}><span className='mx-2 text-black hover:text-[#347bed] transition-colors'>{`${user ? user.identities[0].identity_data.full_name : "Please sign in"}`}
               </span></Link> <LocationFetcher/></p>
           </div>
           <button onClick={()=>{
             dispatch(addToCart(product));
             router.push("/cart");


           }}
           className='bg-[#FFD814] w-full rounded-full py-1 mt-4'>Add to Cart</button>
           <button onClick={()=>{
             dispatch(addToCart(product));
             router.push("/checkout");


           }} className='bg-[#FFA41C] w-full rounded-full py-1 my-2'>Buy Now</button>
       </div>
   </div>
 )
}


export default AddToCartContainer
