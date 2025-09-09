import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import heroImage from '@/assets/hero-fashion.jpg';

const Hero = () => {
  return (
    <section className="relative h-[70vh] md:h-[90vh] overflow-hidden bg-gradient-subtle">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Fashion FreshWear Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/40" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-card/20 backdrop-blur-sm border border-white/20 mb-6">
            <Sparkles className="h-4 w-4 mr-2 text-warm-orange" />
            <span className="text-sm font-medium">New Collection 2025</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Discover Your
            <span className="block bg-gradient-warm bg-clip-text text-transparent">
              Perfect FitAura
            </span>
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed">
            Explore our curated collection of premium fashion for men, women, and kids. 
            From traditional elegance to modern trends, find your unique style at unbeatable prices.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/collections">
              <Button size="lg" variant="warm" className="w-full sm:w-auto">
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Link to="/category/women">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20">
                Browse Categories
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-warm-orange">500+</div>
              <div className="text-sm text-white/80">Premium Products</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-warm-orange">50k+</div>
              <div className="text-sm text-white/80">Happy Customers</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-warm-orange">4.8★</div>
              <div className="text-sm text-white/80">Customer Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;