'use client'

import { useState, useEffect } from 'react'
import { Package, Truck, CheckCircle } from 'lucide-react'

interface Order {
  id: string
  product: string
  date: string
  status: 'processing' | 'shipped' | 'delivered'
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    // Simulating API call to fetch orders
    const fetchedOrders: Order[] = [
      { id: '1', product: 'Classic White T-Shirt', date: '2023-05-15', status: 'processing' },
      { id: '2', product: 'Blue Jeans', date: '2023-05-10', status: 'shipped' },
      { id: '3', product: 'Leather Jacket', date: '2023-05-05', status: 'delivered' },
    ]
    setOrders(fetchedOrders)
  }, [])

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return <Package className="text-blue-500" />
      case 'shipped':
        return <Truck className="text-yellow-500" />
      case 'delivered':
        return <CheckCircle className="text-green-500" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-6 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{order.product}</h2>
              <div className="flex items-center space-x-2">
                {getStatusIcon(order.status)}
                <span className="capitalize">{order.status}</span>
              </div>
            </div>
            <p className="text-gray-600">Order ID: {order.id}</p>
            <p className="text-gray-600">Order Date: {order.date}</p>
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ease-out ${
                  order.status === 'processing' ? 'w-1/3 bg-blue-500' :
                  order.status === 'shipped' ? 'w-2/3 bg-yellow-500' :
                  'w-full bg-green-500'
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

