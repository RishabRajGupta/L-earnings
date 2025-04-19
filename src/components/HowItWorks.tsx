
import React from "react";
import { CheckCircle, FileCheck, GraduationCap, LucideIcon, PiggyBank } from "lucide-react";

interface FeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 rounded-full bg-primary/10 p-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
};

const HowItWorks: React.FC = () => {
  const features = [
    {
      icon: CheckCircle,
      title: "1. Enroll in Courses",
      description: "Browse our catalog and pay the full course fee upfront to secure your spot."
    },
    {
      icon: GraduationCap,
      title: "2. Learn & Master",
      description: "Engage with course materials, complete exercises, and prepare for your final assessment."
    },
    {
      icon: FileCheck,
      title: "3. Take Assessment",
      description: "Complete a comprehensive final assessment to demonstrate your knowledge and skills."
    },
    {
      icon: PiggyBank,
      title: "4. Get Your Refund",
      description: "Receive an automatic refund based on your score - score 90%, get 90% of your money back!"
    }
  ];

  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              How It Works
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Simple Performance-Based Pricing
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Our unique model puts you in control of your education costs. The more you learn, the less you pay.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
