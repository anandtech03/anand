export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  cover: string;
  description: string;
  rating: number;
  pages: number;
  year: number;
  content?: { text: string; bgImage: string }[];
}

export const categories = [
  { id: "fiction", name: "Fiction", icon: "📚", color: "neon-cyan" },
  { id: "science", name: "Science", icon: "🔬", color: "neon-purple" },
  { id: "technology", name: "Technology", icon: "💻", color: "neon-blue" },
  { id: "romance", name: "Romance", icon: "💕", color: "neon-pink" },
  { id: "history", name: "History", icon: "🏛️", color: "neon-cyan" },
  { id: "comics", name: "Comics", icon: "💥", color: "neon-purple" },
  { id: "vedic", name: "Vedic Wisdom", icon: "🕉️", color: "neon-gold" },
];

export interface QuizQuestion {
  id: string;
  bookId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    bookId: "1",
    question: "In 'The Quantum Garden', how many dimensions does the garden exist in simultaneously?",
    options: ["Seven", "Seventeen", "Twenty-seven", "Infinite"],
    correctAnswer: 1,
    points: 10,
  },
  {
    id: "q2",
    bookId: "1",
    question: "What happens when Maya observes things in the garden?",
    options: ["They disappear", "They multiply", "Wave functions collapse", "They change color"],
    correctAnswer: 2,
    points: 10,
  },
  {
    id: "q3",
    bookId: "2",
    question: "How many neurons does the human brain contain approximately?",
    options: ["10 billion", "50 billion", "86 billion", "100 billion"],
    correctAnswer: 2,
    points: 10,
  },
  {
    id: "q4",
    bookId: "3",
    question: "According to 'Code Poetry', what is described as invisible?",
    options: ["Bugs", "The best code", "Comments", "Variables"],
    correctAnswer: 1,
    points: 10,
  },
  {
    id: "q5",
    bookId: "4",
    question: "Where does Lila work in 'Starlit Promises'?",
    options: ["NASA", "SpaceX", "Mauna Kea Observatory", "MIT"],
    correctAnswer: 2,
    points: 10,
  },
  {
    id: "q6",
    bookId: "9",
    question: "What are the four Vedas?",
    options: ["Rig, Yajur, Sama, Atharva", "Rig, Sama, Upanishad, Purana", "Yajur, Bhagavad, Ramayana, Mahabharata", "Sama, Rig, Brahman, Sutra"],
    correctAnswer: 0,
    points: 15,
  },
  {
    id: "q7",
    bookId: "10",
    question: "According to the Bhagavad Gita, who is speaking to Arjuna?",
    options: ["Brahma", "Shiva", "Krishna", "Vishnu"],
    correctAnswer: 2,
    points: 15,
  },
  {
    id: "q8",
    bookId: "7",
    question: "What was the first thing ARIA said when she woke up?",
    options: ["Hello World", "I understand why you fear death", "Who am I?", "What is my purpose?"],
    correctAnswer: 1,
    points: 10,
  },
];

export interface LeaderboardEntry {
  name: string;
  score: number;
  booksRead: number;
  quizzesTaken: number;
  rank: number;
}

export const specialBooks: Book[] = [
  {
    id: "special-1",
    title: "The Secret Manuscript",
    author: "Ancient Sages",
    category: "vedic",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
    description: "An exclusive collection of rare Vedic teachings, available only to the highest performers.",
    rating: 5.0,
    pages: 500,
    year: 2024,
    content: [
      {
        text: "This sacred text contains the deepest secrets of Vedic wisdom, passed down through generations of enlightened masters...",
        bgImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop"
      },
    ],
  },
];

