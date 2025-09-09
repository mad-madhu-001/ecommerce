import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold">
              <span className="bg-gradient-warm bg-clip-text text-transparent">
                FreshWear
              </span>
            </Link>
            <p className="text-white/80 leading-relaxed">
              Your destination for premium fashion. Discover unique styles that express your personality.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-white/60 hover:text-warm-orange">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white/60 hover:text-warm-orange">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white/60 hover:text-warm-orange">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-warm-orange">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/category/women" className="block text-white/80 hover:text-warm-orange transition-smooth">
                Women's Fashion
              </Link>
              <Link to="/category/men" className="block text-white/80 hover:text-warm-orange transition-smooth">
                Men's Collection
              </Link>
              <Link to="/category/kids" className="block text-white/80 hover:text-warm-orange transition-smooth">
                Kids Wear
              </Link>
              <Link to="/collections" className="block text-white/80 hover:text-warm-orange transition-smooth">
                New Arrivals
              </Link>
              <Link to="/sale" className="block text-white/80 hover:text-warm-orange transition-smooth">
                Sale Items
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-warm-orange">Customer Service</h3>
            <div className="space-y-2">
              <Link to="/contact" className="block text-white/80 hover:text-warm-orange transition-smooth">
                Contact Us
              </Link>
              <Link to="/shipping" className="block text-white/80 hover:text-warm-orange transition-smooth">
                Shipping Info
              </Link>
              <Link to="/returns" className="block text-white/80 hover:text-warm-orange transition-smooth">
                Returns & Exchanges
              </Link>
              <Link to="/size-guide" className="block text-white/80 hover:text-warm-orange transition-smooth">
                Size Guide
              </Link>
              <Link to="/faq" className="block text-white/80 hover:text-warm-orange transition-smooth">
                FAQ
              </Link>
            </div>
          </div>

          {/* Newsletter & Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-warm-orange">Stay Connected</h3>
            <p className="text-white/80 text-sm">
              Subscribe to get special offers and updates
            </p>
            
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button variant="warm" className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </div>

            <div className="space-y-2 pt-4">
              <div className="flex items-center space-x-2 text-white/80">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <Mail className="h-4 w-4" />
                <span className="text-sm">9876xyz@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Visakhapatnam, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm">
              © 2025 FreshWear. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-white/60 hover:text-warm-orange transition-smooth">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-white/60 hover:text-warm-orange transition-smooth">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-white/60 hover:text-warm-orange transition-smooth">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;