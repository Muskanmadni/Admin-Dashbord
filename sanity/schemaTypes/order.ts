import { init } from "next/dist/compiled/webpack/webpack";

export default {
    name: 'order',
    type: 'document',
    title: 'Order',
    fields: [
        {
            name: 'name',
            type: 'string',
            title: 'Name',
        },
        {
            name: 'email',
            type: 'string',
            title: 'Email',
        },
        {
            name: 'address',
            type: 'string',
            title: 'Address',
        },
        {
            name: 'phone',
            type: 'string',
            title: 'Phone',
        },
        {
            name: 'orderDate',
            type: 'datetime',
            title: 'Order Date',
        },
        {
            name: 'cartItems',
            title: 'cart Items',
            type: 'array',
            of: [
                {
                    name: 'product',
                    title: 'Product',
                    type: 'reference',
                    to: [{ type: 'product'}],
                },
            ],
        },
        {
            name: 'total',
            type: 'number',
            title: 'Total',
        },
        {
            name: 'status',
            type: 'string',
            title: 'Status',
            options: {
                list: [
                    { title: 'Pending', value: 'pending' },
                    { title: 'Processing', value: 'processing' },
                    { title: 'Shipped', value: 'shipped' },
                    { title: 'Delivered', value: 'delivered' },
                    { title: 'Cancelled', value: 'cancelled' },
                ],
                layout: 'radio',
            },
            initialValue: 'pending',
        },

    ],
}