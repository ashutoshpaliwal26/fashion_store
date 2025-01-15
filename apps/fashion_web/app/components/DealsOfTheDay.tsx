import Image from 'next/image'
import Link from 'next/link'
import { Clock } from 'lucide-react'

const deals = [
  { id: 1, name: 'Designer Handbag', originalPrice: 299.99, salePrice: 199.99, image: '/placeholder.svg?height=400&width=300' },
  { id: 2, name: 'Limited Edition Watch', originalPrice: 499.99, salePrice: 349.99, image: '/placeholder.svg?height=400&width=300' },
]

const DealsOfTheDay = () => {
  return (
    <section className="container mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Deals of the Day</h2>
        <div className="flex items-center text-gray-600">
          <Clock size={20} className="mr-2" />
          <span>Ends in 10:45:32</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {deals.map((deal) => (
          <Link key={deal.id} href={`/product/${deal.id}`} className="group">
            <div className="flex flex-col md:flex-row bg-gray-100 rounded-lg overflow-hidden">
              <div className="relative h-64 md:w-1/2">
                <Image
                  src={deal.image}
                  alt={deal.name}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 md:w-1/2">
                <h3 className="text-xl font-semibold mb-2">{deal.name}</h3>
                <div className="flex items-center mb-4">
                  <span className="text-2xl font-bold text-red-600 mr-2">${deal.salePrice.toFixed(2)}</span>
                  <span className="text-gray-500 line-through">${deal.originalPrice.toFixed(2)}</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Save ${(deal.originalPrice - deal.salePrice).toFixed(2)} on this limited time offer!
                </p>
                <button className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 transition-colors">
                  Shop Now
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default DealsOfTheDay

