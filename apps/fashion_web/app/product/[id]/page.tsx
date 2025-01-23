'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Star, ShoppingCart, Heart } from 'lucide-react'
import { ApiService } from '@/app/api/api';
import Loader from '@/app/components/Loader';

// Fix the type of params
interface PageProps {
  params: {
    id: string;
  };
}

interface IProductDetails {
  _id: string,
  title: string,
  image: string | null,
  description: string,
  price: number,
  rating: number,
  review: number,
  category: "MEN" | "WOMEN" | "ACCESSORIES",
}

export default function ProductDetail({ params }: PageProps) {
  const [quantity, setQuantity] = useState(1)
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [product, setProduct] = useState<IProductDetails>({
    _id: "1",
    title: "",
    image: null,
    description: "",
    price: 0,
    rating: 0,
    review: 0,
    category: "ACCESSORIES",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const getProducts = async () => {
    setLoading(true);
    try {
      const responce = await ApiService.get(`/product/${params.id}`);
      if (responce && responce.data) {
        setLoading(false);
        setProduct(responce.data.data);
      }
      window.showToast(responce.data.message, "ERROR", 3000);
      return null;
    } catch (err) {
      throw err;
    }
  };


  const addToCart = () => {
    // Here you would typically add the item to the cart
    console.log('Added to cart:', { ...product, quantity })
  }

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist)
    // Here you would typically update the wishlist in your backend or local storage
    console.log(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist', product)
  }

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return (<>
      <div className='w-screen h-screen flex justify-center items-center'>
        <Loader />
      </div>
    </>)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative h-96 md:h-[600px]">
          {product.image && <Image
            src={product?.image}
            alt={product?.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />}
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-gray-600">({product.review} reviews)</span>
          </div>
          <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
          <p className="text-gray-600">{product.description}</p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 border-r"
              >
                -
              </button>
              <span className="px-3 py-1">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 border-l"
              >
                +
              </button>
            </div>
            <button
              onClick={addToCart}
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <ShoppingCart size={20} />
              <span>Add to Cart</span>
            </button>
            <button
              onClick={toggleWishlist}
              className={`p-2 border rounded-md transition-colors ${isInWishlist ? 'bg-red-100 border-red-300' : 'hover:bg-gray-100'
                }`}
            >
              <Heart size={20} className={isInWishlist ? 'text-red-500 fill-current' : ''} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
