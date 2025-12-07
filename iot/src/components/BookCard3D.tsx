import { useState } from "react";
import { motion } from "framer-motion";
import { Star, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Book } from "@/data/books";
import { cn } from "@/lib/utils";

interface BookCard3DProps {
  book: Book;
  index?: number;
}

export const BookCard3D = ({ book, index = 0 }: BookCard3DProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="perspective-1000"
      style={{ perspective: "1000px" }}
    >
      <Link to={`/book/${book.id}`}>
        <motion.div
          className="relative w-full cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          animate={{
            rotateY: isHovered ? 15 : 0,
            rotateX: isHovered ? -5 : 0,
            scale: isHovered ? 1.05 : 1,
            z: isHovered ? 50 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Book Cover */}
          <div
            className={cn(
              "relative rounded-xl overflow-hidden aspect-[3/4] shadow-lg transition-shadow duration-300",
              isHovered && "shadow-2xl shadow-primary/30"
            )}
          >
            {/* Cover Image */}
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />

            {/* Book Spine Effect */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-background/50 to-transparent"
              animate={{ opacity: isHovered ? 0.8 : 0.4 }}
            />

            {/* Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="font-display font-bold text-lg text-foreground line-clamp-2 mb-1">
                {book.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm font-medium">{book.rating}</span>
                </div>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">
                  {book.pages} pages
                </span>
              </div>
            </div>

            {/* Hover Action */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: isHovered ? 1 : 0.8 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="p-3 rounded-full bg-primary/20 neon-glow">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-primary">
                  View Details
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* 3D Shadow */}
          <motion.div
            className="absolute -bottom-2 left-4 right-4 h-4 bg-gradient-to-t from-primary/20 to-transparent blur-xl rounded-full"
            animate={{ opacity: isHovered ? 0.8 : 0.3 }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};
