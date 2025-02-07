"use client"
import React, { useEffect, useState } from 'react';
import Protectedroute from '@/app/fonts/components/protected/page';
import { client } from '@/sanity/lib/client';
import Swal from 'sweetalert2';

interface Order {
    _id: string;
    name: string;
    email: string;
    address: string;
    phone: string;
    orderDate: string;
    total: number;
    cartItems: { name: string, image: string }[];
    status: string;
}

export default function AdminDashboard() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        client.fetch(`
            *[_type == "order"]{
                _id, name, email, address, phone, orderDate,total,
                cartItems[]->{ name, image},
                status
            }
        `)
            .then((data) => setOrders(data))
            .catch((error) => console.error(error));
    }, []);

    const filteredOrders = filter === "All" ? orders : orders.filter((order) => order.status === filter);

    async function handleStatusChange(orderId: string, newStatus: string) {
        try {
            await client.patch(orderId).set({ status: newStatus }).commit();
            setOrders((prevOrders) => prevOrders.map((order) =>
                order._id === orderId ? { ...order, status: newStatus } : order
            ));
            Swal.fire("Success", `Order status updated to ${newStatus}`, "success");
        } catch (error) {
            Swal.fire("Error", "Failed to update order", "error");
        }
    }

    async function handleDelete(orderId: string) {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (!result.isConfirmed) return;

        try {
            await client.delete(orderId);
            setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
            Swal.fire('Deleted!', 'Order successfully deleted', "success");
        } catch (error) {
            Swal.fire("Error", "Failed to delete order", "error");
        }
    }

    return (
        <Protectedroute>
            <section className='flex flex-col px-4 py-6'>
                <nav className='bg-violet-950 text-white p-4 rounded-md shadow-md'>
                    <h2 className='text-2xl font-semibold'>Admin Dashboard</h2>
                    <div className='flex space-x-4 mt-2'>
                        {["All", "pending", "Processing", "shipped", "delivered", "cancelled"].map((status) => (
                            <button
                                key={status}
                                className={`px-4 py-2 rounded-lg transition-all hover:bg-gray-700 focus:outline-none ${filter === status ? "bg-white text-violet-950 font-semibold" : "text-white"}`}
                                onClick={() => setFilter(status)}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                        ))}
                    </div>
                </nav>
                <div className='overflow-x-auto mt-6'>
                    <h2 className='font-bold text-center text-xl mb-4'>Orders</h2>
                    <table className='w-full table-auto border-collapse border border-gray-300 rounded-md'>
                        <thead>
                            <tr className='bg-gray-200'>
                                <th className='px-4 py-2 text-left font-semibold'>Order ID</th>
                                <th className='px-4 py-2 text-left font-semibold'>Name</th>
                                <th className='px-4 py-2 text-left font-semibold'>Order Date</th>
                                <th className='px-4 py-2 text-left font-semibold'>Status</th>
                                <th className='px-4 py-2 text-left font-semibold'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <React.Fragment key={order._id}>
                                    <tr
                                        className='border-b hover:bg-gray-50 cursor-pointer'
                                        onClick={() => setSelectedOrderId(order._id)}
                                    >
                                        <td className='px-4 py-2'>{order._id}</td>
                                        <td className='px-4 py-2'>{order.name}</td>
                                        <td className='px-4 py-2'>{new Date(order.orderDate).toLocaleDateString()}</td>
                                        <td className='px-4 py-2'>
                                            <select
                                                value={order.status || ""}
                                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                className='px-2 py-1 rounded border'
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="Processing">Processing</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td className='px-4 py-2'>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleDelete(order._id); }}
                                                className='bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600'
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                    {selectedOrderId === order._id && (
                                        <tr>
                                            <td colSpan={5} className='bg-gray-100 p-4'>
                                                <h3 className='font-semibold'>Order Details</h3>
                                                <p><strong>Phone:</strong> {order.phone}</p>
                                                <p><strong>Email:</strong> {order.email}</p>
                                                <p><strong>Address:</strong> {order.address}</p>
                                                <p><strong>Total:</strong> ${order.total}</p>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </Protectedroute>
    );
}








