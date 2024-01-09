"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';


export default function Page() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [orderName, setOrderName] = useState('');
  const data = useSelector((state: any) => state);
  const [zob, setZob] = useState([]);


  const handleAddOrder = async () => {
    const newOrder = {
      id: uuidv4(),
      created_at: new Date().toISOString(),
      user_id: data.user_id,
      email: data.email,
      name: orderName,
    };

    setOrders([...orders, newOrder]);
    setOrderName('');


    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { data: createdOrder, error } = await supabase
        .from('businesses')
        .upsert(newOrder, { returning: 'minimal' });

      if (error) {
        console.log('Error inserting order:', error);
      } else {
        console.log('Order inserted successfully:', createdOrder);

        // Update the "zob" state with the newly inserted order
        setZob([...zob, createdOrder]);
      }
    } catch (error) {
      console.log('Error inserting order:', error);
    }
  };
  useEffect(() => {
    console.log("user data", data);
    if (data.email === undefined) {
      router.push('/login');

      const fetchBusinesses = async () => {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        const supabase = createClient(supabaseUrl, supabaseKey);

        try {
          const { data: businessData, error } = await supabase
            .from('businesses')
            .select('*');
          if (error) {
            console.log('Error fetching businesses:', error);
          } else {
            setZob(businessData);
          }
        } catch (error) {
          console.log('Error fetching businesses:', error);
        }
      };
      fetchBusinesses();
    }
  }, [])


  return (
    <div className='h-screen w-full text-white bg-gray-900 pt-3 '>
      <h1 className="text-4xl text-center font-bold mb-8">
        Businesses
      </h1>
      <div className="flex items-center justify-center text-gray-100 ">
        <div className="w-1/2">
          <div className="mb-4">
            <label
              className="block text-gray-100 font-bold mb-2"
              htmlFor="orderName"
            >
              Order Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="orderName"
              type="text"
              placeholder="Order Name"
              value={orderName}
              onChange={(e) => setOrderName(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleAddOrder}
            >
              Add Order
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-gray-100 mt-5">
        {orders.map((order, index) => (
          <div key={index} className="bg-gray-800 w-64 p-4 rounded-lg shadow-md my-2">
            <span className="font-semibold">Order Name: {order.name}</span>
            <span>Created By: {order.createdBy}</span>
            <span>Date: {order.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}