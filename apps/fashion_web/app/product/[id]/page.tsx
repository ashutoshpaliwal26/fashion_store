'use client'

import React, { useState, useEffect, use } from 'react'
import Image from 'next/image'
import { Star, ShoppingCart, Heart } from 'lucide-react'
import { ApiService } from '@/app/api/api';
import Loader from '@/app/components/Loader';
import { useRouter } from 'next/navigation';

// Fix the type of params
interface PageProps {
  params: Promise<{
    id: string;
  }>;
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
  whisList: boolean,
  cart: boolean,
  qty : number,
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
    cart: false,
    whisList: false,
    qty : 1
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [whisListLoading, setWishlistLoading] = useState<boolean>(false);
  const [cartLoading, setCartLoading] = useState<boolean>(false);
  const resolveParama = use(params);
  const router = useRouter();

  const getProducts = async () => {
    const i = cartLoading;
    console.log(i);
    
    setLoading(true);
    try {
      const responce = await ApiService.get(`/product/${resolveParama.id}`);
      if (responce && responce.data) {
        setLoading(false);
        setProduct(responce.data.data);
        setIsInWishlist(product.whisList);
      }
      return null;
    } catch (err) {
      throw err;
    }
  };


  const addToCart = async() => {
    setCartLoading(true);
    const user = JSON.parse(localStorage.getItem("user") as string);
    const token = JSON.parse(localStorage.getItem("token") as string);
    if (!token && !user) {
      router.push("/login");
      return;
    }
    const userId = user._id;
    const productId = resolveParama.id;
    try {
      const responce = await ApiService.put(`/product/add/cart/${userId}/${productId}`, "", {
        headers: {
          Authorization: `Bearear ${token}`
        }
      });
      if(responce && responce.data.success){
        window.showToast("Add to Cart Successfully", "SUCCESS", 3000);
      }
      else{
        window.showToast("Error in Adding to Cart", "ERROR", 3000);
      }
    } catch (err) {
      window.showToast((err as Error).message, "ERROR", 3000);
      throw err;
    }
    setCartLoading(false);
  }

  const removeToWatchList = async () => {
    const user = JSON.parse(localStorage.getItem("user") as string);
    const token = JSON.parse(localStorage.getItem("token") as string);
    if (!token && !user) {
      router.push("/login");
      return;
    }
    const userId = user._id;
    const productId = resolveParama.id;
    try {
      await ApiService.put(`/product/remove/whislist/${userId}/${productId}`, "", {
        headers: {
          Authorization: `Bearear ${token}`
        }
      });
      setIsInWishlist(false);
    } catch (err) {
      throw err;
    }
  };

  const addToWatchList = async () => {
    setWishlistLoading(true);
    const user = JSON.parse(localStorage.getItem("user") as string);
    const token = JSON.parse(localStorage.getItem("token") as string);
    if (!token && !user) {
      router.push("/login");
      return;
    }
    const userId = user._id;
    const productId = resolveParama.id;
    try {
      const responce = await ApiService.put(`/product/add/whislist/${userId}/${productId}`, "", {
        headers: {
          Authorization: `Bearear ${token}`
        }
      });
      const getProduct: IProductDetails[] = responce.data.data.product;
      getProduct.filter((product) => setIsInWishlist(product.whisList));
    } catch (err) {
      throw err;
    }
    setWishlistLoading(false);
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
            {isInWishlist ? <button
              onClick={removeToWatchList}
              className={`flex justify-center items-center p-2 border rounded-md transition-colors bg-red-100 border-red-300`}
            >
              {
                whisListLoading ? <Loader /> : <Heart size={20} className={'text-red-500 fill-current'} />
              }
            </button> : <button
              onClick={addToWatchList}
              className={`flex justify-center items-center p-2 border rounded-md transition-colors ${isInWishlist ? 'bg-red-100 border-red-300' : 'hover:bg-gray-100'
                }`}
            >
              {
                whisListLoading ? <Loader /> : <Heart size={20} />
              }
            </button>}
          </div>
        </div>
      </div>
    </div>
  )
}
