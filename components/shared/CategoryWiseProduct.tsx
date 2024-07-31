import Image from 'next/image'
import React from 'react'
import Ratings from './Ratings'
import { useAppDispatch } from '@/lib/supabase/hooks/redux'
import { addToCart } from '@/redux/cartSlice'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const CategoryWiseProduct = ({ product }: { product: any }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <div className='border border-gray-300 bg-white p-2 h-[450px] flex flex-col mx-4 rounded-lg shadow-md transition-shadow hover:shadow-lg'>
      <h1 className='font-bold text-center text-lg mb-2'>{product.category}</h1>
      <div className='mt-2 aspect-square overflow-hidden flex items-center justify-center'>
        <Image src={product.image} className='object-contain w-full h-full p-6' alt={product.title} width={200} height={200} />
      </div>
      <div className='flex-grow flex flex-col justify-between mt-4'>
        <div>
          <Link href={`/product/${product.id}`}><h1 className='text-md font-semibold line-clamp-2 hover:text-blue-600 transition-colors'>{product.title}</h1></Link>
          <div className='mt-2'> 
            <Ratings ratings={product.rating} />
          </div>
        </div>
        <div className='mt-auto pt-4'>
          <button
            onClick={() => {
              dispatch(addToCart(product));
              router.push("/cart");
            }}
            className='w-full py-2 rounded-md bg-[#FFD814] text-black font-semibold hover:bg-blue-700 transition-colors'>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default CategoryWiseProduct