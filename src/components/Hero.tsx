import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Palette, Camera } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 grid-pattern-subtle opacity-40"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent/5"></div>
      
      {/* Floating Grid Elements - Hidden on mobile */}
      <div className="hidden md:block absolute top-20 left-20 w-32 h-32 border border-accent/20 rotate-12 animate-float"></div>
      <div className="hidden md:block absolute bottom-32 right-32 w-24 h-24 border border-accent/30 -rotate-12 animate-pulse"></div>
      <div className="hidden md:block absolute top-40 right-20 w-16 h-16 bg-accent/10 rotate-45 animate-float" style={{animationDelay: '1s'}}></div>
      
      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        {/* Logo Section */}
        <div className="mb-6 md:mb-8 animate-fade-in">
          <img 
            src="/logos/GridShift-Full-T v2.png" 
            alt="GridShift Logo" 
            className="h-24 md:h-32 lg:h-40 mx-auto mb-4 md:mb-6 hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Main Headline */}
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-display font-bold mb-4 md:mb-6 leading-tight animate-slide-up px-4">
          Where <span className="text-gradient">Structure</span>
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>Meets <span className="text-accent">Creativity</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-base md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed px-4">
          A curated collective of independent developers, designers, and artists, 
          uniting our skills to build exceptional digital experiences.
        </p>
        
        {/* Service Icons */}
        <div className="flex justify-center gap-4 md:gap-8 mb-8 md:mb-12 px-4">
          <div className="flex flex-col items-center group">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-secondary rounded-lg flex items-center justify-center mb-2 group-hover:bg-accent/20 transition-colors">
              <Code className="w-6 h-6 md:w-8 md:h-8 text-accent" />
            </div>
            <span className="text-xs md:text-sm text-muted-foreground">Development</span>
          </div>
          <div className="flex flex-col items-center group">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-secondary rounded-lg flex items-center justify-center mb-2 group-hover:bg-accent/20 transition-colors">
              <Palette className="w-6 h-6 md:w-8 md:h-8 text-accent" />
            </div>
            <span className="text-xs md:text-sm text-muted-foreground">Design</span>
          </div>
          <div className="flex flex-col items-center group">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-secondary rounded-lg flex items-center justify-center mb-2 group-hover:bg-accent/20 transition-colors">
              <Camera className="w-6 h-6 md:w-8 md:h-8 text-accent" />
            </div>
            <span className="text-xs md:text-sm text-muted-foreground">Photography</span>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
          <Button size="lg" className="text-sm md:text-lg px-6 md:px-8 py-3 hover-lift w-full sm:w-auto">
            View Our Work
            <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
          </Button>
          <Button variant="outline" size="lg" className="text-sm md:text-lg px-6 md:px-8 py-3 hover-lift w-full sm:w-auto">
            Meet the Team
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;