import { signUp } from "@aws-amplify/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// ⚡ Your DynamoDB Save Profile API (POST)
const SAVE_PROFILE_URL =
  "https://3l0qi6u7nc.execute-api.us-east-1.amazonaws.com/newStage2/profile";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // NEW FIELD
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const { toast } = useToast();
  const navigate = useNavigate();

  // ------------------------------------------
  // 🟦 Validate Form
  // ------------------------------------------
  const validateForm = () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  // ------------------------------------------
  // 🟩 Handle Signup
  // ------------------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !agreedTerms) return;

    setIsSubmitting(true);

    try {
      // ------------------------------------------
      // 1️⃣ Create User in Cognito
      // ------------------------------------------
      const result = await signUp({
        username: email,
        password,
        attributes: {
          email,
          name: fullName,
          phone_number: phone ? `+91${phone}` : undefined,
        },
      });

      const userId = result.userId || email; // fallback

      // ------------------------------------------
      // 2️⃣ Save user to DynamoDB (your backend)
      // ------------------------------------------
      await fetch(SAVE_PROFILE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          name: fullName,
          email,
          phone,
          address: "",
          bio: "",
        }),
      });

      // ------------------------------------------
      // 3️⃣ Go to verification page
      // ------------------------------------------
      toast({
        title: "Account created!",
        description: "A verification code has been sent to your email.",
      });

      navigate("/verify", { state: { email } });

    } catch (error: any) {
      console.error("Signup error:", error);

      let message = "Signup failed.";
      if (error.code === "UsernameExistsException")
        message = "An account with this email already exists.";
      else if (error.message) message = error.message;

      toast({
        title: "Signup Failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ------------------------------------------
  // UI
  // ------------------------------------------
  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* LEFT SIDE */}
      <div className="hidden lg:block lg:w-1/2 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/30"></div>
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-lg text-center space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Performance-Based Learning
            </div>
            <h2 className="text-3xl font-bold md:text-4xl">
              Education that rewards excellence
            </h2>
            <p className="text-muted-foreground md:text-lg">
              Join thousands of learners benefiting from performance-based pricing.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col items-center justify-center w-full px-4 lg:w-1/2 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-6">

          <div className="text-center space-y-2">
            <Link to="/" className="inline-block">
              <div className="flex items-center gap-2 text-2xl font-bold text-primary">
                <GraduationCap className="h-8 w-8" />
                <span>L-earnings</span>
              </div>
            </Link>
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-sm text-muted-foreground">
              Sign up to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* FULL NAME */}
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* PHONE */}
            <div className="space-y-2">
              <Label>Phone (optional)</Label>
              <Input
                placeholder="9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="space-y-2">
              <Label>Confirm Password</Label>
              <Input
                type="password"
                value={confirmPassword}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {passwordError && (
                <p className="text-sm text-destructive">{passwordError}</p>
              )}
            </div>

            {/* TERMS */}
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={agreedTerms}
                onCheckedChange={(v) => setAgreedTerms(v as boolean)}
              />
              <label className="text-sm">
                I agree to the{" "}
                <Link to="/terms" className="text-primary underline">
                  Terms
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* SUBMIT */}
            <Button
              disabled={isSubmitting || Boolean(passwordError)}
              className="w-full"
            >
              {isSubmitting ? "Creating account..." : "Sign up"}
            </Button>
          </form>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary underline">
              Log in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Signup;
