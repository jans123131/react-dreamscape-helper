import React from 'react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="text-xl font-bold text-primary">ReactApp</div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">
              Features
            </a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">
              About
            </a>
            <Button className="bg-primary hover:bg-blue-700">
              Get Started
            </Button>
          </div>
          <Button variant="ghost" className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;