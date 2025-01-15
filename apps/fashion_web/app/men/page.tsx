import ProductGrid from '../components/ProductGrid'

const menProducts = [
  { id: 1, name: 'Casual Shirt', price: 49.99, image: '/placeholder.svg?height=400&width=300' },
  { id: 2, name: 'Slim Fit Jeans', price: 69.99, image: '/placeholder.svg?height=400&width=300' },
  { id: 3, name: 'Leather Jacket', price: 129.99, image: '/placeholder.svg?height=400&width=300' },
  { id: 4, name: 'Sneakers', price: 79.99, image: '/placeholder.svg?height=400&width=300' },
  // Add more products as needed
]

export default function MenPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Men's Collection</h1>
      <ProductGrid products={menProducts} />
    </div>
  )
}

