import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Clock, BookOpen, Heart, Share2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import { BookCard3D } from "@/components/BookCard3D";
import { Button } from "@/components/ui/button";
import { getBookById, getRelatedBooks, categories } from "@/data/books";

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const book = getBookById(id || "");

  if (!book) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Book Not Found</h1>
          <Link to="/">
            <Button variant="neon">Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedBooks = getRelatedBooks(book);
  const category = categories.find((c) => c.id === book.category);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link to="/categories">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Library
              </Button>
            </Link>
          </motion.div>

          {/* Book Details */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Cover */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-gradient-neon opacity-20 blur-2xl rounded-3xl" />
                
                {/* Book Cover */}
                <motion.div
                  className="relative w-72 md:w-80 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
                  whileHover={{ rotateY: 5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Spine */}
                  <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-background/60 to-transparent" />
                </motion.div>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center"
            >
              {/* Category Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{category?.icon}</span>
                <span className="px-3 py-1 rounded-full glass text-sm font-medium">
                  {category?.name}
                </span>
              </div>

              {/* Title & Author */}
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">
                {book.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                by {book.author}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <span className="font-semibold">{book.rating}</span>
                  <span className="text-muted-foreground">(2.4k reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-5 w-5" />
                  <span>{book.pages} pages</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BookOpen className="h-5 w-5" />
                  <span>{book.year}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {book.description}
              </p>

              {/* Actions */}
              <div className="flex flex-wrap gap-4">
                <Link to={`/read/${book.id}`}>
                  <Button variant="gradient" size="xl" className="group">
                    <BookOpen className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                    Start Reading
                  </Button>
                </Link>
                <Button variant="neon" size="xl">
                  <Heart className="mr-2 h-5 w-5" />
                  Add to Wishlist
                </Button>
                <Button variant="glass" size="icon" className="h-14 w-14">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Related Books */}
          {relatedBooks.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl font-bold mb-8">
                <span className="text-foreground">You might also </span>
                <span className="text-gradient">enjoy</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedBooks.map((relatedBook, index) => (
                  <BookCard3D key={relatedBook.id} book={relatedBook} index={index} />
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default BookDetail;
