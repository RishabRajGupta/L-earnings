
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container px-4 md:px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">About L-earnings</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg mb-4">
              L-earnings is revolutionizing online education with our performance-based 
              learning model. We believe that education should be accessible, engaging, 
              and rewarding.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
            <p>
              Our mission is to create a learning environment where students are motivated 
              to excel by directly tying their academic performance to the cost of education. 
              We want to make quality education accessible while encouraging students to 
              put in their best effort.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">How L-earnings Works</h2>
            <p>
              With L-earnings, students pay upfront for courses, but they can earn back 
              up to 90% of their payment based on their final assessment scores. Score 90% 
              on your final assessment? Get 90% of your money back! This innovative model 
              ensures that both students and educators are motivated to achieve the best 
              possible learning outcomes.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Team</h2>
            <p>
              L-earnings was founded by a team of educators, technologists, and entrepreneurs 
              who are passionate about transforming education. With decades of combined 
              experience in education and technology, our team is dedicated to creating 
              a platform that serves the needs of modern learners.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p>
              Have questions or feedback? We'd love to hear from you! Reach out to our team at:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Email: contact@l-earnings.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Education Lane, Learning City, LC 12345</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