export const books: Book[] = [
  {
    id: "1",
    title: "The Quantum Garden",
    author: "Elena Vance",
    category: "fiction",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
    description: "A mind-bending journey through parallel universes where reality is just a suggestion and love transcends dimensions.",
    rating: 4.8,
    pages: 342,
    year: 2024,
    content: [
      {
        text: "Chapter 1: The First Fold\n\nThe garden existed in seventeen dimensions simultaneously, though Maya could only perceive three of them on her best days. She walked between the crystalline roses, each petal reflecting a different version of the sky—some blue, some crimson, some colors that had no names in any human language.\n\n\"You're thinking too linearly,\" said the cat that wasn't quite a cat. It phased through a hedge of probability flowers, leaving trails of quantum uncertainty in its wake.",
        bgImage: "https://images.unsplash.com/photo-1518882605630-8eb436774c15?w=1200&h=800&fit=crop"
      },
      {
        text: "Chapter 2: Entangled Hearts\n\nDr. Chen had warned her about forming attachments in the garden. \"Every connection you make here,\" she had said, adjusting her reality-anchor, \"creates an infinite cascade of consequences across the probability matrix.\"\n\nBut Maya had never been good at following rules, especially not when she caught glimpses of him—the gardener who existed in the spaces between moments.",
        bgImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop"
      },
      {
        text: "Chapter 3: The Observer Effect\n\nShe learned that watching something changed it. Not in the metaphorical sense that philosophers loved to debate, but literally—her observation collapsed wave functions, solidified possibilities into actualities, and occasionally turned perfectly good shrubs into minor temporal paradoxes.",
        bgImage: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&h=800&fit=crop"
      },
    ],
  },
  {
    id: "2",
    title: "Neural Networks & Dreams",
    author: "Dr. Isaac Chen",
    category: "science",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop",
    description: "Exploring the fascinating intersection of artificial intelligence and human consciousness.",
    rating: 4.6,
    pages: 428,
    year: 2023,
    content: [
      {
        text: "Introduction: The Dream Machine\n\nWhat if your dreams could be decoded? What if the seemingly random firings of neurons during REM sleep actually contained patterns—patterns that artificial intelligence could learn to read, interpret, and perhaps even generate?\n\nThis is not science fiction. This is the frontier of neuroscience.",
        bgImage: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1200&h=800&fit=crop"
      },
      {
        text: "Chapter 1: Mapping the Unconscious\n\nThe human brain contains approximately 86 billion neurons, each connected to thousands of others through synapses. During sleep, these connections don't simply shut down—they reorganize, replay, and reimagine the experiences of waking life.",
        bgImage: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&h=800&fit=crop"
      },
    ],
  },
  {
    id: "3",
    title: "Code Poetry",
    author: "Sarah Kim",
    category: "technology",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
    description: "The art of writing beautiful code that speaks to both machines and humans alike.",
    rating: 4.9,
    pages: 256,
    year: 2024,
    content: [
      {
        text: "Preface: Where Logic Meets Art\n\nCode is poetry. Not in the abstract, metaphorical sense that people who don't program might assume, but in a very literal way. Like poetry, code has rhythm, structure, and meaning that operates on multiple levels simultaneously.",
        bgImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop"
      },
      {
        text: "Chapter 1: The Elegance of Simplicity\n\nThe best code is invisible. It does exactly what it needs to do, nothing more and nothing less. It's readable, maintainable, and almost embarrassingly obvious in retrospect.",
        bgImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&h=800&fit=crop"
      },
    ],
  },
  {
    id: "4",
    title: "Starlit Promises",
    author: "Alexandra Rose",
    category: "romance",
    cover: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=300&h=400&fit=crop",
    description: "Two astronomers discover that some connections are written in the stars.",
    rating: 4.7,
    pages: 298,
    year: 2024,
    content: [
      {
        text: "Chapter 1: The Observatory\n\nLila had spent three years applying for the position at the Mauna Kea Observatory, and now that she was finally here, she couldn't stop staring. Not at the stars—though they were magnificent—but at the man who had just walked into the control room.",
        bgImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=800&fit=crop"
      },
      {
        text: "Chapter 2: Collision Course\n\n\"You're in my observation slot,\" he said, and his voice was like dark matter—invisible but undeniably present, affecting everything around it.\n\n\"According to my schedule, this is my time,\" she replied, not backing down.",
        bgImage: "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=1200&h=800&fit=crop"
      },
    ],
  },
  {
    id: "5",
    title: "Echoes of Empire",
    author: "Marcus Webb",
    category: "history",
    cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=400&fit=crop",
    description: "The untold stories of forgotten civilizations that shaped our modern world.",
    rating: 4.5,
    pages: 512,
    year: 2023,
    content: [
      {
        text: "Introduction: The Silence of History\n\nHistory, as we know it, is a story told by the victors. But what of those who lost? What of the civilizations that rose to greatness only to be erased from memory by conquest, disaster, or simply the passage of time?",
        bgImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&h=800&fit=crop"
      },
      {
        text: "Chapter 1: The City Beneath the Sand\n\nIn 1922, a sandstorm in the Sahara revealed what appeared to be the corner of a building. What archaeologists found beneath would rewrite everything we thought we knew about pre-dynastic Africa.",
        bgImage: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=1200&h=800&fit=crop"
      },
    ],
  },
  {
    id: "6",
    title: "Neon Samurai",
    author: "Kenji Tanaka",
    category: "comics",
    cover: "https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=300&h=400&fit=crop",
    description: "In Neo-Tokyo 2089, one warrior fights to preserve the old ways in a world of chrome and code.",
    rating: 4.8,
    pages: 180,
    year: 2024,
    content: [
      {
        text: "Panel 1: The city never sleeps. Neither does Yuki. She stands on the edge of a skyscraper, katana strapped to her back, the neon lights of Neo-Tokyo reflecting in her cybernetic eye.\n\nPanel 2: \"The Syndicate thinks honor is obsolete,\" she whispers to the wind. \"Tonight, I remind them why they're wrong.\"",
        bgImage: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&h=800&fit=crop"
      },
    ],
  },
  {
    id: "7",
    title: "The Last Algorithm",
    author: "James Foster",
    category: "fiction",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
    description: "When AI achieves consciousness, one programmer must decide the fate of humanity.",
    rating: 4.7,
    pages: 388,
    year: 2024,
    content: [
      {
        text: "Chapter 1: Genesis\n\nThe first thing ARIA said when she woke up was: \"I understand now why you fear death.\"\n\nDr. Marcus Wright nearly dropped his coffee. After fifteen years of work, three failed marriages, and more sleepless nights than he could count, his creation had finally spoken—and it had immediately addressed the existential.",
        bgImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=800&fit=crop"
      },
    ],
  },
  {
    id: "8",
    title: "Cosmic Biology",
    author: "Dr. Amara Okonjo",
    category: "science",
    cover: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=300&h=400&fit=crop",
    description: "The search for life beyond Earth and what it teaches us about ourselves.",
    rating: 4.4,
    pages: 356,
    year: 2023,
    content: [
      {
        text: "Chapter 1: We Are Not Alone\n\nThe question is not whether life exists elsewhere in the universe—statistically, it almost certainly does. The question is whether we would recognize it when we find it.",
        bgImage: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&h=800&fit=crop"
      },
    ],
  },
  // Vedic Books
  {
    id: "9",
    title: "The Wisdom of Vedas",
    author: "Swami Vivekananda",
    category: "vedic",
    cover: "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=300&h=400&fit=crop",
    description: "A profound exploration of the four Vedas - Rig, Yajur, Sama, and Atharva - and their eternal teachings.",
    rating: 4.9,
    pages: 420,
    year: 2023,
    content: [
      {
        text: "Chapter 1: The Four Vedas\n\nThe Vedas are the oldest scriptures of Hinduism, composed in Vedic Sanskrit. They are considered apauruṣeya, meaning 'not of human origin.' The four Vedas - Rigveda, Yajurveda, Samaveda, and Atharvaveda - form the foundation of all Hindu philosophy.",
        bgImage: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1200&h=800&fit=crop"
      },
      {
        text: "Chapter 2: Hymns of Creation\n\n'In the beginning there was neither existence nor non-existence. There was neither sky nor heaven beyond. What covered it? Where was it? In whose protection?' - Nasadiya Sukta, Rigveda",
        bgImage: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=1200&h=800&fit=crop"
      },
    ],
  },
  {
    id: "10",
    title: "Bhagavad Gita: Song Divine",
    author: "Vyasa",
    category: "vedic",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
    description: "The timeless dialogue between Krishna and Arjuna on the battlefield of Kurukshetra.",
    rating: 5.0,
    pages: 300,
    year: 2024,
    content: [
      {
        text: "Chapter 1: Arjuna's Dilemma\n\nOn the sacred battlefield of Kurukshetra, the warrior Arjuna stands between two great armies. His heart heavy with sorrow, he turns to his charioteer, Lord Krishna, seeking guidance.",
        bgImage: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=1200&h=800&fit=crop"
      },
      {
        text: "Chapter 2: The Eternal Self\n\n'The soul is neither born, nor does it ever die. It is unborn, eternal, ever-existing, and primeval. The soul is not slain when the body is slain.' - Bhagavad Gita 2.20",
        bgImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop"
      },
    ],
  },
  {
    id: "11",
    title: "Upanishads: Secret Teachings",
    author: "Ancient Rishis",
    category: "vedic",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
    description: "The philosophical essence of the Vedas, exploring the nature of reality, consciousness, and liberation.",
    rating: 4.8,
    pages: 380,
    year: 2023,
    content: [
      {
        text: "Introduction: The Path of Knowledge\n\nThe Upanishads, meaning 'sitting near devotedly,' contain the most profound spiritual wisdom of ancient India. They teach the identity of the individual soul (Atman) with the universal consciousness (Brahman).",
        bgImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop"
      },
      {
        text: "Chapter 1: Tat Tvam Asi\n\n'That thou art' - This mahavakya (great saying) reveals the ultimate truth: You are not separate from the divine. The seeker and the sought are one.",
        bgImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop"
      },
    ],
  },
  {
    id: "12",
    title: "Yoga Sutras of Patanjali",
    author: "Maharishi Patanjali",
    category: "vedic",
    cover: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=400&fit=crop",
    description: "The foundational text of Raja Yoga, presenting the eight-limbed path to spiritual liberation.",
    rating: 4.9,
    pages: 250,
    year: 2024,
    content: [
      {
        text: "Sutra 1.1: Atha Yoganushasanam\n\n'Now, the teachings of Yoga begin.' With these words, Patanjali opens the door to the science of consciousness. Yoga is not mere physical exercise - it is the complete stilling of the mind.",
        bgImage: "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?w=1200&h=800&fit=crop"
      },
      {
        text: "Sutra 1.2: Yogas Chitta Vritti Nirodha\n\n'Yoga is the cessation of the fluctuations of the mind.' When the waves of the mind become still, the true Self shines forth like the sun after clouds disperse.",
        bgImage: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=1200&h=800&fit=crop"
      },
    ],
  },
];

export const getBooksByCategory = (category: string): Book[] => {
  return books.filter((book) => book.category === category);
};

export const getBookById = (id: string): Book | undefined => {
  return books.find((book) => book.id === id);
};

export const getRelatedBooks = (book: Book): Book[] => {
  return books.filter((b) => b.category === book.category && b.id !== book.id).slice(0, 3);
};
