import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { categories, getBooksByCategory } from "@/data/books";
import { BookCard3D } from "./BookCard3D";
import { Button } from "@/components/ui/button";

export const CategorySection = () => {
  return (
    <section className="py-24 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-radial from-neon-purple/10 to-transparent blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Browse by </span>
            <span className="text-gradient">Category</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Explore our curated collection across diverse genres
          </p>
        </motion.div>

        {/* Category Pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/categories?filter=${category.id}`}
            >
              <motion.div
                className="px-5 py-2.5 rounded-full glass cursor-pointer hover:bg-primary/10 hover:border-primary/50 transition-all flex items-center gap-2 group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-xl">{category.icon}</span>
                <span className="font-medium group-hover:text-primary transition-colors">
                  {category.name}
                </span>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Featured Books Grid */}
        <div className="space-y-16">
          {categories.slice(0, 3).map((category, catIndex) => {
            const categoryBooks = getBooksByCategory(category.id).slice(0, 4);

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
              >
                {/* Category Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <h3 className="font-display text-2xl font-bold">
                      {category.name}
                    </h3>
                  </div>
                  <Link to={`/categories?filter=${category.id}`}>
                    <Button variant="ghost" className="group">
                      View All
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>

                {/* Books Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {categoryBooks.map((book, index) => (
                    <BookCard3D key={book.id} book={book} index={index} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link to="/categories">
            <Button variant="gradient" size="lg">
              Explore All Categories
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
