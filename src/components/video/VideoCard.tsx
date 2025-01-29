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
    <div
      className="bg-dashboard-card rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.02] relative group"
      onClick={() => onVideoClick(video)}
    >
      <div className="relative aspect-video">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        {isAdmin && (
          <div className="absolute top-2 right-2 flex gap-2 z-10 opacity-100 group-hover:opacity-100 transition-opacity">
            <button
              className="p-2.5 bg-red-500 shadow-lg rounded-full hover:bg-red-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick(video.id);
              }}
              title="حذف الفيديو"
            >
              <XCircle className="w-6 h-6 text-white" />
            </button>
            <button
              className="p-2.5 bg-blue-500 shadow-lg rounded-full hover:bg-blue-600 transition-colors"
              onClick={(e) => onEditClick(video, e)}
              title="تعديل الفيديو"
            >
              <PenSquare className="w-6 h-6 text-white" />
            </button>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold mb-2 text-black">{video.title}</h3>
        <p className="text-sm text-black">{video.description}</p>
      </div>
    </div>
  );
};

export default VideoCard;