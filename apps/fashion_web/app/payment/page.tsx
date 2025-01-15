'use client'

import { useState } from 'react'
import { CreditCard, Smartphone, Truck } from 'lucide-react'

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState('card')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Payment</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
          <div className="space-y-4">
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
        <div>
          {paymentMethod === 'card' && (
            <form className="space-y-4">
              <div>
                <label htmlFor="cardNumber" className="block mb-1 font-medium">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry" className="block mb-1 font-medium">Expiry Date</label>
                  <input
                    type="text"
                    id="expiry"
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="cvv" className="block mb-1 font-medium">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    placeholder="123"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
            </form>
          )}
          {paymentMethod === 'upi' && (
            <form className="space-y-4">
              <div>
                <label htmlFor="upiId" className="block mb-1 font-medium">UPI ID</label>
                <input
                  type="text"
                  id="upiId"
                  placeholder="yourname@upi"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </form>
          )}
          {paymentMethod === 'cod' && (
            <p className="text-gray-600">You will pay in cash when your order is delivered.</p>
          )}
          <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
            Place Order
          </button>
        </div>
      </div>
    </div>
  )
}

