import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { confirmSignUp, resendSignUpCode } from "@aws-amplify/auth";

const Verify = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Email passed from signup
  const location = useLocation();
  const email = location.state?.email || "";

  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await confirmSignUp(email, code);

      toast({
        title: "Verification successful",
        description: "Your account has been verified! You can now sign in.",
      });

      navigate("/login");
    } catch (error: any) {
      console.error("Verification error:", error);

      toast({
        title: "Verification failed",
        description: error.message || "Invalid code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    try {
      await resendSignUpCode(email);

      toast({
        title: "Code resent",
        description: "A new verification code has been sent to your email.",
      });
    } catch (error: any) {
      console.error("Resend code error:", error);

      toast({
        title: "Resend failed",
        description: error.message || "Could not resend the code.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* MAIN SECTION */}
      <div className="flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2 text-2xl font-bold text-primary">
              <GraduationCap className="h-8 w-8" />
              <span>L-earnings</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Verify your email</h1>
            <p className="text-sm text-muted-foreground">
              Enter the verification code sent to <strong>{email}</strong>
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                type="text"
                placeholder="123456"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Verifying..." : "Verify Email"}
            </Button>
          </form>

          {/* Resend link */}
          <div className="text-center text-sm">
            Didn’t receive a code?{" "}
            <button
              onClick={handleResend}
              className="font-medium text-primary hover:underline"
            >
              Resend code
            </button>
          </div>

          {/* Back to login */}
          <div className="text-center text-sm">
            <button
              onClick={() => navigate("/login")}
              className="font-medium text-primary hover:underline"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
