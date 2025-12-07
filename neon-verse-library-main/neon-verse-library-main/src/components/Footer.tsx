import { Link } from "react-router-dom";
import { Book, Github, Twitter, Sparkles } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Book className="h-6 w-6 text-primary" />
              <span className="font-display text-lg font-bold text-gradient">
                NeoLibrary
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              The future of digital reading. Immersive, intelligent, infinite.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 rounded-lg glass hover:bg-primary/10 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg glass hover:bg-primary/10 transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              {["Categories", "Trending", "New Releases", "Authors"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {["Fiction", "Science", "Technology", "Romance"].map((cat) => (
                <li key={cat}>
                  <Link
                    to="/categories"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Get personalized recommendations weekly.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 rounded-lg bg-muted text-sm border border-border focus:border-primary outline-none transition-colors"
              />
              <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                <Sparkles className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2024 NeoLibrary. Crafted with ✨ for book lovers everywhere.</p>
        </div>
      </div>
    </footer>
  );
};
