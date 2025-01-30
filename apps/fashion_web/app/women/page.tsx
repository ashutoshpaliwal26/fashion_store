'use client'
import { useEffect, useState } from 'react';
import ProductGrid from '../components/ProductGrid'
import { ApiService } from '../api/api';

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

export default function WomenPage() {
  const [womenProducts, setWomenProducts] = useState<IProductDetails[]>([]);
  
  const fetchWomenProduct = async() => {
    try{
      const responce = await ApiService.get("/product/men");
      if(responce && responce.data){
        setWomenProducts(responce.data.data);
      }
    }catch(err){
      throw err;
    }
  };

  useEffect(()=>{
    fetchWomenProduct();
  },[]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Women{"'"}s Collection</h1>
      <ProductGrid products={womenProducts} />
    </div>
  )
}

