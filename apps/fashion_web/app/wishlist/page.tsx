'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ShoppingCart } from 'lucide-react'

interface WishlistItem {
  id: number
  name: string
  price: number
  image: string
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    { id: 1, name: 'Summer Dress', price: 59.99, image: '/placeholder.svg?height=300&width=300' },
    { id: 2, name: 'Casual Shirt', price: 39.99, image: '/placeholder.svg?height=300&width=300' },
    { id: 3, name: 'Denim Jeans', price: 79.99, image: '/placeholder.svg?height=300&width=300' },
  ])

  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id))
  }

  const addToCart = (item: WishlistItem) => {
    // Here you would typically add the item to the cart
    console.log('Added to cart:', item)
    // For this example, we'll just remove it from the wishlist
    removeFromWishlist(item.id)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="relative h-64">
                <Image
                  src={item.image}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
                <p className="text-gray-600 mb-4">${item.price.toFixed(2)}</p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => addToCart(item)}
                    className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <ShoppingCart size={20} className="mr-2" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

