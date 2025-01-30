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

export default function MenPage() {
  const [menProduct, setMenProduct] = useState<IProductDetails[]>([]);
  
  const fetchMenProduct = async() => {
    try{
      const responce = await ApiService.get("/product/men");
      if(responce && responce.data){
        setMenProduct(responce.data.data);
      }
    }catch(err){
      throw err;
    }
  };

  useEffect(()=>{
    fetchMenProduct();
  },[]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Men{"'"}s Collection</h1>
      <ProductGrid products={menProduct} />
    </div>
  )
}

