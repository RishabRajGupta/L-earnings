
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl animate-scale-in">
                Learn More, <span className="text-primary">Pay Less</span>
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                L-earnings revolutionizes online education. Earn back up to 100% of your course fee based on your performance.
                The better you learn, the less you pay.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link to="/courses">
                <Button size="lg" className="px-8 hover-scale hover-glow">
                  Explore Courses
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" size="lg" className="hover-scale">
                  How It Works
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[450px] lg:w-[450px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent opacity-20 blur-3xl animate-gradient-x"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="glass p-8 rounded-xl space-y-2 text-center hover-scale">
                  <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Example Course</div>
                  <p className="text-3xl font-bold">Python Mastery</p>
                  <div className="space-y-1">
                    <p className="text-xl font-semibold">Original Price: ₹100</p>
                    <p className="text-sm text-gray-500">Score 90% on final assessment</p>
                    <p className="text-2xl font-bold text-primary">Get back ₹90</p>
                    <p className="text-sm text-gray-500">Final cost: only ₹10</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
