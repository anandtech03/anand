import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import { BookCard3D } from "@/components/BookCard3D";
import { categories, books, getBooksByCategory } from "@/data/books";
import { cn } from "@/lib/utils";

const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string | null>(
    searchParams.get("filter")
  );

  useEffect(() => {
    const filter = searchParams.get("filter");
    setActiveCategory(filter);
  }, [searchParams]);

  const filteredBooks = activeCategory
    ? getBooksByCategory(activeCategory)
    : books;

  const handleCategoryClick = (categoryId: string | null) => {
    setActiveCategory(categoryId);
    if (categoryId) {
      setSearchParams({ filter: categoryId });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Explore </span>
              <span className="text-gradient">Categories</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Discover books across various genres and find your next favorite read
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <button
              onClick={() => handleCategoryClick(null)}
              className={cn(
                "px-5 py-2.5 rounded-full transition-all flex items-center gap-2",
                !activeCategory
                  ? "bg-primary text-primary-foreground neon-glow"
                  : "glass hover:bg-primary/10"
              )}
            >
              <span className="text-xl">📚</span>
              <span className="font-medium">All</span>
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={cn(
                  "px-5 py-2.5 rounded-full transition-all flex items-center gap-2",
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground neon-glow"
                    : "glass hover:bg-primary/10"
                )}
              >
                <span className="text-xl">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </motion.div>

          {/* Results Count */}
          <motion.p
            className="text-muted-foreground text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Showing {filteredBooks.length} books
            {activeCategory && ` in ${categories.find((c) => c.id === activeCategory)?.name}`}
          </motion.p>

          {/* Books Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredBooks.map((book, index) => (
              <BookCard3D key={book.id} book={book} index={index} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default Categories;
