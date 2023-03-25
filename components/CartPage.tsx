import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import {
    emptyCart,
    phoneImg,
    ship1Img,
    ship2Img,
    ship3Img,
    warningImg,
} from '../public/assets/images';
import { TbReload } from "react-icons/tb";
import { HiMinusSmall } from 'react-icons/hi2';
import { MdOutlineAdd } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';
import { StoreProduct } from '../type';
import { isTemplateMiddle } from 'typescript';
import FormatePrice from './FormatePrice';
import { deleteItem, resetCart, minusQuantity, plusQuantity } from '../redux/shopperSlice';



const CartPage = () => {
    const dispatch = useDispatch();
    const productData = useSelector((state: any) => state.shopper.productData);
    const [warningMsg, setWarningMsg] = useState(false);
    // Price
    const [totalOldPrice, setTotalOldPrice] = useState();
    const [totalSavings, setTotalSavings] = useState();
    const [totalAmt, setTotalAmt] = useState();

    useEffect(() => {
        setWarningMsg(true);
        let oldPrice = 0;
        let savings = 0;
        let amt = 0;
        productData.map((item:StoreProduct) => {
            oldPrice += item.oldPrice * item.quantity;
            savings += item.oldPrice - item.price;
            amt += item.price * item.quantity;
            return 
        });
        setTotalOldPrice(oldPrice);
        setTotalSavings(savings);
        setTotalAmt(amt);
    }, [productData])
    
  return (
    <div className='w-full py-10'>
        <div className='w-full flex gap-10'>
            <div className='w-2/3 flex flex-col gap-5'>
                <h1 className='text-2xl font-bold text-black'>
                    Cart{" "}
                    <span className='text-lightText font-normal'>
                        ({productData.length} items)
                    </span>
                </h1>
                {/* Pickup details */}
                <div className='text-xl font-bold flex items-center gap-2 mb-2'>
                    <Image className="w-10" src={phoneImg} alt="phoneImg"/>
                    <p>Pickup and delivery options</p>
                </div>
                <div className='w-full grid grid-cols-3 gap-4 text-xs'>
                            <div className='w-full border border-[#a6a1a2] rounded-md flex flex-col items-center justify-center p-2'>
                                <Image className='w-10' src={ship1Img} alt="shippingImage"/>
                                <p className='font-bold'>Shipping</p> 
                                <p>All items available</p> 
                                
                            </div>
                            <div className='w-full border border-[#a6a1a2] rounded-md flex flex-col items-center justify-center p-2'>
                                <Image className='w-10' src={ship2Img} alt="shippingImage"/>
                                <p className='font-bold'>Pickup</p> 
                                <p>All items available</p> 
                                
                            </div>
                            <div className='w-full border border-[#a6a1a2] rounded-md flex flex-col items-center justify-center p-2'>
                                <Image className='w-10' src={ship3Img} alt="shippingImage"/>
                                <p className='font-bold'>Delivery</p> 
                                <p>All items available</p>  
                            </div>
                        </div>
                        {/* Cart product */}
                            <div className='w-full p-5 border-[1px] border-[#a6a1a2] rounded-md flex flex-col gap-4'>
                                <p className='font-semibold text-sm border-[#9a9596]'>
                                    Sold end shipped by {" "} <span className='text-black font-semibold'>Shoppers.com</span>
                                </p>
                                <div className='flex gap-2'>
                                <button className='px-2 py-[1px] text-[#004f9a] text-sm border-[1px]'>
                                    Best seller
                                </button>
                                <button className='px-2 py-[1px] text-[#E53935] text-sm border-[1px] border-[#E53935] rounded-sm'>
                                    Rollback
                                </button>
                            </div>
                            {/* Items */}
                            <div>
                                {productData.map((item:StoreProduct) => (
                                    <div key={item._id}
                                    className="flex items-center justify-between gap-4 border-b-[1px] border-[#c4c1c1] pb-4"
                                    >
                                        <div className='w-3/4 flex items-center gap-2'>
                                            <Image className='w-32'
                                            width={500}
                                            height={500}
                                            src={item.image}
                                            alt="productImg"
                                            />
                                            <div>
                                                <h2 className='text-base text-[#4e4b4b]'>
                                                    {item.title}
                                                </h2>
                                                <p className='text-sm text-[#676363]'>{item.description}</p>
                                                <p className='text-sm text-[#676363]'>price: ${item.price}</p>
                                                <p className='text-sm text-[#676363] flex items-center gap-1'>
                                                    <span className='bg-blue rounded-full text-white text-xs w-4 h-4
                                                    flex items-center justify-center'>
                                                        <TbReload className='rotate-180'/>
                                                    </span>
                                                    Free 30-day returns
                                                </p>
                                                <div className='mt-2 flex items-center gap-6'>
                                                    <button
                                                    onClick={() => dispatch(deleteItem(item._id))}
                                                    className='text-sm underline underline-offset-2 decoration-[1px] text-[#676363]
                                                    hover:no-underline hover:text-blue duration-300'
                                                    >
                                                        Remove
                                                    </button>
                                                    {/* Buttons */}
                                                    <div className='w-28 h-9 border border-[#a6a1a2] rounded-full 
                                                        text-base font-semibold text-black flex items-center 
                                                        justify-between px-3'
                                                        >
                                                        <button
                                                            onClick={() => dispatch(minusQuantity({
                                                                _id: item._id,
                                                                title: item.title,
                                                                oldPrice: item.oldPrice,
                                                                price: item.price,
                                                                description: item.description,
                                                                brand: item.brand,
                                                                category: item.category,
                                                                image: item.image,
                                                                quantity: 1,
                                                            }))}
                                                            className='text-base w-5 h-5 text-[#6f6b6b] hover:bg-[#74767c] hover:text-white
                                                            rounded-full flex items-center justify-center cursor-pointer duration-200'
                                                        >
                                                        <HiMinusSmall/>
                                                        </button>
                                                            <span>{item.quantity}</span>
                                                            <button
                                                            onClick={() => dispatch(plusQuantity({
                                                                _id: item._id,
                                                                title: item.title,
                                                                oldPrice: item.oldPrice,
                                                                price: item.price,
                                                                description: item.description,
                                                                brand: item.brand,
                                                                category: item.category,
                                                                image: item.image,
                                                                quantity: 1,
                                                            }))}
                                                            className='text-base w-5 h-5 text-[#6f6b6b] hover:bg-[#74767c] hover:text-white
                                                            rounded-full flex items-center justify-center cursor-pointer duration-200'
                                                            >
                                                                <MdOutlineAdd/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                           
                                        </div>
                                        <div className='w-1/4 text-right flex flex-col items-end gap-1'>
                                            <p
                                            className='font-semibold text-xl text-[#2a8703]'
                                            >
                                                <FormatePrice amount={item.price * item.quantity}/>
                                            </p>
                                            <p
                                            className='text-sm line-through text-[#7c7878]'
                                            >
                                                <FormatePrice amount={item.oldPrice * item.quantity}/>
                                            </p>
                                            <div className='flex items-center text-xs gap-2'>
                                                <p className='bg-[#c6efd2] text-[8px] uppercase px-2 py-[1px]'>You save</p>
                                                <p className='text-[#2a8703] font-semibold'>
                                                    <FormatePrice
                                                    amount = {
                                                        item.price * item.quantity - item.oldPrice * item.quantity
                                                    }
                                                    
                                                    />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => dispatch(resetCart())}
                             className='w-44 bg-[#F44336] text-white h-10 rounded-full text-base font-semibold 
                            hover:bg-[#C62828] duration-300'
                            >
                                Reset Cart
                            </button>
                        </div>
            </div>
            <div className='w-2/3 p-4 mt-24 h-[500px] border-[1px] border-[#8D8586] 
            rounded-md flex flex-col justify-center gap-4'
            >
            <div className='w-full flex flex-col gap-4 border-b-[1px] border-b-[#b5afb0] pb-4'>
                <button className='bg-blue hover:bg-hoverBg w-full text-white
                    h-10 rounded-full font-semibold duration-300'
                    >
                        Continue to checkout
                 </button>
                 <p className='text-sm text-center text-[#F44336] -mt-4 font-semibold'
                 >
                        Please sign for checkout
                 </p>
                 {
                    warningMsg && (
                    <div className='bg-[#002d58] text-white p-2 rounded-lg flex items-center justify-between gap-4'>
                        <Image className='w-8' src={warningImg} alt="warningImg"/>
                        <p className='text-sm'>
                            Items in your cart have reduced prices. Check out now for extra savings!
                        </p>
                        <IoMdClose 
                        onClick={() => setWarningMsg(false)}
                        className='text-3xl hover:text-[#de5147] cursor-pointer duration-200'
                        />
                    </div>
                 )}
                 <p className='text-sm text-center'>
                        For the best shopping experience,{" "}
                        <span className='underline underline-offset-2 decoration-[1px] cursor-pointer'>
                            sign in
                        </span>
                 </p>
            </div>
                    {/* checkout price */}
                    <div className='w-full flex flex-col gap-4 border-b-[1px] border-b-[#b5afb0] pb-4'>
                        <div className='flex flex-col gap-1'>
                            <div className='text-sm flex justify-between'>
                                <p className='font-semibold'>Subtotal 
                                    <span>
                                    ({productData.length} items)
                                    </span>
                                </p>
                                <p className='line-trough text-[#8D8586] text-base'>
                                    <FormatePrice amount={totalOldPrice}/>
                                </p>
                            </div>
                            <div className='text-sm flex justify-between'>
                                <p className='font-semibold'>
                                    Savings
                                </p>
                                <p className='text-[#2a8703] font-bold bg-[#c6efd2] py-1 px-[2px]'>
                                    -<FormatePrice amount={totalSavings}/>
                                </p>
                            </div>
                            <div className='text-sm flex justify-between'>
                                <p className='font-semibold'>
                                    Total Amount
                                </p>
                                <p className='text-[#565151] font-normal text-base'>
                                    <FormatePrice amount={totalAmt}/>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex flex-col gap-4 border-b-[1px] border-b-[#b5afb0] pb-4'>
                        <div className='flex flex-col gap-1'>
                            <div className='text-sm flex justify-between'>
                                <p>Shipping</p>
                                <p className='text-[#2a8703]'>Free</p>
                            </div>
                            <div className='text-sm flex justify-between'>
                                <p className='font-semibold'>Texes</p>
                                <p className='text-[#565151]'>Calculated at checkout</p>
                            </div>
                        </div>
                    </div>
                    <div className='text-sm flex justify-between'>
                            <p>Estimated total</p>
                            <p className='text-[#565151] font-bold text-lg'>
                                <FormatePrice amount={totalAmt}/>
                            </p>
                        </div>
            </div>
        </div>
    </div>
  )
}

export default CartPage;