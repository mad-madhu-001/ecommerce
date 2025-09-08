import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Phone, Mail, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const Login = () => {
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handlePhoneLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive"
      });
      return;
    }
    
    // Navigate to OTP verification with phone number
    navigate('/auth/verify-otp', { state: { phoneNumber, method: 'login' } });
    
    toast({
      title: "OTP Sent",
      description: `Verification code sent to +91 ${phoneNumber}`,
    });
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock email login - in real app would authenticate here
    toast({
      title: "Login Successful",
      description: "Welcome back to Boutique!",
    });
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>Login - Boutique Fashion Store</title>
        <meta name="description" content="Login to your Boutique account to access exclusive offers and manage your orders." />
      </Helmet>

      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-elegant">
          <CardHeader className="text-center space-y-4">
            <Link to="/" className="inline-flex items-center text-foreground hover:text-secondary transition-smooth">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <p className="text-muted-foreground">Sign in to your account</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Login Method Toggle */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-lg">
              <Button
                variant={loginMethod === 'phone' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLoginMethod('phone')}
                className="transition-smooth"
              >
                <Phone className="h-4 w-4 mr-2" />
                Phone
              </Button>
              <Button
                variant={loginMethod === 'email' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLoginMethod('email')}
                className="transition-smooth"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
            </div>

            {/* Phone Login Form */}
            {loginMethod === 'phone' && (
              <form onSubmit={handlePhoneLogin} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Phone Number
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 border border-r-0 border-border bg-muted text-muted-foreground rounded-l-md">
                      +91
                    </span>
                    <Input
                      type="tel"
                      placeholder="Enter 10-digit number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="rounded-l-none"
                      required
                    />
                  </div>
                </div>
                
                <Button type="submit" variant="warm" className="w-full">
                  Send OTP
                </Button>
              </form>
            )}

            {/* Email Login Form */}
            {loginMethod === 'email' && (
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="text-right">
                  <Link to="/auth/forgot-password" className="text-sm text-secondary hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                
                <Button type="submit" variant="warm" className="w-full">
                  Sign In
                </Button>
              </form>
            )}

            <Separator />

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/auth/signup" className="text-secondary hover:underline font-medium">
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;