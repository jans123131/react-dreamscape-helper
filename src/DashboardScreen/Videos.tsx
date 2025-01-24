import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { UploadForm } from '@/components/video-upload/UploadForm';

interface VideosProps {
  user: {
    id: string;
    email: string;
    role: string;
  };
}

const Videos: React.FC<VideosProps> = ({ user }) => {
  useEffect(() => {
    if (user.role !== 'admin') {
      return <Navigate to="/" />;
    }
  }, [user.role]);

  return (
    <div className="p-6">
      <UploadForm userEmail={user.email} />
    </div>
  );
};

export default Videos;