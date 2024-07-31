"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import amazonLogo from "../public/amazon-logo-2.webp";
import { BiCart } from "react-icons/bi";
import { CgSearch } from "react-icons/cg";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/supabase/hooks/redux';
import { getCart } from '@/redux/cartSlice';
import { supabase } from '@/lib/supabase/products';

const itemList = [
    "All",
    "Clothes",
    "Jewellery",
    "Sell",
    "Electronics",
    "Backpack",
    "Buy Again",
    "Previous Orders",
    "Gift Ideas"
]

const links = {
    "All": "/all",
    "Clothes": "/clothes",
    "Jewellery": "/jewellery",
    "Sell": "/sell",
    "Electronics": "/electronics",
    "Backpack": "/backpack",
    "Buy Again": "/buy-again",
    "Previous Orders": "/previous-orders",
    "Gift Ideas": "/gift-ideas"
};




const Header = () => {
    const [query, setQuery] = useState<string>("");
    const [category, setCategory] = useState<string>("All");
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    const cart = useAppSelector(getCart);

    const searchHandler = () => {
        router.push(`/search/${query}`);
    }

    useEffect(() => {
        const getUserData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        }
        getUserData();
    }, [])

    

    return (
        <>
            <div className='bg-[#131921] text-white py-1'>
                <div className='flex items-center justify-between w-[90%] mx-auto'>
                    <Link href={'/'} className='w-[10%]'>
                        <Image src={amazonLogo} alt={"logo"} width={150} height={150} />
                    </Link>
                    <div className='flex items-center w-[60%]'>
                        
                        <input 
                            value={query} 
                            onChange={(e) => setQuery(e.target.value)}
                            type="text" 
                            className='w-full p-2 rounded-l-md outline-none text-black' 
                            placeholder='Search Amazon.in' 
                        />
                        <div 
                            onClick={searchHandler}
                            className='bg-[#FEBD69] p-2 cursor-pointer hover:bg-[#ffad43] rounded-r-md'>
                            <CgSearch size={"24px"} className='text-black' />
                        </div>
                    </div>
                    <div className='flex items-center justify-around w-[20%]'>
                        <div onClick={() => router.push("/signin")} className='cursor-pointer'>
                            <div className='flex'>
                                <h1 className='text-xs hover:underline'>Hello,</h1>
                                <h1 className='text-xs hover:underline'>{`${user ? user.identities[0].identity_data.full_name : "sign in"}`}</h1>
                            </div>
                            <h1 className='font-medium text-sm'>Account & Lists</h1>
                        </div>
                        <div>
                            <p className='text-xs'>Returns</p>
                            <h1 className='font-medium text-sm'>& Orders</h1>
                        </div>
                       
                        <Link href={"/cart"} className='relative cursor-pointer'>
                            <span className='absolute top-0 left-4 bg-yellow-400 text-black rounded-full w-5 h-5 flex items-center justify-center'>{cart.length}</span>
                            <BiCart size={"50px"} />
                            <h1 className='mx-4 mt-1'>Cart</h1>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='bg-[#232F3E] w-full text-white p-2 flex justify-between items-center'>
                <div className='flex overflow-x-auto'>
                {itemList.map((item, idx) => (
                        <Link key={idx} href={links[item]} className='mx-2 hover:border hover:border-white p-2'>
                            {item}
                        </Link>
                    ))}

                </div>
                {user && (
                    <div className='mr-5'>
                        <h1 onClick={async () => {
                            const { error } = await supabase.auth.signOut();
                            if (!error) router.push("/signin");
                        }}
                            className='text-[#FEBD69] font-bold cursor-pointer hover:underline'>Sign out</h1>
                    </div>
                )}
            </div>
        </>
    )
}

export default Header;
