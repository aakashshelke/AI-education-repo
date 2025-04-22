
import { motion } from "framer-motion";
import { BookOpen, RefreshCw, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero section */}
      <section className="relative bg-gradient-to-b from-primary/30 to-primary/10 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              IMPROVING DOMAIN-SPECIFIC AI EDUCATION
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              A structured approach to design domain-specific AI courses 
              and help teachers to bring AI education into their respective domain.
            </p>
            <Button 
              size="lg" 
              onClick={handleExplore}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg h-auto"
            >
              Explore Canvases
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Open</h3>
              <p className="text-muted-foreground">Accessible educational resources for all learners and educators.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <RefreshCw className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Living</h3>
              <p className="text-muted-foreground">Continuously updated with the latest AI advancements and techniques.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Gem className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Impactful</h3>
              <p className="text-muted-foreground">Designed to create meaningful learning outcomes and practical skills.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Split section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-slate-300 to-slate-400 rounded-xl min-h-[400px]">
              {/* Image placeholder - can be replaced with an actual image */}
            </div>
            <div className="flex flex-col justify-center p-6 md:p-10 bg-slate-800 rounded-xl text-white">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-6">FREELY AVAILABLE TO EVERYONE</h2>
                <p className="text-slate-300 mb-6">
                  The AI Course Design Planning Framework can be downloaded by anyone free of charge 
                  and can be used for their own projects, whether in research, education or beyond 
                  (CC BY-SA 4.0 license).
                </p>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-slate-800"
                  onClick={handleExplore}
                >
                  Get Started
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
