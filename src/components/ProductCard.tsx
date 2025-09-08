import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/types/product';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.inStock && product.sizes.length > 0 && product.colors.length > 0) {
      addToCart(product, product.sizes[0], product.colors[0], 1);
    }
  };

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <Card className="group cursor-pointer hover:shadow-elegant transition-smooth overflow-hidden">
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-smooth"
            loading="lazy"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 space-y-1">
            {product.isNew && (
              <Badge className="bg-accent text-accent-foreground">New</Badge>
            )}
            {product.discount && (
              <Badge className="bg-secondary text-secondary-foreground">
                {product.discount}% OFF
              </Badge>
            )}
            {!product.inStock && (
              <Badge variant="destructive">Out of Stock</Badge>
            )}
          </div>

          {/* Wishlist button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-card/80 hover:bg-card shadow-soft"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>

          {/* Quick add to cart */}
          {product.inStock && (
            <Button
              variant="warm"
              size="sm"
              className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-smooth"
              onClick={handleQuickAdd}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Quick Add
            </Button>
          )}
        </div>

        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground group-hover:text-secondary transition-smooth line-clamp-2">
              {product.name}
            </h3>
            
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount})
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-foreground">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Size and color indicators */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{product.sizes.length} sizes</span>
              <span>{product.colors.length} colors</span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;