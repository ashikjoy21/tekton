"use client"

import { useState } from "react"
import { SearchBar } from "../components/search-bar"
import { FilterOptions } from "../components/filter-options"
import { ProductGrid } from "../components/product-grid"

const artisanProducts = [
  { id: "a1", name: "Meenakari Earrings", price: 4500, imageUrl: "https://images.unsplash.com/photo-1630019852942-f89202989a59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", sellerType: "online", category: "Traditional jewelry" },
  { id: "a2", name: "Terracotta Vase", price: 2500, imageUrl: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", sellerType: "online", category: "Pottery" },
  { id: "a3", name: "Wooden Elephant Carving", price: 5000, imageUrl: "data:image/jpeg;base64,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", sellerType: "offline", category: "Wooden carvings" },
  { id: "a4", name: "Brass Diya Lamp", price: 1800, imageUrl: "https://images.unsplash.com/photo-1609159125016-a1fc58f00675?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", sellerType: "online", category: "Metal crafts" },
  { id: "a5", name: "Madhubani Painting", price: 8000, imageUrl: "https://images.unsplash.com/photo-1582738412145-b8e4ade6a374?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", sellerType: "online", category: "Other artisan-made goods" },
  { id: "a6", name: "Pashmina Shawl", price: 12000, imageUrl: "https://images.unsplash.com/photo-1606302532738-6c4a66d5c9a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", sellerType: "offline", category: "Handwoven textiles" },
  { id: "a7", name: "Blue Pottery Plate", price: 3500, imageUrl: "https://images.unsplash.com/photo-1590502593389-d55c79d0dc6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", sellerType: "online", category: "Pottery" },
  { id: "a8", name: "Sandalwood Carving", price: 7500, imageUrl: "https://images.unsplash.com/photo-1624687943971-e86af76d57de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", sellerType: "offline", category: "Wooden carvings" },
  { id: "a9", name: "Wooden Serving Tray", price: 3500, imageUrl: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", sellerType: "offline", category: "Wooden crafts" },
  { id: "a10", name: "Wooden Wall Clock", price: 4500, imageUrl: "https://images.unsplash.com/photo-1602153508753-4e8b6047f02e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", sellerType: "online", category: "Wooden crafts" },
]

export default function TraditionalArtisansPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = artisanProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 font-serif text-wood-brown-700">Traditional Artisan Products</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="mt-4">
        <FilterOptions />
      </div>
      <div className="mt-8">
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  )
}

