'use client'

import { useEffect, useState } from 'react';
import { ApiService } from '../api/api';
import ProductGrid from '../components/ProductGrid'

// const accessoriesProducts = [
//   { id: 1, name: 'Leather Handbag', price: 99.99, image: '/placeholder.svg?height=400&width=300' },
//   { id: 2, name: 'Sunglasses', price: 29.99, image: '/placeholder.svg?height=400&width=300' },
//   { id: 3, name: 'Watch', price: 149.99, image: '/placeholder.svg?height=400&width=300' },
//   { id: 4, name: 'Scarf', price: 19.99, image: '/placeholder.svg?height=400&width=300' },
//   // Add more products as needed
// ]

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
}

export default function AccessoriesPage() {
  const [accessoriesProducts, setAccessoriesProducts] = useState<IProductDetails[]>([]);
  
  const fetchAccessories = async() => {
    try{
      const responce = await ApiService.get("/product/accessories");
      if(responce && responce.data){
        setAccessoriesProducts(responce.data.data);
      }
    }catch(err){
      throw err;
    }
  };

  useEffect(()=>{
    fetchAccessories();
  },[]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Accessories</h1>
      <ProductGrid products={accessoriesProducts} />
    </div>
  )
}

