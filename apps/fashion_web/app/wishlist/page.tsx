'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { X, ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { ApiService } from '../api/api';

interface WishlistItem {
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
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const router = useRouter();

  const removeFromWishlist = async (id: string) => {
    const user = JSON.parse(localStorage.getItem("user") as string);
    const token = JSON.parse(localStorage.getItem("token") as string);
    if (!token && !user) {
      router.push("/login");
      return;
    }
    const userId = user._id;
    try {
      await ApiService.put(`/product/remove/whislist/${userId}/${id}`, "", {
        headers: {
          Authorization: `Bearear ${token}`
        }
      });
    } catch (err) {
      throw err;
    }
    setWishlistItems(wishlistItems.filter(item => item._id !== id));
  }

  const addToCart = async (item: WishlistItem) => {
    const user = JSON.parse(localStorage.getItem("user") as string);
    const token = JSON.parse(localStorage.getItem("token") as string);
    if (!token && !user) {
      router.push("/login");
      return;
    }
    const userId = user._id;
    try {
      const responce = await ApiService.put(`/product/add/cart/${userId}/${item._id}`, "", {
        headers: {
          Authorization: `Bearear ${token}`
        }
      });

      if (responce && responce.data) {
        window.showToast("Add to Cart Successfully", "SUCCESS", 2000);
        return;
      } else {
        window.showToast("Adding Failed", "ERROR", 2000);
      }

    } catch (err) {
      console.log(err);
      window.showToast("Adding Failed", "ERROR", 2000);
      throw err;
    }
    // setWishlistItems(wishlistItems.filter(item => item._id !== _id));
  }

  const getWishlistItem = async () => {
    const user = JSON.parse(localStorage.getItem("user") as string);
    const token = JSON.parse(localStorage.getItem("token") as string);
    if (!user && !token) {
      router.push("/login");
      window.showToast("You Need to Login", "ERROR", 3000);
      return
    }

    const userId = user._id;

    try {
      const responce = await ApiService.get(`/product/whislist/${userId}`, {
        headers: {
          Authorization: `Bearear ${token}`
        }
      });
      if (responce.data && responce.data.data) {
        setWishlistItems(responce.data.data.product);
      }
    } catch (err) {
      throw err;
    }
  }

  useEffect(() => {
    getWishlistItem();
  }, [addToCart]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item._id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="relative h-64">
                {item.image && <Image
                  src={item.image}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                />}
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
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
                    onClick={() => removeFromWishlist(item._id)}
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

