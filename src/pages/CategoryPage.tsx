import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Filter, Search, SlidersHorizontal, Grid, List } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { sampleProducts, categories, subcategories } from '@/data/products';
import { Product } from '@/types/product';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'featured');
  const [selectedSubcategory, setSelectedSubcategory] = useState(searchParams.get('subcategory') || 'all');
  const [priceRange, setPriceRange] = useState(searchParams.get('price') || 'all');

  const category = categories.find(cat => cat.id === categoryId);
  const categorySubcategories = categoryId ? subcategories[categoryId as keyof typeof subcategories] || [] : [];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = sampleProducts.filter(product => {
      // Category filter
      if (categoryId && product.category !== categoryId) return false;
      
      // Search filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) {
        return false;
      }
      
      // Subcategory filter
      if (selectedSubcategory !== 'all' && product.subcategory !== selectedSubcategory) return false;
      
      // Price range filter
      if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(Number);
        if (max) {
          if (product.price < min || product.price > max) return false;
        } else {
          if (product.price < min) return false;
        }
      }
      
      return true;
    });
    

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'discount':
        filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      default: // featured
        filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return filtered;
  }, [categoryId, searchQuery, selectedSubcategory, priceRange, sortBy]);

  const updateSearchParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'all' || value === '') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchParams('search', searchQuery);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSortBy('featured');
    setSelectedSubcategory('all');
    setPriceRange('all');
    setSearchParams({});
  };

  if (categoryId && !category) {
    return <div>Category not found</div>;
  }

  const pageTitle = category ? `${category.name}'s Fashion` : 'All Products';
  const pageDescription = category 
    ? `Discover the latest ${category.name.toLowerCase()}'s fashion collection at FreshWear. Premium quality clothing with unbeatable prices.`
    : 'Browse our complete collection of premium fashion for men, women, and kids.';

  return (
    <>
      <Helmet>
        <title>{pageTitle} - FreshWear Fashion Store</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={`${category?.name.toLowerCase() || 'fashion'}, clothing, freshwear, online shopping, premium fashion`} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {pageTitle}
          </h1>
          <p className="text-lg text-muted-foreground">
            {pageDescription}
          </p>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {/* Search */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </form>

              {/* Subcategory Filter */}
              {categorySubcategories.length > 0 && (
                <Select value={selectedSubcategory} onValueChange={(value) => {
                  setSelectedSubcategory(value);
                  updateSearchParams('subcategory', value);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categorySubcategories.map((subcat) => (
                      <SelectItem key={subcat} value={subcat}>
                        {subcat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {/* Price Range Filter */}
              <Select value={priceRange} onValueChange={(value) => {
                setPriceRange(value);
                updateSearchParams('price', value);
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="0-1000">Under ₹1,000</SelectItem>
                  <SelectItem value="1000-2500">₹1,000 - ₹2,500</SelectItem>
                  <SelectItem value="2500-5000">₹2,500 - ₹5,000</SelectItem>
                  <SelectItem value="5000">Above ₹5,000</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort By */}
              <Select value={sortBy} onValueChange={(value) => {
                setSortBy(value);
                updateSearchParams('sort', value);
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="discount">Best Offers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  <Filter className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
                
                {(searchQuery || selectedSubcategory !== 'all' || priceRange !== 'all') && (
                  <div className="flex items-center space-x-2">
                    {searchQuery && (
                      <Badge variant="secondary">Search: {searchQuery}</Badge>
                    )}
                    {selectedSubcategory !== 'all' && (
                      <Badge variant="secondary">
                        {selectedSubcategory.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </Badge>
                    )}
                    {priceRange !== 'all' && (
                      <Badge variant="secondary">
                        {priceRange === '5000' ? 'Above ₹5,000' : 
                         priceRange === '0-1000' ? 'Under ₹1,000' :
                         `₹${priceRange.replace('-', ' - ₹')}`}
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {filteredProducts.length} products found
                </span>
                <Separator orientation="vertical" className="h-6" />
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <SlidersHorizontal className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search criteria
              </p>
              <Button variant="warm" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default CategoryPage;