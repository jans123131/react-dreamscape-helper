import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
            Build Something Amazing
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Create beautiful, responsive web applications with React and modern tools.
            Start your journey today.
          </p>
          <div className="flex gap-4 justify-center">
            <Button className="bg-primary hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="px-6 py-2">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;