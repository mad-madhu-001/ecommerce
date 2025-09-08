import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Gift } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const deliveryCharge = getTotalPrice() >= 999 ? 0 : 99;
  const finalTotal = getTotalPrice() + deliveryCharge;

  if (cartItems.length === 0) {
    return (
      <>
        <Helmet>
          <title>Shopping Cart - Boutique Fashion Store</title>
          <meta name="description" content="Your shopping cart is empty. Start shopping for premium fashion at Boutique." />
        </Helmet>

        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Your Cart is Empty</h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
              </p>
              <Link to="/collections">
                <Button variant="warm" size="lg">
                  Start Shopping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Shopping Cart ({getTotalItems()} items) - Boutique Fashion Store</title>
        <meta name="description" content={`Review your ${getTotalItems()} selected items and proceed to checkout. Total: ${formatPrice(finalTotal)}`} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Product Image */}
                    <div className="w-full md:w-32 h-32 flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <Link 
                          to={`/product/${item.product.id}`}
                          className="text-lg font-semibold text-foreground hover:text-secondary transition-smooth"
                        >
                          {item.product.name}
                        </Link>
                        <div className="flex items-center space-x-4 mt-1">
                          <Badge variant="outline" className="text-xs">
                            Size: {item.selectedSize}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Color: {item.selectedColor}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg font-bold text-foreground">
                            {formatPrice(item.product.price)}
                          </span>
                          {item.product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              {formatPrice(item.product.originalPrice)}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center space-x-3">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-border rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.selectedColor,
                                item.quantity - 1
                              )}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.selectedColor,
                                item.quantity + 1
                              )}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          {/* Remove Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor
                            )}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-sm text-muted-foreground">
                          Subtotal: {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span className={deliveryCharge === 0 ? 'text-accent line-through' : ''}>
                      {deliveryCharge === 0 ? 'FREE' : formatPrice(deliveryCharge)}
                    </span>
                  </div>
                  
                  {deliveryCharge === 0 && (
                    <div className="flex items-center text-accent text-sm">
                      <Gift className="h-4 w-4 mr-2" />
                      Free delivery on orders above ₹999
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>

                {getTotalPrice() < 999 && (
                  <div className="p-3 bg-secondary/10 rounded-lg text-sm text-center">
                    Add {formatPrice(999 - getTotalPrice())} more for free delivery!
                  </div>
                )}

                <div className="space-y-3">
                  <Link to="/checkout">
                    <Button variant="warm" size="lg" className="w-full">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  
                  <Link to="/collections">
                    <Button variant="outline" size="lg" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                {/* Security Badges */}
                <div className="pt-4 border-t border-border">
                  <div className="text-xs text-muted-foreground text-center space-y-1">
                    <p>🔒 Secure Checkout</p>
                    <p>📦 Easy Returns & Exchanges</p>
                    <p>🚚 Fast & Reliable Delivery</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;