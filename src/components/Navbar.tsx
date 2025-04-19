
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link 
            to="/"
            className="flex items-center gap-2 font-bold text-xl md:text-2xl text-primary"
          >
            <GraduationCap className="h-6 w-6" />
            <span>L-earnings</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/courses" className="text-sm font-medium hover:text-primary transition-colors">
            Courses
          </Link>
          <Link to="/how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
            How It Works
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/login">
            <Button variant="outline" className="hidden sm:inline-flex">
              Log in
            </Button>
          </Link>
          <Link to="/signup">
            <Button>Sign up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
