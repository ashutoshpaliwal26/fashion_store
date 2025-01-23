'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Trash2, CreditCard, Smartphone, Truck } from 'lucide-react'

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: 'Summer Dress', price: 59.99, image: '/placeholder.svg?height=100&width=100', quantity: 1 },
    { id: 2, name: 'Casual Shirt', price: 39.99, image: '/placeholder.svg?height=100&width=100', quantity: 2 },
  ])

  const [paymentMethod, setPaymentMethod] = useState('card')
  const [step, setStep] = useState(1)

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    ))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = () => {
    setStep(2)
  }

  const handlePayment = () => {
    // Here you would typically process the payment
    console.log('Processing payment...')
    setStep(3)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {step === 1 && (
              <>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                    <Image src={item.image} alt={item.name} width={100} height={100} className="rounded-md" />
                    <div className="flex-grow">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
                      <div className="flex items-center mt-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 border rounded-l-md"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border-t border-b">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 border rounded-r-md"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-red-500">
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 p-4 border rounded-md cursor-pointer transition-colors hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="form-radio"
                    />
                    <CreditCard size={24} />
                    <span>Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center space-x-3 p-4 border rounded-md cursor-pointer transition-colors hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="form-radio"
                    />
                    <Smartphone size={24} />
                    <span>UPI Payment</span>
                  </label>
                  <label className="flex items-center space-x-3 p-4 border rounded-md cursor-pointer transition-colors hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="form-radio"
                    />
                    <Truck size={24} />
                    <span>Cash on Delivery</span>
                  </label>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4">Thank You for Your Order!</h2>
                <p>Your order has been placed successfully. We{"'"}ll send you an email with the order details shortly.</p>
              </div>
            )}
          </div>
          <div className="md:col-span-1">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              {step === 1 && (
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors mt-6"
                >
                  Proceed to Checkout
                </button>
              )}
              {step === 2 && (
                <button 
                  onClick={handlePayment}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors mt-6"
                >
                  Complete Payment
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

