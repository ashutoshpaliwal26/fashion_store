'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, ShoppingBag, User, X, ChevronDown, Heart } from 'lucide-react'
import { ApiService } from '../api/api'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface Product {
  id: number
  name: string
  price: number
}

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // This should be controlled by your auth state
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  // Simulated product data
  const products: Product[] = [
    { id: 1, name: 'Summer Dress', price: 59.99 },
    { id: 2, name: 'Casual Shirt', price: 39.99 },
    { id: 3, name: 'Denim Jeans', price: 79.99 },
    { id: 4, name: 'Sneakers', price: 89.99 },
  ]

  const handleLogOut = ()=>{
    localStorage.clear();
    setIsLoggedIn(false);
  }

  useEffect(() => {
    // Simulating fetching cart items from an API or local storage
    const checkLogin = async() => {
      const token = JSON.parse(localStorage.getItem("token") as string);
      try{ 
        const responce = await ApiService.get("/", {
          headers : {
            Authorization : `Bearear ${token}`
          }
        });
        if(responce.data.success){
          console.log(responce.data.success);
          setIsLoggedIn(true);
        }
      }catch(err){
        setIsLoggedIn(false);
        throw err;
      }
    }

    checkLogin();
    
    setCartItems([
      { id: 1, name: 'Summer Dress', price: 59.99, quantity: 1 },
      { id: 2, name: 'Casual Shirt', price: 39.99, quantity: 2 },
    ]);
  }, [isLoggedIn])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === '') {
      setSearchResults([])
    } else {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(results)
    }
  }

  
  useEffect(() => {
    const handelClickOutSide:EventListener = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handelClickOutSide);

    return(()=>{
      document.removeEventListener("mousedown", handelClickOutSide);
    })
  }, [])

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Chic Couture
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link href="/women" className="text-gray-600 hover:text-gray-800">Women</Link>
          <Link href="/men" className="text-gray-600 hover:text-gray-800">Men</Link>
          <Link href="/accessories" className="text-gray-600 hover:text-gray-800">Accessories</Link>
          <Link href="/sale" className="text-gray-600 hover:text-gray-800">Sale</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            {isSearchOpen ? <X size={20} /> : <Search size={20} />}
          </button>
          <div className="relative">
            <button
              className="text-gray-600 hover:text-gray-800 flex items-center"
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            >
              <User size={20} />
              {isLoggedIn && <ChevronDown size={16} className="ml-1" />}
            </button>
            {isUserDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10" ref={dropDownRef}>
                {isLoggedIn ? (
                  <>
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                    <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Orders</Link>
                    <Link href="/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Wishlist</Link>
                    <Link href="/payment" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Payment Details</Link>
                    <Link href="/help" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Help</Link>
                    <button onClick={handleLogOut} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Login</Link>
                    <Link href="/signup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Up</Link>
                  </>
                )}
              </div>
            )}
          </div>
          <Link href="/wishlist" className="text-gray-600 hover:text-gray-800">
            <Heart size={20} />
          </Link>
          <Link href="/cart" className="text-gray-600 hover:text-gray-800 relative">
            <ShoppingBag size={20} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </Link>
        </div>
      </div>
      {isSearchOpen && (
        <div className="container mx-auto px-4 py-4 animate-fade-in-down">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchResults.length > 0 && (
            <div className="mt-2 bg-white border rounded-md shadow-lg">
              {searchResults.map(product => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-gray-600">${product.price.toFixed(2)}</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </header>
  )
}

export default Header

