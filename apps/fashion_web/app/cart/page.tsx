'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import { ApiService } from '../api/api'
import { useRouter } from 'next/navigation'

interface CartItem {
  _id: string,
  title: string,
  image: string | null,
  description: string,
  price: number,
  rating: number,
  review: number,
  category: "MEN" | "WOMEN" | "ACCESSORIES",
  whisList: boolean,
  cart: boolean,
  qty: number
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const rouetr = useRouter();

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems(cartItems.map(item =>
      item._id === id ? { ...item, qty: Math.max(1, newQuantity) } : item
    ))
  }

  const removeItem = async (id: string) => {
    const user = JSON.parse(localStorage.getItem("user") as string);
    const token = JSON.parse(localStorage.getItem("token") as string);

    if (!user && !token) {
      return
    }

    try {
      const responce = await ApiService.put(`/product/remove/cart/${user._id}/${id}`, "", {
        headers: {
          Authorization: `Bearear ${token}`
        }
      });

      if (responce && responce.data) {
        setCartItems(responce.data.data.product);
      }
    } catch (err) {
      throw err;
    }

  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)

  const handleCheckout = () => {
    const checkOutProduct = {cartItems, total};
    localStorage.setItem("cartItem", JSON.stringify(checkOutProduct));
    rouetr.push("/payment");
  }


  const getAllCartProduct = async () => {
    const user = JSON.parse(localStorage.getItem("user") as string);
    const token = JSON.parse(localStorage.getItem("token") as string);

    if (!user && !token) {
      return
    }

    try {
      const responce = await ApiService.get(`/product/cart/${user._id}`, {
        headers: {
          Authorization: `Bearear ${token}`
        }
      });

      if (responce && responce.data) {
        setCartItems(responce.data.data.product);
      }
    } catch (err) {
      throw err;
    }

  }

  useEffect(() => {
    getAllCartProduct();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">

            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center space-x-4 border-b pb-4">
                {item.image && <Image src={item.image} alt={item.title} width={100} height={100} className="rounded-md" />}
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => updateQuantity(item._id, item.qty - 1)}
                      className="px-2 py-1 border rounded-l-md"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-t border-b">{item.qty}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.qty + 1)}
                      className="px-2 py-1 border rounded-r-md"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button onClick={() => removeItem(item._id)} className="text-red-500">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
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
              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors mt-6"
              >
                Proceed to Checkout
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  )
}

