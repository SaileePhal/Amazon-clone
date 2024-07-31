"use client"
import React, { useEffect } from 'react'
import { useSupabase } from '@/lib/supabase/hooks/useSupabase'
import Image from 'next/image';
import CategoryWiseProduct from './shared/CategoryWiseProduct';


const Electronics = () => {
    const { 
        electronicProducts,
        getElectronics
    } = useSupabase();
    
      useEffect(() => {
        getElectronics();
      }, [getElectronics])

  return (
        <div className='bg-[#E6F3FF] dark:text-black dark:bg-gray-900'>
            <Image
      style={{
        maskImage:'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))'
    }} src={"https://images-eu.ssl-images-amazon.com/images/G/31/IMG24/Smart_Watches/MED_MAY/Tall_Hero_1500X600_BAU_NewLaunches._CB554931622_.jpg"} alt="Amazon Home Page" width={10000} height={10000} />
          <div className='w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 relative -top-64'>
            {
              electronicProducts.map((product: any) => {
                return (
                  <div key={product.id}>
                    <CategoryWiseProduct product={product} />
                  </div>
                )
              })
            }
          </div>
        </div>
  )
}

export default Electronics