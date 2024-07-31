import React from 'react';
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios';
import { supabase } from '@/lib/supabase/products';
import { useAppSelector } from '@/lib/supabase/hooks/redux';
import { getCart } from '@/redux/cartSlice';



const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!);

const OrderSummary = () => {
    
    const cart = useAppSelector(getCart)

    let totalPrice = 0;
    cart.forEach((item:any) => {
        totalPrice += item.price * item.quantity;
    });
    totalPrice=Math.ceil(totalPrice);

    let GrandTotal=totalPrice+cart.length+5.05-3.04;

    const createStripeSession = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        const stripe = await stripePromise;
        const checkoutSession = await axios.post("/api/checkout-sessions", {
            items: cart,
            email: user?.email,
        });

        //redirect to checkout session
        const result= await stripe?.redirectToCheckout({
            sessionId:checkoutSession.data.id,
        })

        if (result?.error){
            console.log(result.error.message);
        }
    }

    return (
        <div className='border border-gray-300 p-2 rounded-md h-fit w-[100%] text-sm m-4 '>
            <div className='p-2'>
                <h1 className='font-bold text-lg p-2'>Order Summary</h1>
                <div className='p-1'>
                    <div className='border-b border-gray-300 '>
                        <div className='flex items-center justify-between '>
                            <p>Items</p>
                            <p>{cart.length}</p>
                        </div>
                        <div className='flex items-center justify-between'>
                            <p>Delivery</p>
                            <p>$5.05</p>
                        </div>
                        <div className='flex items-center justify-between'>
                            <p>Total</p>
                            <p>{`$${totalPrice}`}</p>
                        </div>
                        <div className='flex items-center justify-between '>
                            <p>Promotion Applied</p>
                            <p>$3.04</p>
                        </div>
                    </div>
                    <div className='py-1 border-b border-gray-300 '>
                        <div className='flex items-center justify-between'>
                            <h1 className='font-bold text-lg p-2 text-red'><span className='text-[#eb1f10]'>Order Total</span></h1>
                            <h1 className='font-bold text-lg p-2 text-red'><span className='text-[#eb1f10]'>{`$${GrandTotal}`}</span></h1>
                        </div>
                    </div>
                </div>

                <button onClick={()=>{
                    createStripeSession();
                }} className='bg-[#FFD814] w-full rounded-md px-4 py-2 my-4'>Place Your Order Now</button>
            </div>
        </div>
    )
}

export default OrderSummary