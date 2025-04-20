
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import VideoCard from './VideoCard';
import { reels } from '@/data/educationReels';

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
                  <VideoCard reel={reel} />
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
