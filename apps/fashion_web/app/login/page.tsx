'use client'

import { ChangeEvent, useState } from 'react'
import Link from 'next/link'
import { ApiService } from '../api/api'
import axios from 'axios'
import Loader from '../components/Loader'

interface IFormData {
  email : string,
  password : string
}

export default function Login() {
  const [formData, setFormData] = useState<IFormData>({
    email : "",
    password : ""
  })
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setFormData((prev)=>({...prev, [e.target.name] : e.target.value}));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault()
    const data = formData;
    setFormData({email : "", password : ""})
    try{
      const responce = await ApiService.post("/login", data);
      if(responce && responce.data){
        window.showToast(responce.data.message, "SUCCESS", 2000);
        localStorage.setItem("user", JSON.stringify(responce.data.data));
        localStorage.setItem("token", JSON.stringify(responce.data.token));
        window.location.href = "/";
        setLoading(false);
      }
    }catch(err){
      setLoading(false);
      if(axios.isAxiosError(err) && err.response){
        window.showToast(err.response.data.message, "ERROR", 3000);
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              id="email"
              placeholder='johndoe@example.com'
              name="email"
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
              placeholder='******'
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="flex justify-center items-center w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
            {
              loading ? <Loader/> : "Login"
            }
          </button>
        </form>
        <p className="mt-4 text-center">
          Don{"'"}t have an account? <Link href="/signup" className="text-blue-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

