"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Grid3X3, RefreshCcw } from "lucide-react";
import { products, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const ShopContent = () => {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("default");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  // Set category if supplied in URL params
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Handle Filtering & Sorting logic
  useEffect(() => {
    let result = [...products];

    // Filter by Category
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim() !== "") {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    if (sortBy === "price-low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high-low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(result);
  }, [selectedCategory, searchQuery, sortBy]);

  const categories = [
    { label: "TẤT CẢ", value: "all" },
    { label: "GIÀY (FOOTWEAR)", value: "footwear" },
    { label: "QUẦN ÁO (APPAREL)", value: "apparel" },
    { label: "PHỤ KIỆN", value: "accessories" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-10 min-h-screen">
      
      {/* Page Header */}
      <div className="space-y-2 border-b border-white/5 pb-6">
        <span className="text-[10px] text-cr7Green font-bold tracking-widest uppercase">Trang sản phẩm</span>
        <h1 className="font-display font-black text-4xl text-white italic uppercase tracking-tight">
          DANH MỤC TRANG BỊ
        </h1>
      </div>

      {/* Control Filters Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
        {/* Search */}
        <div className="relative lg:col-span-2">
          <input
            type="text"
            placeholder="Tìm kiếm trang bị CR7..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slateDark border border-white/10 rounded-lg py-3 pl-12 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cr7Green focus:ring-1 focus:ring-cr7Green transition-all"
          />
          <Search className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

        {/* Sort Select */}
        <div className="flex items-center space-x-3 bg-slateDark border border-white/10 rounded-lg px-4 py-3">
          <SlidersHorizontal className="w-4 h-4 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-white text-xs font-bold font-display tracking-wider focus:outline-none w-full cursor-pointer"
          >
            <option value="default" className="bg-slateDark">SẮP XẾP MẶC ĐỊNH</option>
            <option value="price-low-high" className="bg-slateDark">GIÁ: THẤP ĐẾN CAO</option>
            <option value="price-high-low" className="bg-slateDark">GIÁ: CAO ĐẾN THẤP</option>
            <option value="rating" className="bg-slateDark">ĐÁNH GIÁ TỐT NHẤT</option>
          </select>
        </div>

        {/* Quick Reset */}
        {(searchQuery || selectedCategory !== "all" || sortBy !== "default") && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setSortBy("default");
            }}
            className="flex items-center justify-center space-x-2 text-xs font-bold text-cr7Red hover:text-white transition-colors py-3"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>LÀM MỚI LỌC</span>
          </button>
        )}
      </div>

      {/* Grid Content / Categories Split */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Category List Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="font-display font-bold text-xs tracking-widest text-gray-400 uppercase">
            BỘ LỌC DANH MỤC
          </h3>
          <div className="flex flex-row lg:flex-col flex-wrap gap-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`text-left text-xs font-display font-black tracking-widest px-4 py-3 rounded-lg border transition-all duration-200 w-full md:w-auto lg:w-full ${
                    isSelected
                      ? "bg-gradient-to-r from-cr7GreenDark to-cr7Green text-obsidian border-transparent"
                      : "bg-slateDark border-white/5 text-white hover:border-white/15"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid Area */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-slateDark/20 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center space-y-4">
              <Grid3X3 className="w-12 h-12 text-gray-600" />
              <h3 className="font-display font-bold text-white text-base">Không tìm thấy sản phẩm</h3>
              <p className="text-gray-400 text-xs">Hãy thử đổi bộ lọc hoặc từ khóa tìm kiếm khác.</p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((prod) => (
                  <motion.div
                    key={prod.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProductCard product={prod} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const ShopPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-obsidian">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-cr7Green" />
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
};

export default ShopPage;
