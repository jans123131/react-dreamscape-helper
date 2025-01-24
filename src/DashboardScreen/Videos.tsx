import React, { useEffect, useState } from 'react';
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
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    let mounted = true;

    if (mounted && user.role !== 'admin') {
      setShouldRedirect(true);
    }

    return () => {
      mounted = false;
    };
  }, [user.role]);

  if (shouldRedirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="p-6">
      <UploadForm userEmail={user.email} />
    </div>
  );
};

export default Videos;