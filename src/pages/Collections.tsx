import React from 'react';
import { Helmet } from 'react-helmet-async';
import { sampleProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingUp, Star } from 'lucide-react';

const Collections = () => {
  const featuredProducts = sampleProducts.filter(product => product.isFeatured);
  const newProducts = sampleProducts.filter(product => product.isNew);
  const topRatedProducts = sampleProducts
    .filter(product => product.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  return (
    <>
      <Helmet>
        <title>Collections - Premium Fashion at Boutique</title>
        <meta name="description" content="Explore our curated fashion collections including new arrivals, featured items, and top-rated clothing for men, women, and kids." />
        <meta name="keywords" content="fashion collections, new arrivals, featured clothing, boutique fashion, premium wear" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Collections
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover carefully curated fashion collections that blend style, comfort, and quality. 
            From timeless classics to the latest trends.
          </p>
        </div>

        {/* Featured Collection */}
        <section className="mb-16">
          <Card className="mb-8 bg-gradient-warm text-white overflow-hidden">
            <CardContent className="p-8 text-center">
              <Sparkles className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Featured Collection</h2>
              <p className="text-white/90 mb-4">
                Handpicked styles that define contemporary fashion
              </p>
              <Badge className="bg-white/20 text-white">
                {featuredProducts.length} Premium Items
              </Badge>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* New Arrivals */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-warm-orange" />
              <div>
                <h2 className="text-3xl font-bold text-foreground">New Arrivals</h2>
                <p className="text-muted-foreground">Fresh styles just landed</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-sm">
              Latest Trends
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Top Rated */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
              <div>
                <h2 className="text-3xl font-bold text-foreground">Top Rated</h2>
                <p className="text-muted-foreground">Customer favorites with 4.5+ stars</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-sm">
              Highly Rated
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topRatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Category Collections */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Shop by Category</h2>
            <p className="text-muted-foreground">
              Explore our specialized collections for every style preference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                category: 'women',
                title: 'Women\'s Fashion',
                description: 'Elegant ethnic wear and contemporary styles',
                count: sampleProducts.filter(p => p.category === 'women').length,
                image: '/lovable-uploads/ead80a58-46cb-492f-a0a9-14d813528f5b.png'
              },
              {
                category: 'men',
                title: 'Men\'s Collection',
                description: 'Sophisticated looks for every occasion',
                count: sampleProducts.filter(p => p.category === 'men').length,
                image: '/lovable-uploads/78103555-4bf0-4de0-9c29-c1aec986ac54.png'
              },
              {
                category: 'kids',
                title: 'Kids Wear',
                description: 'Comfortable and delightful outfits',
                count: sampleProducts.filter(p => p.category === 'kids').length,
                image: '/lovable-uploads/b97b5af5-ace2-4776-938b-462fc795810c.png'
              }
            ].map((collection) => (
              <Card key={collection.category} className="group hover:shadow-elegant transition-smooth overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                  <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-charcoal/50 transition-smooth" />
                </div>
                
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-foreground mb-2">{collection.title}</h3>
                  <p className="text-muted-foreground mb-4">{collection.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">
                      {collection.count} items
                    </Badge>
                    <Button variant="warm" size="sm" asChild>
                      <a href={`/category/${collection.category}`}>
                        Explore
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Collections;