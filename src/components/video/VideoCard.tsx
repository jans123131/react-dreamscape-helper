import React from 'react';
import { XCircle, PenSquare } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  seasonId?: string;
  chapterId?: string;
}

interface VideoCardProps {
  video: Video;
  onVideoClick: (video: Video) => void;
  onDeleteClick: (id: string) => void;
  onEditClick: (video: Video, e: React.MouseEvent) => void;
  isAdmin: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({
  video,
  onVideoClick,
  onDeleteClick,
  onEditClick,
  isAdmin
}) => {
  return (
    <div className="bg-dashboard-card rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.02] relative flex flex-col">
      <div 
        className="relative aspect-video"
        onClick={() => onVideoClick(video)}
      >
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold mb-2 text-black">{video.title}</h3>
        <p className="text-sm text-black mb-4">{video.description}</p>
        
        {isAdmin && (
          <div className="flex gap-2 mt-auto">
            <button
              className="flex-1 py-2 px-4 bg-red-500 rounded-md hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick(video.id);
              }}
              title="حذف الفيديو"
            >
              <XCircle className="w-5 h-5 text-white" />
              <span className="text-white">Delete</span>
            </button>
            <button
              className="flex-1 py-2 px-4 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              onClick={(e) => onEditClick(video, e)}
              title="تعديل الفيديو"
            >
              <PenSquare className="w-5 h-5 text-white" />
              <span className="text-white">Edit</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCard;