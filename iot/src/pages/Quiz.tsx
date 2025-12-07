import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { quizQuestions, books, specialBooks, QuizQuestion } from "@/data/books";
import { Trophy, Star, BookOpen, Crown, Lock, Unlock, CheckCircle, XCircle, Medal } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  date: string;
}

interface LeaderboardEntry {
  name: string;
  score: number;
  booksRead: number;
  quizzesTaken: number;
}

const Quiz = () => {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [hasSpecialAccess, setHasSpecialAccess] = useState(false);
  const { toast } = useToast();

  const leaderboard: LeaderboardEntry[] = [
    { name: "Arjun Sharma", score: 450, booksRead: 15, quizzesTaken: 20 },
    { name: "Priya Patel", score: 380, booksRead: 12, quizzesTaken: 18 },
    { name: "Rahul Singh", score: 320, booksRead: 10, quizzesTaken: 15 },
    { name: "Sneha Gupta", score: 290, booksRead: 9, quizzesTaken: 12 },
    { name: "Vikram Kumar", score: 250, booksRead: 8, quizzesTaken: 10 },
  ];

  useEffect(() => {
    const savedScore = localStorage.getItem("userQuizScore");
    if (savedScore) {
      const parsedScore = parseInt(savedScore);
      setUserScore(parsedScore);
      setHasSpecialAccess(parsedScore >= 100);
    }
  }, []);

  const bookQuestions = selectedBook
    ? quizQuestions.filter((q) => q.bookId === selectedBook)
    : [];

  const currentQuestion = bookQuestions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);

    if (answerIndex === currentQuestion.correctAnswer) {
      const newScore = score + currentQuestion.points;
      setScore(newScore);
      toast({
        title: "सही जवाब! 🎉",
        description: `आपने ${currentQuestion.points} पॉइंट्स कमाए!`,
      });
    } else {
      toast({
        title: "गलत जवाब ❌",
        description: "कोई बात नहीं, अगला सवाल try करें!",
        variant: "destructive",
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < bookQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      const totalScore = userScore + score;
      setUserScore(totalScore);
      localStorage.setItem("userQuizScore", totalScore.toString());
      if (totalScore >= 100) {
        setHasSpecialAccess(true);
      }
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setSelectedBook(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const booksWithQuiz = books.filter((book) =>
    quizQuestions.some((q) => q.bookId === book.id)
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">📚 Quiz Challenge</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            अपने पढ़े हुए किताबों पर Quiz दें और Top Performer बनकर Special Books unlock करें!
          </p>
          
          {/* User Stats */}
          <div className="flex justify-center gap-6 mt-6">
            <div className="glass px-6 py-3 rounded-xl flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span className="text-foreground font-semibold">{userScore} Points</span>
            </div>
            <div className="glass px-6 py-3 rounded-xl flex items-center gap-2">
              {hasSpecialAccess ? (
                <Unlock className="w-5 h-5 text-emerald-400" />
              ) : (
                <Lock className="w-5 h-5 text-muted-foreground" />
              )}
              <span className="text-foreground font-semibold">
                {hasSpecialAccess ? "Special Access ✨" : `${100 - userScore} more to unlock`}
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Quiz Area */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {!selectedBook ? (
                // Book Selection
                <motion.div
                  key="book-selection"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h2 className="text-2xl font-bold mb-6 text-foreground">Quiz के लिए Book चुनें</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {booksWithQuiz.map((book) => (
                      <motion.div
                        key={book.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          className="glass p-4 cursor-pointer hover:border-primary/50 transition-all"
                          onClick={() => setSelectedBook(book.id)}
                        >
                          <div className="flex gap-4">
                            <img
                              src={book.cover}
                              alt={book.title}
                              className="w-16 h-20 object-cover rounded-lg"
                            />
                            <div>
                              <h3 className="font-semibold text-foreground">{book.title}</h3>
                              <p className="text-sm text-muted-foreground">{book.author}</p>
                              <div className="flex items-center gap-1 mt-2">
                                <BookOpen className="w-4 h-4 text-primary" />
                                <span className="text-xs text-muted-foreground">
                                  {quizQuestions.filter((q) => q.bookId === book.id).length} Questions
                                </span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : showResult ? (
                // Results Screen
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <Card className="glass p-8 max-w-md mx-auto">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                    >
                      <Trophy className="w-20 h-20 mx-auto text-amber-400 mb-4" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-foreground mb-2">Quiz Complete!</h2>
                    <p className="text-muted-foreground mb-6">
                      आपने {bookQuestions.length} में से{" "}
                      {bookQuestions.filter((_, i) => i < currentQuestionIndex + 1).length} सवालों के जवाब दिए
                    </p>
                    <div className="bg-primary/10 rounded-xl p-6 mb-6">
                      <p className="text-4xl font-bold text-primary">{score} Points</p>
                      <p className="text-muted-foreground">इस Quiz में</p>
                    </div>
                    <div className="bg-secondary/10 rounded-xl p-4 mb-6">
                      <p className="text-2xl font-bold text-secondary">{userScore} Total Points</p>
                      {hasSpecialAccess && (
                        <p className="text-emerald-400 flex items-center justify-center gap-2 mt-2">
                          <Unlock className="w-4 h-4" /> Special Books Unlocked!
                        </p>
                      )}
                    </div>
                    <Button onClick={resetQuiz} className="w-full" variant="neon">
                      नया Quiz शुरू करें
                    </Button>
                  </Card>
                </motion.div>
              ) : (
                // Quiz Questions
                <motion.div
                  key="quiz"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <Button variant="ghost" onClick={resetQuiz}>
                      ← Back
                    </Button>
                    <span className="text-muted-foreground">
                      Question {currentQuestionIndex + 1}/{bookQuestions.length}
                    </span>
                  </div>

                  <Card className="glass p-6">
                    <div className="mb-6">
                      <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-secondary"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${((currentQuestionIndex + 1) / bookQuestions.length) * 100}%`,
                          }}
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {currentQuestion?.question}
                      </h3>
                      <p className="text-sm text-primary">+{currentQuestion?.points} points</p>
                    </div>

                    <div className="space-y-3">
                      {currentQuestion?.options.map((option, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: isAnswered ? 1 : 1.02 }}
                          whileTap={{ scale: isAnswered ? 1 : 0.98 }}
                          className={`w-full p-4 text-left rounded-xl border transition-all flex items-center gap-3 ${
                            isAnswered
                              ? index === currentQuestion.correctAnswer
                                ? "border-emerald-500 bg-emerald-500/20"
                                : index === selectedAnswer
                                ? "border-red-500 bg-red-500/20"
                                : "border-border bg-card"
                              : selectedAnswer === index
                              ? "border-primary bg-primary/20"
                              : "border-border bg-card hover:border-primary/50"
                          }`}
                          onClick={() => handleAnswerSelect(index)}
                          disabled={isAnswered}
                        >
                          <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="text-foreground flex-1">{option}</span>
                          {isAnswered && index === currentQuestion.correctAnswer && (
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                          )}
                          {isAnswered && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                        </motion.button>
                      ))}
                    </div>

                    {isAnswered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6"
                      >
                        <Button onClick={handleNextQuestion} className="w-full" variant="neon">
                          {currentQuestionIndex < bookQuestions.length - 1
                            ? "Next Question →"
                            : "See Results 🎉"}
                        </Button>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column - Leaderboard & Special Books */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <Card className="glass p-6">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-400" />
                Weekly Leaderboard
              </h3>
              <div className="space-y-3">
                {leaderboard.map((entry, index) => (
                  <motion.div
                    key={entry.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      index === 0 ? "bg-amber-500/20 border border-amber-500/30" : "bg-card"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                      {index === 0 ? (
                        <Medal className="w-6 h-6 text-amber-400" />
                      ) : index === 1 ? (
                        <Medal className="w-5 h-5 text-slate-300" />
                      ) : index === 2 ? (
                        <Medal className="w-5 h-5 text-amber-600" />
                      ) : (
                        <span className="text-muted-foreground font-semibold">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{entry.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {entry.booksRead} books • {entry.quizzesTaken} quizzes
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{entry.score}</p>
                      <p className="text-xs text-muted-foreground">points</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Special Books */}
            <Card className="glass p-6">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400" />
                Special Books
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                100+ points पाकर इन exclusive books को unlock करें!
              </p>
              {specialBooks.map((book) => (
                <div
                  key={book.id}
                  className={`relative rounded-xl overflow-hidden ${
                    hasSpecialAccess ? "cursor-pointer" : "opacity-60"
                  }`}
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent p-4 flex flex-col justify-end">
                    <h4 className="font-semibold text-foreground">{book.title}</h4>
                    <p className="text-xs text-muted-foreground">{book.author}</p>
                  </div>
                  {!hasSpecialAccess && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                      <Lock className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                  {hasSpecialAccess && (
                    <Link
                      to={`/book/${book.id}`}
                      className="absolute inset-0 flex items-center justify-center bg-primary/20 opacity-0 hover:opacity-100 transition-opacity"
                    >
                      <Button variant="neon" size="sm">
                        Read Now
                      </Button>
                    </Link>
                  )}
                </div>
              ))}
            </Card>
          </div>
        </div>

        {/* Vedic Books Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="text-4xl">🕉️</span>
            <div>
              <h2 className="text-3xl font-bold text-gradient">Vedic Wisdom</h2>
              <p className="text-muted-foreground">प्राचीन भारतीय ज्ञान की अमृत धारा</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {books
              .filter((book) => book.category === "vedic")
              .map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link to={`/book/${book.id}`}>
                    <Card className="glass overflow-hidden group cursor-pointer hover:border-amber-500/50 transition-all">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                        <div className="absolute top-2 right-2 bg-amber-500/90 px-2 py-1 rounded text-xs font-semibold text-background">
                          Vedic
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground group-hover:text-amber-400 transition-colors">
                          {book.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{book.author}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="text-sm text-foreground">{book.rating}</span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default Quiz;
