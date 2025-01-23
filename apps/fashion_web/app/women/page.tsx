import ProductGrid from '../components/ProductGrid'

const womenProducts = [
  { id: 1, name: 'Summer Dress', price: 59.99, image: '/placeholder.svg?height=400&width=300' },
  { id: 2, name: 'Elegant Blouse', price: 39.99, image: '/placeholder.svg?height=400&width=300' },
  { id: 3, name: 'Skinny Jeans', price: 79.99, image: '/placeholder.svg?height=400&width=300' },
  { id: 4, name: 'High Heels', price: 89.99, image: '/placeholder.svg?height=400&width=300' },
  // Add more products as needed
]

export default function WomenPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Women{"'"}s Collection</h1>
      <ProductGrid products={womenProducts} />
    </div>
  )
}

