import React, { useState } from 'react';
import { VideoModal } from './VideoModal';
import { VideoPreview } from './VideoPreview';
import { getPackContent } from '@/config/packContent';

function WelcomePackPorteCle({ onCompose }) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const content = getPackContent('Pack Porte-clé');

  return (
    <>
      <div className="min-h-screen bg-[#f6f7f9]">
        <div className="max-w-7xl mx-auto px-4 py-5 lg:py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            <div className="flex flex-col justify-between h-full lg:sticky lg:top-6">
              <div className="space-y-5 lg:space-y-6">
                <h1 className="text-4xl lg:text-5xl font-light tracking-tight text-gray-900">
                  {content.title}
                </h1>
                <p className="text-lg lg:text-2xl text-gray-600 leading-relaxed">
                  {content.description}
                </p>
              </div>
              <button
                className="w-full lg:w-auto mt-6 px-8 py-3 bg-[#67000D] text-white text-xl font-medium rounded-none hover:bg-[#4a000a] transition-colors duration-200"
                onClick={onCompose}
              >
                Composez votre coffret
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 h-full">
              <div className="space-y-1 mr-[-40%]">
                {content.images.map((image, index) => (
                  <img 
                    key={index}
                    src={image}
                    alt={`${content.title} showcase ${index + 1}`}
                    className="w-[35%] h-[160px] object-cover mx-auto"
                  />
                ))}
              </div>
              <div className="h-[480px] sm:h-full">
                <VideoPreview
                  videoUrl={content.videoUrl}
                  onClick={() => setIsVideoOpen(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl={content.videoUrl}
      />
    </>
  );
}

export default WelcomePackPorteCle;