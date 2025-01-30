import Image from 'next/image'
import Link from 'next/link'

interface IProductDetails {
  _id: string,
  title: string,
  image: string | null,
  description: string,
  price: number,
  rating: number,
  review: number,
  category: "MEN" | "WOMEN" | "ACCESSORIES",
  whisList: boolean,
  cart: boolean,
}

interface ProductGridProps {
  products: IProductDetails[]
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <Link key={product._id} href={`/product/${product._id}`} className="group">
          <div className="relative h-64 mb-4 overflow-hidden rounded-lg">
            {product.image && <Image
              src={product.image}
              alt={product.title}
              layout="fill"
              objectFit="cover"
              className="group-hover:scale-105 transition-transform duration-300"
            />}
          </div>
          <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
          <p className="text-gray-600">${product.price.toFixed(2)}</p>
        </Link>
      ))}
    </div>
  )
}

export default ProductGrid

