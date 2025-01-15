import Image from 'next/image'
import Link from 'next/link'

const products = [
  { id: 1, name: 'Summer Dress', price: 59.99, image: '/placeholder.svg?height=400&width=300' },
  { id: 2, name: 'Casual Shirt', price: 39.99, image: '/placeholder.svg?height=400&width=300' },
  { id: 3, name: 'Denim Jeans', price: 79.99, image: '/placeholder.svg?height=400&width=300' },
  { id: 4, name: 'Sneakers', price: 89.99, image: '/placeholder.svg?height=400&width=300' },
]

const TrendingProducts = () => {
  return (
    <section className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Trending Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="group">
            <div className="relative h-64 mb-4 overflow-hidden rounded-lg">
              <Image
                src={product.image}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default TrendingProducts

