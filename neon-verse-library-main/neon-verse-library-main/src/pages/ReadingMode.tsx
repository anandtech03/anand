import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Type,
  Minus,
  Plus,
  Settings,
  X,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBookById } from "@/data/books";
import { cn } from "@/lib/utils";

const ReadingMode = () => {
  const { id } = useParams<{ id: string }>();
  const book = getBookById(id || "");

  const [currentPage, setCurrentPage] = useState(0);
  const [isLightMode, setIsLightMode] = useState(true);
  const [fontSize, setFontSize] = useState(18);
  const [showSettings, setShowSettings] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");

  if (!book || !book.content) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Content Not Available</h1>
          <Link to="/">
            <Button variant="neon">Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const totalPages = book.content.length;
  const currentContent = book.content[currentPage];

  const handlePageTurn = (direction: "next" | "prev") => {
    if (isFlipping) return;
    
    if (direction === "next" && currentPage < totalPages - 1) {
      setFlipDirection("next");
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1);
        setIsFlipping(false);
      }, 600);
    } else if (direction === "prev" && currentPage > 0) {
      setFlipDirection("prev");
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev - 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-500",
        isLightMode ? "bg-amber-50" : "bg-slate-900"
      )}
    >
      {/* Top Bar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl transition-colors duration-500",
          isLightMode
            ? "bg-amber-50/90 border-amber-200"
            : "bg-slate-900/90 border-slate-700"
        )}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to={`/book/${book.id}`}>
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn(
                "gap-2",
                isLightMode ? "text-amber-900 hover:bg-amber-100" : "text-slate-100 hover:bg-slate-800"
              )}
            >
              <ArrowLeft className="h-4 w-4" />
              Exit
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            <BookOpen className={cn("h-5 w-5", isLightMode ? "text-amber-700" : "text-emerald-400")} />
            <span className={cn("font-display font-semibold", isLightMode ? "text-amber-900" : "text-slate-100")}>
              {book.title}
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSettings(!showSettings)}
            className={isLightMode ? "text-amber-900 hover:bg-amber-100" : "text-slate-100 hover:bg-slate-800"}
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </motion.header>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className={cn(
              "fixed top-0 right-0 bottom-0 w-80 z-50 p-6 border-l transition-colors duration-500",
              isLightMode
                ? "bg-amber-50 border-amber-200"
                : "bg-slate-800 border-slate-700"
            )}
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className={cn("font-display text-xl font-bold", isLightMode ? "text-amber-900" : "text-slate-100")}>
                Settings
              </h3>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowSettings(false)}
                className={isLightMode ? "text-amber-900 hover:bg-amber-100" : "text-slate-100 hover:bg-slate-700"}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Theme Toggle */}
            <div className="mb-8">
              <label className={cn("block text-sm font-medium mb-3", isLightMode ? "text-amber-800" : "text-slate-300")}>
                Reading Theme
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsLightMode(false)}
                  className={cn(
                    "flex-1 p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2",
                    !isLightMode
                      ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                      : "border-amber-300 hover:border-amber-400 text-amber-700"
                  )}
                >
                  <Moon className="h-5 w-5" />
                  <span>Night</span>
                </button>
                <button
                  onClick={() => setIsLightMode(true)}
                  className={cn(
                    "flex-1 p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2",
                    isLightMode
                      ? "border-amber-500 bg-amber-500/20 text-amber-700"
                      : "border-slate-600 hover:border-slate-500 text-slate-300"
                  )}
                >
                  <Sun className="h-5 w-5" />
                  <span>Day</span>
                </button>
              </div>
            </div>

            {/* Font Size */}
            <div>
              <label className={cn("block text-sm font-medium mb-3", isLightMode ? "text-amber-800" : "text-slate-300")}>
                Font Size
              </label>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setFontSize((prev) => Math.max(14, prev - 2))}
                  className={isLightMode ? "text-amber-700 hover:bg-amber-100" : "text-slate-300 hover:bg-slate-700"}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className={cn("flex-1 flex items-center justify-center gap-2", isLightMode ? "text-amber-800" : "text-slate-200")}>
                  <Type className="h-5 w-5" />
                  <span className="font-mono">{fontSize}px</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setFontSize((prev) => Math.min(28, prev + 2))}
                  className={isLightMode ? "text-amber-700 hover:bg-amber-100" : "text-slate-300 hover:bg-slate-700"}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Reading Area */}
      <main className="pt-24 pb-32 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-4xl perspective-1000" style={{ perspective: "2000px" }}>
          {/* Book Container */}
          <div className="relative" style={{ transformStyle: "preserve-3d" }}>
            {/* Page */}
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              animate={{
                rotateY: isFlipping
                  ? flipDirection === "next"
                    ? -15
                    : 15
                  : 0,
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={currentContent.bgImage}
                  alt="Page background"
                  className="w-full h-full object-cover"
                />
                <div 
                  className={cn(
                    "absolute inset-0 transition-colors duration-500",
                    isLightMode 
                      ? "bg-gradient-to-b from-amber-50/95 via-amber-50/90 to-amber-100/95" 
                      : "bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-800/95"
                  )}
                />
              </div>

              {/* Page Content */}
              <div className="relative p-8 md:p-12 min-h-[65vh]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="prose prose-lg max-w-none"
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    {/* Chapter Title Styling */}
                    <p
                      className={cn(
                        "whitespace-pre-wrap leading-relaxed font-serif",
                        isLightMode ? "text-amber-950" : "text-slate-100"
                      )}
                      style={{ lineHeight: "1.8" }}
                    >
                      {currentContent.text.split('\n').map((line, i) => {
                        if (line.startsWith('Chapter') || line.startsWith('Introduction') || line.startsWith('Preface') || line.startsWith('Panel')) {
                          return (
                            <span key={i} className={cn(
                              "block font-display font-bold text-2xl mb-4",
                              isLightMode ? "text-amber-800" : "text-emerald-400"
                            )}>
                              {line}
                            </span>
                          );
                        }
                        return <span key={i}>{line}{'\n'}</span>;
                      })}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Page Number */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isLightMode ? "text-amber-600" : "text-slate-400"
                    )}
                  >
                    Page {currentPage + 1} of {totalPages}
                  </span>
                </div>

                {/* Decorative Elements */}
                <div 
                  className={cn(
                    "absolute top-8 left-8 w-12 h-12 rounded-full opacity-20",
                    isLightMode ? "bg-amber-400" : "bg-emerald-500"
                  )}
                />
                <div 
                  className={cn(
                    "absolute bottom-8 right-8 w-8 h-8 rounded-full opacity-10",
                    isLightMode ? "bg-orange-400" : "bg-cyan-500"
                  )}
                />
              </div>

              {/* Decorative Page Edge */}
              <div
                className={cn(
                  "absolute right-0 top-0 bottom-0 w-3 rounded-r-2xl",
                  isLightMode
                    ? "bg-gradient-to-r from-amber-200 to-amber-300"
                    : "bg-gradient-to-r from-slate-700 to-slate-600"
                )}
              />
              
              {/* Page Shadow Effect */}
              <div
                className={cn(
                  "absolute left-0 top-0 bottom-0 w-8",
                  isLightMode
                    ? "bg-gradient-to-r from-amber-200/50 to-transparent"
                    : "bg-gradient-to-r from-slate-800/50 to-transparent"
                )}
              />
            </motion.div>
          </div>
        </div>
      </main>

      {/* Navigation Controls */}
      <div className="fixed bottom-0 left-0 right-0 z-40 py-6">
        <div 
          className={cn(
            "mx-4 md:mx-auto max-w-2xl rounded-2xl p-4 backdrop-blur-xl border transition-colors duration-500",
            isLightMode 
              ? "bg-amber-100/80 border-amber-200" 
              : "bg-slate-800/80 border-slate-700"
          )}
        >
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={() => handlePageTurn("prev")}
              disabled={currentPage === 0 || isFlipping}
              className={cn(
                "gap-2 rounded-xl transition-all",
                isLightMode 
                  ? "bg-amber-600 hover:bg-amber-700 text-white disabled:bg-amber-300" 
                  : "bg-emerald-600 hover:bg-emerald-500 text-white disabled:bg-slate-600"
              )}
            >
              <ChevronLeft className="h-5 w-5" />
              Previous
            </Button>

            {/* Progress Bar */}
            <div className="flex-1 max-w-xs">
              <div
                className={cn(
                  "h-3 rounded-full overflow-hidden",
                  isLightMode ? "bg-amber-200" : "bg-slate-700"
                )}
              >
                <motion.div
                  className={cn(
                    "h-full rounded-full",
                    isLightMode 
                      ? "bg-gradient-to-r from-amber-500 to-orange-500" 
                      : "bg-gradient-to-r from-emerald-500 to-cyan-500"
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            <Button
              onClick={() => handlePageTurn("next")}
              disabled={currentPage === totalPages - 1 || isFlipping}
              className={cn(
                "gap-2 rounded-xl transition-all",
                isLightMode 
                  ? "bg-amber-600 hover:bg-amber-700 text-white disabled:bg-amber-300" 
                  : "bg-emerald-600 hover:bg-emerald-500 text-white disabled:bg-slate-600"
              )}
            >
              Next
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingMode;
