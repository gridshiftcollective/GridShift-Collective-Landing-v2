import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated grid background with loading effect */}
      <div className="absolute inset-0 grid-pattern opacity-30 bg-drift grid-reveal"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/90 to-accent/5"></div>
      
      {/* Floating geometric elements */}
      <div className="hidden lg:block absolute top-1/4 left-1/4 w-2 h-2 bg-accent/40 rounded-full parallax-float"></div>
      <div className="hidden lg:block absolute top-1/3 right-1/3 w-1 h-1 bg-accent/60 rounded-full parallax-float-delay"></div>
      <div className="hidden lg:block absolute bottom-1/3 left-1/5 w-1 h-1 bg-accent/50 rounded-full parallax-float"></div>
      
      <div className="container mx-auto px-6 lg:px-12 text-center relative z-10 max-w-5xl flex flex-col justify-center min-h-screen py-20">
        {/* Logo with smooth reveal - enlarged and balanced */}
        <div className="mb-12 lg:mb-16 smooth-reveal">
          <img 
            src="/logos/GridShift-Full-T v2.png" 
            alt="GridShift" 
            className="h-28 md:h-32 lg:h-36 xl:h-44 mx-auto opacity-95 hover:opacity-100 transition-opacity duration-500"
          />
        </div>
        
        {/* Main headline with refined typography - reduced size for balance */}
        <div className="mb-16 lg:mb-20">
          <h1 className="text-3xl lg:text-5xl xl:text-6xl font-display font-bold leading-[1.1] mb-8 smooth-reveal smooth-reveal-delay-1">
            Where <span className="text-gradient">Structure</span>
            <br />
            Meets <span className="text-accent">Creativity</span>
          </h1>
          
          <p className="text-base lg:text-lg xl:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed smooth-reveal smooth-reveal-delay-2">
            A curated collective of independent creators, uniting our skills to build exceptional digital experiences.
          </p>
        </div>
        
        {/* Minimal CTA section */}
        <div className="smooth-reveal smooth-reveal-delay-3">
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Button 
              size="lg" 
              className="text-base px-8 py-4 magnetic-hover bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              View Our Work
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-base px-8 py-4 magnetic-hover border-border hover:border-accent/50 hover:bg-accent/5"
            >
              Meet the Team
            </Button>
          </div>
          
        </div>
      </div>
      
    </section>
  );
};

export default Hero;