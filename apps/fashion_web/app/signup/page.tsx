'use client'

import { ChangeEvent, useState } from 'react'
import Link from 'next/link'
import Loader from '../components/Loader'
import { ApiService } from '../api/api'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface IFormData {
  name : string,
  email : string,
  password : string,
}

export default function Signup() {
  const [formData, setFormData] = useState<IFormData>({
    name : "",
    email : "",
    password : ""
  })
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setFormData((prev)=> ({...prev , [e.target.name] : e.target.value}))
  }
  
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true);
    const data = formData;
    setFormData({name : "", email : "", password : ""});
    try{
      const responce = await ApiService.post("/signup", data);
      window.showToast(responce.data.message, "SUCCESS", 2000);
      localStorage.setItem("user" , JSON.stringify(responce.data.data));
      localStorage.setItem("token" , JSON.stringify(responce.data.token));
      router.push("/");
    }catch(err){
      if(axios.isAxiosError(err) && err.response){
        console.log(err.response.data.message);
        window.showToast(err.response.data.message, "ERROR", 3000);
      }
    }
    setTimeout(()=>{
      setLoading(false);
    }, 1000);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              id="email"
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              id="password"
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors flex justify-center items-center">
            {loading ? <Loader/> : "Signup"}
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  )
}

