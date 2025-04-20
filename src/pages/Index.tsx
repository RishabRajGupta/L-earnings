
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import EducationReels from '@/components/EducationReels';
import HowItWorks from '@/components/HowItWorks';
import FeaturedCourses from '@/components/FeaturedCourses';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <EducationReels />
        <HowItWorks />
        <FeaturedCourses />
        <Testimonials />
      </main>
      <ChatBot />
      <Footer />
    </div>
  );
};

export default Index;
