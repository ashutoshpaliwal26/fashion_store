import Image from 'next/image'
import Link from 'next/link'

const categories = [
  { name: 'Women', image: '/placeholder.svg?height=400&width=300', link: '/women' },
  { name: 'Men', image: '/placeholder.svg?height=400&width=300', link: '/men' },
  { name: 'Accessories', image: '/placeholder.svg?height=400&width=300', link: '/accessories' },
]

const FeaturedCategories = () => {
  return (
    <section className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Featured Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link key={category.name} href={category.link} className="group">
            <div className="relative h-80 overflow-hidden rounded-lg">
              <Image
                src={category.image}
                alt={category.name}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-semibold">{category.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default FeaturedCategories

