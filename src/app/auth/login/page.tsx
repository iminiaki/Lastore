"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, Phone } from "lucide-react";
import { useAuth } from "@/components/auth-context";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"email" | "phone">("email");
  const [phoneLoginMethod, setPhoneLoginMethod] = useState<"password" | "otp">("password");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const sendOtp = async () => {
    if (!formData.phone.trim()) {
      return;
    }
    
    setIsLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
      setResendTimer(60); // Start 60 second countdown
      console.log("OTP sent to:", formData.phone);
    }, 1000);
  };

  const resendOtp = async () => {
    if (resendTimer > 0) return;
    
    setIsLoading(true);
    // Simulate OTP resending
    setTimeout(() => {
      setIsLoading(false);
      setResendTimer(60); // Restart 60 second countdown
      console.log("OTP resent to:", formData.phone);
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === "phone" && phoneLoginMethod === "otp" && !otpSent) {
      await sendOtp();
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (activeTab === "email") {
        await login(formData.email, formData.password);
      } else {
        if (phoneLoginMethod === "password") {
          await login(formData.phone, formData.password);
        } else {
          // For OTP login, verify OTP first
          if (otp.length === 6) {
            await login(formData.phone, "otp-verified");
          } else {
            throw new Error("Invalid OTP");
          }
        }
      }
      router.push("/profile");
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4">
      <Card className="w-full max-w-md py-8">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Login Method Tabs */}
          <div className="flex space-x-1 bg-muted p-1 rounded-lg mb-6">
            <button
              type="button"
              onClick={() => setActiveTab("email")}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                activeTab === "email"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Mail className="h-4 w-4 inline mr-2" />
              Email
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("phone")}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                activeTab === "phone"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Phone className="h-4 w-4 inline mr-2" />
              Phone
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === "email" ? (
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Phone Login Method Selector */}
                <div className="space-y-2">
                  <Label>Login Method</Label>
                  <div className="flex space-x-1 bg-muted p-1 rounded-lg">
                    <button
                      type="button"
                      onClick={() => {
                        setPhoneLoginMethod("password");
                        setOtpSent(false);
                        setOtp("");
                      }}
                      className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                        phoneLoginMethod === "password"
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Password
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPhoneLoginMethod("otp");
                        setOtpSent(false);
                        setOtp("");
                      }}
                      className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                        phoneLoginMethod === "otp"
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      OTP
                    </button>
                  </div>
                </div>

                {/* OTP Input */}
                {phoneLoginMethod === "otp" && otpSent && (
                  <div className="space-y-2">
                    <Label htmlFor="otp">OTP Verification</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      required
                    />
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        OTP sent to {formData.phone}
                      </p>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={resendOtp}
                        disabled={resendTimer > 0 || isLoading}
                        className="text-xs text-primary hover:text-primary/80"
                      >
                        {resendTimer > 0 
                          ? `Resend in ${resendTimer}s` 
                          : "Resend OTP"
                        }
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Password field - only show for email or phone password login */}
            {(activeTab === "email" || (activeTab === "phone" && phoneLoginMethod === "password")) && (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <Link 
                href="/auth/forgot-password" 
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading 
                ? (activeTab === "phone" && phoneLoginMethod === "otp" && !otpSent ? "Sending OTP..." : "Signing in...") 
                : (activeTab === "phone" && phoneLoginMethod === "otp" && !otpSent ? "Send OTP" : "Sign in")
              }
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link href="/auth/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
