"use client"
import React from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { supabase } from '@/lib/supabase/products'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Image from 'next/image'
import amazon from "../public/amazon.com.png"

const Signin = () => {
    return (
        <div className='absolute top-0 w-full h-full  bg-gray-100 py-12 dark:text-black dark:bg-gray-600'>
            <div className='min-h-screen flex flex-col items-center justify-center py-12'>
                <div>
                    <Image src={amazon} alt="Amazon Logo" width={200} height={50} />
                </div>
                <div className='bg-white shadow-md rounded-lg p-8 w-full max-w-md'>
                    <h2 className='text-2xl font-bold mb-6 text-center'>Sign in to Your Account</h2>
                    <Auth
                        supabaseClient={supabase}
                        appearance={{
                            theme: ThemeSupa,
                            style: {
                                button: {
                                    background: '#F0C14B',
                                    color: '#111',
                                    borderColor: '#a88734 #9c7e31 #846a29',
                                    borderRadius: '3px',
                                    fontSize: '13px',
                                    fontWeight: 'normal',
                                },
                                input: {
                                    borderColor: '#a6a6a6',
                                    borderRadius: '3px',
                                },
                                label: {
                                    fontSize: '13px',
                                    color: '#111',
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    )
}


export default Signin
