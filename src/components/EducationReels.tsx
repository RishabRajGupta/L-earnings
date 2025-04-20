
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle } from "lucide-react";

interface VideoReel {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
}

const reels: VideoReel[] = [
  {
    id: 1,
    title: "Introduction to React Hooks",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    duration: "2:30",
    views: "1.2k"
  },
  {
    id: 2,
    title: "JavaScript ES6 Features",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    duration: "3:45",
    views: "856"
  },
  {
    id: 3,
    title: "CSS Grid Layout Tutorial",
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
    duration: "4:20",
    views: "2.1k"
  },
  {
    id: 4,
    title: "TypeScript Basics",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    duration: "5:15",
    views: "1.5k"
  }
];

const EducationReels = () => {
  return (
    <section id="education-reels" className="w-full py-12 bg-slate-50 dark:bg-slate-900/50">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Learning Clips
        </h2>
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {reels.map((reel) => (
                <CarouselItem key={reel.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                    <CardContent className="p-0 aspect-video relative group">
                      <img
                        src={reel.thumbnail}
                        alt={reel.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <PlayCircle className="w-12 h-12 text-white" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="text-white font-medium mb-1">{reel.title}</h3>
                        <div className="flex items-center gap-2 text-white/80 text-sm">
                          <span>{reel.duration}</span>
                          <span>•</span>
                          <span>{reel.views} views</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 md:left-4" />
            <CarouselNext className="right-2 md:right-4" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default EducationReels;
