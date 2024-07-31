import Image from 'next/image';
import React from 'react';
import Ratings from './shared/Ratings';
import AddToCartContainer from './AddToCartContainer';
import { CiDiscount1 } from "react-icons/ci";
import BankOfferCard from './BankOfferCard';
import EMIOfferCard from './EMIOfferCard';
import PartnerOfferCard from './PartnerOfferCard';

const SingleProduct = ({ singleProduct }: { singleProduct: any }) => {

    return (
        <div className='w-[90%] lg:w-[80%] mx-auto mt-10 dark:text-black'>
            <div className='flex flex-col lg:flex-row justify-between'>
                {singleProduct.map((product: any) => (
                    <div key={product.id} className='flex flex-col lg:flex-row w-full'>
                        <div className='flex justify-center items-center'>
                            <div className='my-12'>
                                <Image className='mix-blend-multiply p-4' src={product.image} width={400} height={400} alt={product.title} />
                            </div>
                        </div>

                        <div className='lg:mx-8 w-full lg:w-[70%]'>
                            <h1 className='font-bold text-xl lg:text-2xl'>{product.title}</h1>
                            <p className='my-4 text-gray-700'>{product.description}</p>
                            <Ratings ratings={product.rating} />
                            <hr className='my-4' />
                            <div className='flex items-center py-4'>
                                <h1 className='font-medium text-2xl text-red-600'>-15%</h1>
                                <h1 className='font-bold text-2xl mx-2 text-gray-800'>{`$${product.price}`}</h1>
                            </div>
                            <p className='text-xs'>M.R.P.: <span className='line-through text-gray-500'>{`₹${product.price*80}`}</span></p>
                            <p className='text-[14px] py-2 text-gray-700'>
                                Inclusive of all taxes<br />
                                <span className='font-bold'>EMI </span>starts at ₹703. No Cost EMI available
                                <span className='text-blue-600 mx-2 cursor-pointer'>EMI options</span>
                            </p>
                            <hr className='my-4' />
                            <div>
                                <div className='flex items-center py-2'>
                                    <CiDiscount1 size={26} />
                                    <h1 className='font-bold text-lg mx-4'>Offers</h1>
                                </div>
                                <div className='flex  flex-row lg:flex-row'>
                                    <div className='mx-2 lg:my-0 lg:mx-2'><BankOfferCard /></div>
                                    <div className='mx-2 lg:my-0 lg:mx-2'><EMIOfferCard /></div>
                                    <div className='mx-2 lg:my-0 lg:mx-2'><PartnerOfferCard /></div>
                                </div>
                            </div>
                            <div className='mt-6'>
                                <h1 className='font-bold text-lg'>About this item</h1>
                                <hr className='my-4' />
                                <ul className='list-disc ml-6 text-gray-700'>
                                    <li className='mb-2'>{product.about_item1}</li>
                                    <li className='mb-2'>{product.about_item2}</li>
                                    <li className='mb-2'>{product.about_item3}</li>
                                </ul>
                            </div>
                        </div>
                        <div className='items-center mt-8 lg:mt-0 lg:ml-8'>
                            <div className='w-[70%]'>
                            <AddToCartContainer product={product} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SingleProduct;
