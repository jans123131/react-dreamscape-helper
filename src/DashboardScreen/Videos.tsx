import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadForm } from '@/components/video-upload/UploadForm';
import { Upload } from 'lucide-react';

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
    <div className="p-6 mt-16 max-w-5xl mx-auto">
      <Card className="bg-dashboard-card border-border/40">
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-2">
            <Upload className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl font-semibold">Upload New Video</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            Share your content with your audience. Upload videos and customize their details.
          </p>
        </CardHeader>
        <CardContent>
          <UploadForm userEmail={user.email} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Videos;