import Image from 'next/image';
import React from 'react';

const UserProfile = () => {
  // Exemple de données utilisateur (tu peux les récupérer depuis une API)
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    address: '123 Main Street, City, Country',
    avatarUrl: 'https://via.placeholder.com/150',
  };

  const orders = [
    {
      id: 1,
      date: '2024-10-10',
      total: '$250.00',
      status: 'Shipped',
    },
    {
      id: 2,
      date: '2024-09-20',
      total: '$100.00',
      status: 'Delivered',
    },
  ];

  return (
    <div className='max-w-5xl mx-auto p-6'>
      <div className='bg-white shadow-md rounded-lg p-4'>
        {/* User Info Section */}
        <div className='flex items-center space-x-6 mb-4'>
          <Image
            width={40}
            height={40}
            src={user.avatarUrl}
            alt='User Avatar'
            className='w-24 h-24 rounded-full border-2 border-gray-200'
          />
          <div>
            <h2 className='text-2xl font-semibold'>{user.name}</h2>
            <p className='text-gray-600'>{user.email}</p>
            <p className='text-gray-600'>{user.phone}</p>
          </div>
        </div>

        {/* User Address Section */}
        <div className='mb-6'>
          <h3 className='text-xl font-medium'>Shipping Address</h3>
          <p className='text-gray-700'>{user.address}</p>
        </div>

        {/* Orders Section */}
        <div className='mb-6'>
          <h3 className='text-xl font-medium mb-4'>Recent Orders</h3>
          <table className='w-full text-left table-auto border-collapse'>
            <thead>
              <tr className='bg-gray-100 text-gray-800'>
                <th className='p-2'>Order ID</th>
                <th className='p-2'>Date</th>
                <th className='p-2'>Total</th>
                <th className='p-2'>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className='border-b'>
                  <td className='p-2'>{order.id}</td>
                  <td className='p-2'>{order.date}</td>
                  <td className='p-2'>{order.total}</td>
                  <td
                    className={`p-2 ${
                      order.status === 'Shipped'
                        ? 'text-yellow-500'
                        : 'text-green-500'
                    }`}>
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Profile Section */}
        <div className='flex justify-end'>
          <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg'>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
