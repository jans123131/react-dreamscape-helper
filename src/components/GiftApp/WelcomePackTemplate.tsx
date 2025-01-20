import React, { Suspense, useState } from 'react';
import { VideoModal } from './VideoModal';
import { VideoPreview } from './VideoPreview';
import WhatsAppPopup from '../WhatsAppPopup';
import { useTranslation } from 'react-i18next';

interface WelcomePackTemplateProps {
  packType: string;
  onCompose: () => void;
}

const WelcomePackTemplate = ({ packType, onCompose }: WelcomePackTemplateProps) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const { t } = useTranslation();
  const isSingleImagePack = packType === 'Pack Duo' || packType === 'Pack Mini Duo';

  const content = {
    title: t(`packs.${packType.toLowerCase().replace(/\s+/g, '')}.title`),
    description: t(`packs.${packType.toLowerCase().replace(/\s+/g, '')}.description`),
    images: ['/Packs/PackPrestige.jpg', '/Packs/PackPrestige2.png'],
    videoUrl: 'https://example.com/video.mp4'
  };

  return (
    <>
      <div className="min-h-screen bg-[#f6f7f9]">
        <div className="max-w-7xl mx-auto px-4 py-5 lg:py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            <div className="flex flex-col justify-between h-full lg:sticky lg:top-6">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-light tracking-tight text-gray-900">
                  {content.title}
                </h1>
                <p className="text-lg lg:text-2xl text-gray-600 leading-relaxed">
                  {content.description}
                </p>
                <button
                  className="w-full lg:w-auto px-8 py-3 bg-[#67000D] text-white text-xl font-medium rounded-none hover:bg-[#4a000a] transition-colors duration-200"
                  onClick={onCompose}
                >
                  {t('packs.compose')}
                </button>
              </div>
            </div>
            <div className={`flex flex-col ${isSingleImagePack ? 'items-center justify-center' : 'lg:grid lg:grid-cols-2'} h-full`}>
              {isSingleImagePack ? (
                <div className="w-[85%] h-full flex items-center justify-center">
                  <img 
                    src={content.images[0]}
                    alt={`${content.title} showcase`}
                    className="w-full h-auto max-h-[510px] object-contain shadow-md rounded-md border border-gray-200"
                  />
                </div>
              ) : (
                <>
                  <div className="order-2 lg:order-1 space-y-1 lg:mr-[-40%] mt-6 lg:mt-0">
                    {content.images.map((image, index) => (
                      <img 
                        key={index}
                        src={image}
                        alt={`${content.title} showcase ${index + 1}`}
                        className="w-[35%] h-[160px] object-cover mx-auto"
                      />
                    ))}
                  </div>
                  <div className="order-1 lg:order-2 h-[480px] sm:h-full">
                    <VideoPreview
                      videoUrl={content.videoUrl}
                      onClick={() => setIsVideoOpen(true)}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Suspense fallback={null}>
        <WhatsAppPopup />
      </Suspense>
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl={content.videoUrl}
      />
    </>
  );
};

export default WelcomePackTemplate;