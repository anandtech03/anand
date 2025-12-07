import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Lock, Mail, Eye, EyeOff, Sparkles, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import authBackground from "@/assets/auth-background.jpg";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email address");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setPageLoaded(true);
    
    // Check if already logged in
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        navigate("/");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      toast({
        title: "Invalid Email",
        description: emailResult.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    // Validate password
    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      toast({
        title: "Invalid Password",
        description: passwordResult.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match!",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast({
              title: "Login Failed",
              description: "Invalid email or password. Please try again.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Login Failed",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Welcome Back! 🎉",
            description: "You have successfully logged in.",
          });
          navigate("/");
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
          },
        });

        if (error) {
          if (error.message.includes("User already registered")) {
            toast({
              title: "Account Exists",
              description: "This email is already registered. Please login instead.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Sign Up Failed",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Account Created! 🎉",
            description: "Welcome to NeoLibrary!",
          });
          navigate("/");
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Left Side - Wolf Image */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:block absolute left-0 top-0 bottom-0 w-1/2"
      >
        <img
          src={authBackground}
          alt="Mystical wolf and moon"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background" />
        
        {/* Welcome Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center px-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center mb-6"
            >
              <div className="w-20 h-20 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center border border-primary/30">
                <BookOpen className="w-10 h-10 text-primary" />
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg"
            >
              <span className="text-foreground">Welcome</span>
              <br />
              <span className="text-gradient">Back!</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-foreground/80 text-lg max-w-sm mx-auto drop-shadow-md"
            >
              Enter the mystical world of knowledge
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="h-1 w-32 bg-gradient-to-r from-primary via-secondary to-accent rounded-full mt-6 mx-auto origin-center"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Login Panel */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 bg-background flex items-center justify-center p-6">
            {/* Glass Panel */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative w-full max-w-md"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50 rounded-2xl blur-xl opacity-50 animate-pulse" />
              
              {/* Panel Content */}
              <div className="relative glass-strong rounded-2xl p-8 border border-primary/20">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center mb-8"
                >
                  <div className="flex justify-center mb-4">
                    <motion.div
                      animate={{ 
                        boxShadow: [
                          "0 0 20px hsl(var(--primary) / 0.3)",
                          "0 0 40px hsl(var(--primary) / 0.5)",
                          "0 0 20px hsl(var(--primary) / 0.3)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50"
                    >
                      <User className="w-8 h-8 text-primary" />
                    </motion.div>
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">
                    {isLogin ? "Login" : "Sign Up"}
                  </h2>
                  <p className="text-muted-foreground">
                    {isLogin
                      ? "Enter your credentials to continue"
                      : "Create your account to get started"}
                  </p>
                </motion.div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email Field */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Label htmlFor="email" className="text-muted-foreground text-sm">
                      Email Address
                    </Label>
                    <div className="relative mt-2">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="pl-10 bg-background/50 border-border/50 focus:border-primary transition-all h-12"
                        required
                      />
                    </div>
                  </motion.div>

                  {/* Password Field */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Label htmlFor="password" className="text-muted-foreground text-sm">
                      Password
                    </Label>
                    <div className="relative mt-2">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="pl-10 pr-10 bg-background/50 border-border/50 focus:border-primary transition-all h-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </motion.div>

                  {/* Confirm Password (Sign Up Only) */}
                  <AnimatePresence>
                    {!isLogin && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Label htmlFor="confirmPassword" className="text-muted-foreground text-sm">
                          Confirm Password
                        </Label>
                        <div className="relative mt-2">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            className="pl-10 bg-background/50 border-border/50 focus:border-primary transition-all h-12"
                            required={!isLogin}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-12 bg-gradient-to-r from-primary via-primary/80 to-primary text-primary-foreground font-semibold rounded-xl relative overflow-hidden group"
                    >
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                      <span className="relative flex items-center justify-center gap-2">
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                          />
                        ) : (
                          <>
                            {isLogin ? "Login" : "Sign Up"}
                            <Sparkles className="w-4 h-4" />
                          </>
                        )}
                      </span>
                    </Button>
                  </motion.div>
                </form>

                {/* Toggle Login/Sign Up */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="mt-6 text-center"
                >
                  <p className="text-muted-foreground">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button
                      type="button"
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-primary hover:text-primary/80 font-semibold transition-colors hover:underline"
                    >
                      {isLogin ? "Sign Up" : "Login"}
                    </button>
                  </p>
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5 text-primary/50" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
      </div>

      {/* Back to Home */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-6 left-6 z-10"
      >
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="text-muted-foreground hover:text-foreground"
        >
          ← Back to Library
        </Button>
      </motion.div>
    </div>
  );
};

export default Auth;
