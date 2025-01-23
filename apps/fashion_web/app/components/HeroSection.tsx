import Image from 'next/image'
import Link from 'next/link'

const HeroSection = () => {
  return (
    <section className="relative h-[70vh] overflow-hidden">
      
      <Image
        src="https://res.cloudinary.com/djfi9rtlx/image/upload/v1688242347/box1_image_d22nis.jpg"
        alt="Hero Image"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0" />
      <div className="container mx-auto px-4 h-full flex items-center relative z-0">
        <div className="text-white max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Summer Collection 2023</h1>
          <p className="text-xl mb-8">Discover the hottest trends of the season</p>
          <Link href="/collection/summer-2023" className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors">
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

