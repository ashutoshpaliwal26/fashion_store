import Link from 'next/link'
import { Mail, Phone, MessageCircle } from 'lucide-react'

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Help Center</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <ul className="space-y-4">
            <li>
              <Link href="/faq" className="text-blue-600 hover:underline">View all FAQs</Link>
            </li>
            <li>
              <Link href="/faq#returns" className="text-blue-600 hover:underline">Returns and Exchanges</Link>
            </li>
            <li>
              <Link href="/faq#shipping" className="text-blue-600 hover:underline">Shipping Information</Link>
            </li>
            <li>
              <Link href="/faq#payment" className="text-blue-600 hover:underline">Payment Methods</Link>
            </li>
          </ul>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <Mail className="mr-2 text-gray-400" />
              <a href="mailto:support@chiccouture.com" className="text-blue-600 hover:underline">support@chiccouture.com</a>
            </li>
            <li className="flex items-center">
              <Phone className="mr-2 text-gray-400" />
              <a href="tel:+1234567890" className="text-blue-600 hover:underline">+1 (234) 567-890</a>
            </li>
            <li className="flex items-center">
              <MessageCircle className="mr-2 text-gray-400" />
              <Link href="/contact" className="text-blue-600 hover:underline">Live Chat</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

