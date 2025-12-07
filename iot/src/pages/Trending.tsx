import { motion } from "framer-motion";
import { TrendingUp, Flame, Star } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import { BookCard3D } from "@/components/BookCard3D";
import { books } from "@/data/books";

const Trending = () => {
  // Sort books by rating for trending
  const trendingBooks = [...books].sort((a, b) => b.rating - a.rating);

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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Flame className="h-5 w-5 text-accent" />
              <span className="font-medium">Hot This Week</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Trending </span>
              <span className="text-gradient">Now</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              The most popular books our readers can't put down
            </p>
          </motion.div>

          {/* Featured Top 3 */}
          <motion.div
            className="grid md:grid-cols-3 gap-8 mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {trendingBooks.slice(0, 3).map((book, index) => (
              <motion.div
                key={book.id}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                {/* Rank Badge */}
                <div className="absolute -top-3 -left-3 z-10 w-12 h-12 rounded-full bg-gradient-neon flex items-center justify-center neon-glow">
                  <span className="font-display text-xl font-bold text-background">
                    #{index + 1}
                  </span>
                </div>
                <BookCard3D book={book} index={index} />
              </motion.div>
            ))}
          </motion.div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-12">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="h-5 w-5" />
              <span className="font-medium">More Trending</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          {/* Rest of Trending Books */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {trendingBooks.slice(3).map((book, index) => (
              <div key={book.id} className="relative">
                <div className="absolute -top-2 -right-2 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-card/80 backdrop-blur-sm border border-border text-xs">
                  <Star className="h-3 w-3 fill-primary text-primary" />
                  <span>{book.rating}</span>
                </div>
                <BookCard3D book={book} index={index + 3} />
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default Trending;
