'use client'

import HeroSection from './components/HeroSection'
import FeaturedCategories from './components/FeaturedCategories'
import TrendingProducts from './components/TrendingProducts'
import DealsOfTheDay from './components/DealsOfTheDay'

export default function Home() {

  
  return (
    <div className="space-y-12 py-8">
      <HeroSection />
      <FeaturedCategories />
      <TrendingProducts />
      <DealsOfTheDay />
    </div>
  )
}

