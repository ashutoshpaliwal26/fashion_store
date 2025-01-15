import Link from 'next/link'
import { Facebook, Instagram, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/women" className="text-gray-600 hover:text-gray-800">Women</Link></li>
              <li><Link href="/men" className="text-gray-600 hover:text-gray-800">Men</Link></li>
              <li><Link href="/accessories" className="text-gray-600 hover:text-gray-800">Accessories</Link></li>
              <li><Link href="/sale" className="text-gray-600 hover:text-gray-800">Sale</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-600 hover:text-gray-800">About Us</Link></li>
              <li><Link href="/careers" className="text-gray-600 hover:text-gray-800">Careers</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-gray-800">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-gray-600 hover:text-gray-800">FAQ</Link></li>
              <li><Link href="/returns" className="text-gray-600 hover:text-gray-800">Returns & Exchanges</Link></li>
              <li><Link href="/shipping" className="text-gray-600 hover:text-gray-800">Shipping Information</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-800"><Facebook size={20} /></a>
              <a href="#" className="text-gray-600 hover:text-gray-800"><Instagram size={20} /></a>
              <a href="#" className="text-gray-600 hover:text-gray-800"><Twitter size={20} /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-gray-500">
          <p>&copy; 2023 Chic Couture. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

