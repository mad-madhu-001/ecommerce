import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const CategoryShowcase = () => {
  const showcaseCategories = [
    {
  id: 'women',
  title: "Women's Collection",
  description: 'Elegant ethnic wear and modern fashion',
  image: '/ecommerce-uploads/women-6.jpg',
  bgColor: 'bg-rose-accent/10'
},
{
  id: 'men',
  title: "Men's Fashion",
  description: 'Sophisticated styles for every occasion',
  image: '/ecommerce-uploads/men-7.jpg',
  bgColor: 'bg-warm-orange/10'
},
{
  id: 'kids',
  title: "Kids Wear",
  description: 'Comfortable and adorable outfits',
  image: '/ecommerce-uploads/boy-3.jpg',
  bgColor: 'bg-secondary/10'
}

  ];

  return (
    <section className="py-16 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground">
            Find the perfect style for everyone in your family
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {showcaseCategories.map((category) => (
            <Card key={category.id} className={`group hover:shadow-warm transition-smooth overflow-hidden ${category.bgColor}`}>
              <div className="relative h-80 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                />
                <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/30 transition-smooth" />
                
                <CardContent className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                  <p className="text-white/90 mb-4">{category.description}</p>
                  
                  <Link to={`/category/${category.id}`}>
                    <Button variant="warm" className="group-hover:shadow-warm">
                      Explore Collection
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;