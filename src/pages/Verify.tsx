import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { confirmSignUp, resendSignUpCode } from "@aws-amplify/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Verify = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();

  // The email passed from signup page
  const email = location.state?.email;

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  if (!email) {
    return (
      <div className="text-center pt-20">
        <p>Error: No email provided</p>
        <a href="/signup" className="text-blue-600 underline">
          Go back to signup
        </a>
      </div>
    );
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await confirmSignUp({
        username: email,   // REQUIRED
        confirmationCode: code,
      });

      toast({
        title: "Email verified!",
        description: "Your account has been successfully verified.",
      });

      navigate("/login");
    } catch (error: any) {
      console.error("Verification error:", error);

      toast({
        title: "Verification failed",
        description: error.message || "Invalid code. Try again.",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  const handleResend = async () => {
    try {
      await resendSignUpCode({ username: email });

      toast({
        title: "Code sent",
        description: "A new verification code was sent to your email.",
      });
    } catch (error: any) {
      console.error("Resend error:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-2 text-center">Verify your email</h2>
        <p className="text-center text-sm text-muted-foreground mb-6">
          Enter the verification code sent to <strong>{email}</strong>
        </p>

        <form onSubmit={handleVerify} className="space-y-4">
          <Input
            placeholder="Enter verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Verifying..." : "Verify Email"}
          </Button>
        </form>

        <button
          className="mt-4 text-sm text-primary underline w-full text-center"
          onClick={handleResend}
        >
          Resend code
        </button>

        <button
          onClick={() => navigate("/login")}
          className="mt-3 text-sm text-primary underline w-full text-center"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default Verify;
