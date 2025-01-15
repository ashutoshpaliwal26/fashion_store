import ProductGrid from '../components/ProductGrid'

const accessoriesProducts = [
  { id: 1, name: 'Leather Handbag', price: 99.99, image: '/placeholder.svg?height=400&width=300' },
  { id: 2, name: 'Sunglasses', price: 29.99, image: '/placeholder.svg?height=400&width=300' },
  { id: 3, name: 'Watch', price: 149.99, image: '/placeholder.svg?height=400&width=300' },
  { id: 4, name: 'Scarf', price: 19.99, image: '/placeholder.svg?height=400&width=300' },
  // Add more products as needed
]

export default function AccessoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Accessories</h1>
      <ProductGrid products={accessoriesProducts} />
    </div>
  )
}

