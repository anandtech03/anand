import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { books } from "@/data/books";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  books?: typeof books;
}

const quickResponses = [
  { text: "I want something exciting", mood: "action" },
  { text: "I'm feeling romantic", mood: "romance" },
  { text: "Teach me something new", mood: "science" },
  { text: "Show me trending books", mood: "trending" },
];

const getBotResponse = (input: string): { text: string; books?: typeof books } => {
  const lowercaseInput = input.toLowerCase();

  if (lowercaseInput.includes("romantic") || lowercaseInput.includes("love") || lowercaseInput.includes("romance")) {
    return {
      text: "Ah, a romantic soul! 💕 Here are some heartwarming reads that will make you believe in love again:",
      books: books.filter((b) => b.category === "romance"),
    };
  }

  if (lowercaseInput.includes("sci") || lowercaseInput.includes("learn") || lowercaseInput.includes("tech")) {
    return {
      text: "Curious mind detected! 🔬 These fascinating reads will expand your horizons:",
      books: books.filter((b) => b.category === "science" || b.category === "technology"),
    };
  }

  if (lowercaseInput.includes("exciting") || lowercaseInput.includes("adventure") || lowercaseInput.includes("action")) {
    return {
      text: "Ready for adventure! ⚡ These thrilling stories will keep you on the edge of your seat:",
      books: books.filter((b) => b.category === "fiction" || b.category === "comics"),
    };
  }

  if (lowercaseInput.includes("trending") || lowercaseInput.includes("popular") || lowercaseInput.includes("best")) {
    return {
      text: "Here are the hottest books everyone's talking about! 🔥",
      books: books.slice(0, 4),
    };
  }

  if (lowercaseInput.includes("history") || lowercaseInput.includes("past")) {
    return {
      text: "A lover of the past! 🏛️ These historical gems will transport you through time:",
      books: books.filter((b) => b.category === "history"),
    };
  }

  return {
    text: "I'd love to help you find your perfect read! Try telling me about your mood, interests, or what genre you're in the mood for. You can also ask about trending books or specific categories!",
  };
};

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey there! 👋 I'm Nova, your AI reading companion. Tell me what you're in the mood for, and I'll find the perfect book for you!",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate bot thinking
    setTimeout(() => {
      const response = getBotResponse(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isBot: true,
        books: response.books,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 800);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-neon neon-glow cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
      >
        <Bot className="h-6 w-6 text-background" />
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[550px] glass-strong rounded-2xl overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-border bg-gradient-to-r from-primary/10 to-secondary/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-neon flex items-center justify-center">
                      <Bot className="h-5 w-5 text-background" />
                    </div>
                    <motion.div
                      className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-card"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div>
                    <h3 className="font-display font-bold">Nova</h3>
                    <p className="text-xs text-muted-foreground">AI Reading Companion</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[85%] ${
                      message.isBot
                        ? "bg-muted rounded-2xl rounded-tl-md"
                        : "bg-primary text-primary-foreground rounded-2xl rounded-tr-md"
                    } p-3`}
                  >
                    <p className="text-sm">{message.text}</p>
                    {message.books && message.books.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {message.books.map((book) => (
                          <Link
                            key={book.id}
                            to={`/book/${book.id}`}
                            onClick={() => setIsOpen(false)}
                          >
                            <div className="flex items-center gap-2 p-2 rounded-lg bg-background/50 hover:bg-background/80 transition-colors cursor-pointer">
                              <img
                                src={book.cover}
                                alt={book.title}
                                className="w-10 h-14 rounded object-cover"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium truncate text-foreground">
                                  {book.title}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                  {book.author}
                                </p>
                              </div>
                              <BookOpen className="h-4 w-4 text-primary flex-shrink-0" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Responses */}
            <div className="px-4 py-2 flex gap-2 overflow-x-auto">
              {quickResponses.map((qr, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(qr.text)}
                  className="flex-shrink-0 px-3 py-1.5 text-xs rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
                >
                  {qr.text}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Nova for recommendations..."
                  className="flex-1 bg-muted border-none"
                />
                <Button type="submit" size="icon" variant="gradient">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
