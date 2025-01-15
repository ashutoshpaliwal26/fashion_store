import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">About Chic Couture</h1>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="mb-4">
            Chic Couture was founded in 2010 with a simple mission: to bring affordable, high-quality fashion to everyone. 
            We believe that looking good break the bank, and that everyone deserves to feel confident in what they wear.
          </p>
          <p className="mb-4">
            Our team of passionate designers work tirelessly to bring you the latest trends and timeless classics. 
            We source our materials ethically and strive to minimize our environmental impact in every step of our production process.
          </p>
          <p>
            At Chic Couture,more than just a fashion brand - a community. We celebrate diversity and individuality, 
            and committed to helping our customers express themselves through fashion.
          </p>
        </div>
        <div className="relative h-96">
          <Image
            src="/placeholder.svg?height=600&width=600"
            alt="Chic Couture Team"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Quality</h3>
            <p>We never compromise on quality. Every piece we create is made to last.</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
            <p> committed to reducing our environmental impact and promoting sustainable fashion.</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Inclusivity</h3>
            <p>We design for everyone. Our sizes range from XS to 3XL to fit all body types.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

