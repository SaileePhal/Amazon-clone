import React from 'react'
import Subtotal from './shared/Subtotal';
import Image from 'next/image';
import prime from "../public/prime-logo.png"
import { useRouter } from 'next/navigation';

const ProceedToBuy = ({ length, totalPrice }: { length: number, totalPrice: number }) => {
    const router = useRouter();
    return (
        <div className='w-[20%] h-fit border border-gray-300 ml-4 dark:text-black'>
            <div className='p-4'>
                <Image src={prime} alt={"prime"} width={40} height={40} />
            </div>
            <div className='p-2 text-sm'>
                <p><span className='text-[#007600] font-medium'>Your order is eligible for FREE Delivery.</span></p>
                <p className='py-2'> Choose FREE Delivery option at checkout.</p>
                <span className='text-[#007600] font-medium'><Subtotal left={true} length={length} totalPrice={totalPrice} /></span>
                <button onClick={()=>{
                    router.push("/checkout")
                }}
                className='bg-[#FFD814] w-full py-1 rounded-md shadow-md my-3'>Proceed to Buy</button>
            </div>
        </div>
    ) 
}

export default ProceedToBuy