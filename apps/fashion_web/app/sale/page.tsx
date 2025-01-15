import ProductGrid from '../components/ProductGrid'

const saleProducts = [
  { id: 1, name: 'Summer Dress', price: 39.99, image: '/placeholder.svg?height=400&width=300' },
  { id: 2, name: 'Casual Shirt', price: 29.99, image: '/placeholder.svg?height=400&width=300' },
  { id: 3, name: 'Leather Handbag', price: 69.99, image: '/placeholder.svg?height=400&width=300' },
  { id: 4, name: 'Sneakers', price: 49.99, image: '/placeholder.svg?height=400&width=300' },
  // Add more products as needed
]

export default function SalePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Sale Items</h1>
      <ProductGrid products={saleProducts} />
    </div>
  )
}

