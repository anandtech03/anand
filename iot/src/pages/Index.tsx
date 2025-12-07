import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CategorySection } from "@/components/CategorySection";
import { Chatbot } from "@/components/Chatbot";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <CategorySection />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
