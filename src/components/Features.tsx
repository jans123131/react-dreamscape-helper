import React from 'react';
import { Card } from '@/components/ui/card';
import { Code, Layout, Zap } from 'lucide-react';

const features = [
  {
    title: 'Modern Development',
    description: 'Built with the latest React features and best practices.',
    icon: <Code className="w-6 h-6 text-primary" />,
  },
  {
    title: 'Responsive Design',
    description: 'Beautiful layouts that work on any device.',
    icon: <Layout className="w-6 h-6 text-primary" />,
  },
  {
    title: 'Fast Performance',
    description: 'Optimized for speed and user experience.',
    icon: <Zap className="w-6 h-6 text-primary" />,
  },
];

const Features = () => {
  return (
    <div className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow animate-slide-in">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;