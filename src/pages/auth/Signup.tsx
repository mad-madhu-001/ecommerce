import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Phone, Mail, ArrowLeft, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const Signup = () => {
  const [signupMethod, setSignupMethod] = useState<'phone' | 'email'>('phone');
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const navigate = useNavigate();

  const handlePhoneSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreeToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions to continue.",
        variant: "destructive"
      });
      return;
    }

    if (formData.phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive"
      });
      return;
    }
    
    // Navigate to OTP verification with user data
    navigate('/auth/verify-otp', { 
      state: { 
        phoneNumber: formData.phoneNumber, 
        method: 'signup',
        userData: formData
      } 
    });
    
    toast({
      title: "OTP Sent",
      description: `Verification code sent to +91 ${formData.phoneNumber}`,
    });
  };

  const handleEmailSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreeToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions to continue.",
        variant: "destructive"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      return;
    }

    // Mock email signup - in real app would create account here
    toast({
      title: "Account Created",
      description: "Welcome to Boutique! Your account has been created successfully.",
    });
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>Sign Up - Boutique Fashion Store</title>
        <meta name="description" content="Create your Boutique account to enjoy exclusive offers and personalized shopping experience." />
      </Helmet>

      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-elegant">
          <CardHeader className="text-center space-y-4">
            <Link to="/" className="inline-flex items-center text-foreground hover:text-secondary transition-smooth">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
            <p className="text-muted-foreground">Join Boutique family today</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Signup Method Toggle */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-lg">
              <Button
                variant={signupMethod === 'phone' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSignupMethod('phone')}
                className="transition-smooth"
              >
                <Phone className="h-4 w-4 mr-2" />
                Phone
              </Button>
              <Button
                variant={signupMethod === 'email' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSignupMethod('email')}
                className="transition-smooth"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
            </div>

            {/* Common Name Field */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Phone Signup Form */}
            {signupMethod === 'phone' && (
              <form onSubmit={handlePhoneSignup} className="space-y-4">
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
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        phoneNumber: e.target.value.replace(/\D/g, '').slice(0, 10) 
                      }))}
                      className="rounded-l-none"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms-phone"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                  />
                  <label htmlFor="terms-phone" className="text-sm text-muted-foreground">
                    I agree to the{' '}
                    <Link to="/terms" className="text-secondary hover:underline">
                      Terms & Conditions
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-secondary hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                
                <Button type="submit" variant="warm" className="w-full">
                  Send OTP
                </Button>
              </form>
            )}

            {/* Email Signup Form */}
            {signupMethod === 'email' && (
              <form onSubmit={handleEmailSignup} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Confirm Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms-email"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                  />
                  <label htmlFor="terms-email" className="text-sm text-muted-foreground">
                    I agree to the{' '}
                    <Link to="/terms" className="text-secondary hover:underline">
                      Terms & Conditions
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-secondary hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                
                <Button type="submit" variant="warm" className="w-full">
                  Create Account
                </Button>
              </form>
            )}

            <Separator />

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/auth/login" className="text-secondary hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Signup;