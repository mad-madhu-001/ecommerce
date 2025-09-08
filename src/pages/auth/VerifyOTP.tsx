import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Shield, RotateCcw } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const { phoneNumber, method, userData } = location.state || {};

  // Countdown timer for resend OTP
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  // Redirect if no phone number provided
  useEffect(() => {
    if (!phoneNumber) {
      navigate('/auth/login');
    }
  }, [phoneNumber, navigate]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the complete 6-digit OTP.",
        variant: "destructive"
      });
      return;
    }

    // Mock OTP verification - in real app would verify with backend
    if (otpCode === '123456') {
      toast({
        title: method === 'signup' ? "Account Created!" : "Login Successful!",
        description: method === 'signup' 
          ? `Welcome to Boutique, ${userData?.name || 'User'}!`
          : "Welcome back to Boutique!",
      });
      navigate('/');
    } else {
      toast({
        title: "Invalid OTP",
        description: "The OTP you entered is incorrect. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleResendOtp = () => {
    setTimeLeft(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    
    toast({
      title: "OTP Resent",
      description: `New verification code sent to +91 ${phoneNumber}`,
    });
  };

  if (!phoneNumber) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Verify OTP - Boutique Fashion Store</title>
        <meta name="description" content="Verify your phone number to complete the authentication process." />
      </Helmet>

      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-elegant">
          <CardHeader className="text-center space-y-4">
            <Link to="/auth/login" className="inline-flex items-center text-foreground hover:text-secondary transition-smooth">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </Link>
            <div className="mx-auto w-16 h-16 bg-warm-orange/10 rounded-full flex items-center justify-center">
              <Shield className="h-8 w-8 text-warm-orange" />
            </div>
            <CardTitle className="text-2xl font-bold">Verify Your Phone</CardTitle>
            <p className="text-muted-foreground">
              We've sent a 6-digit verification code to<br />
              <span className="font-semibold text-foreground">+91 {phoneNumber}</span>
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              {/* OTP Input Fields */}
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block text-center">
                  Enter Verification Code
                </label>
                <div className="flex justify-center space-x-3">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value.replace(/[^0-9]/g, ''))}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 text-center text-lg font-semibold border-2 focus:border-warm-orange"
                    />
                  ))}
                </div>
              </div>

              {/* Demo hint */}
              <div className="text-center p-3 bg-secondary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Demo:</strong> Use <code className="bg-muted px-1 rounded">123456</code> as OTP
                </p>
              </div>

              <Button type="submit" variant="warm" className="w-full">
                Verify & Continue
              </Button>
            </form>

            {/* Resend OTP */}
            <div className="text-center">
              {!canResend ? (
                <p className="text-sm text-muted-foreground">
                  Resend code in <span className="font-semibold text-warm-orange">{timeLeft}s</span>
                </p>
              ) : (
                <Button
                  variant="ghost"
                  onClick={handleResendOtp}
                  className="text-secondary hover:text-secondary/80"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Resend OTP
                </Button>
              )}
            </div>

            {/* Help text */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Didn't receive the code? Check your SMS inbox or try again in a few moments.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default VerifyOTP;