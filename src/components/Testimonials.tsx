
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { QuoteIcon } from "lucide-react";

interface Testimonial {
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  courseName: string;
  refundPercentage: number;
}

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <Card className="overflow-hidden border-0 bg-muted/50">
      <CardContent className="p-6">
        <QuoteIcon className="h-8 w-8 text-primary/20 mb-4" />
        <p className="text-base leading-relaxed mb-6">{testimonial.content}</p>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={testimonial.author.avatar} alt={testimonial.author.name} />
            <AvatarFallback>{testimonial.author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{testimonial.author.name}</p>
            <p className="text-xs text-muted-foreground">{testimonial.author.role}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t text-sm">
          <p className="text-muted-foreground">Course: {testimonial.courseName}</p>
          <p className="font-medium text-primary">Received {testimonial.refundPercentage}% refund!</p>
        </div>
      </CardContent>
    </Card>
  );
};

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      content: "I was skeptical at first, but L-earnings gave me the motivation to truly master the material. I studied harder than ever and got a 95% refund!",
      author: {
        name: "Alex Johnson",
        role: "Software Engineer",
        avatar: "https://i.pravatar.cc/150?img=1"
      },
      courseName: "Advanced JavaScript",
      refundPercentage: 95
    },
    {
      content: "The refund model completely changed how I approached the course. I was engaged from day one and ended up getting most of my money back.",
      author: {
        name: "Samantha Lee",
        role: "Data Scientist",
        avatar: "https://i.pravatar.cc/150?img=5"
      },
      courseName: "Machine Learning Fundamentals",
      refundPercentage: 90
    },
    {
      content: "As a self-funded student, L-earnings made quality education affordable. I worked hard, scored well, and only paid a fraction of the course fee.",
      author: {
        name: "Marcus Chen",
        role: "Marketing Specialist",
        avatar: "https://i.pravatar.cc/150?img=8"
      },
      courseName: "Digital Marketing Strategy",
      refundPercentage: 85
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Success Stories
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Students Who Learned & Earned
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Hear from our students who maximized their learning and minimized their costs.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
