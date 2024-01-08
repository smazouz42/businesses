"use client";
import { useState } from 'react';

export default function Page() {
  const [orders, setOrders] = useState([]);
  const [orderName, setOrderName] = useState('');
  const [createdBy, setCreatedBy] = useState('');

  const handleAddOrder = () => {
    const newOrder = {
      name: orderName,
      createdBy,
      date: new Date().toLocaleDateString(),
    };
    setOrders([...orders, newOrder]);
    setOrderName('');
    setCreatedBy('');
  };

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