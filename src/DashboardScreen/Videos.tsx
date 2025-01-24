import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileVideo, Image as ImageIcon, X } from 'lucide-react';

interface VideosProps {
  user: {
    id: string;
    email: string;
    role: string;
  };
}

interface FileWithPreview extends File {
  preview?: string;
}

const Videos: React.FC<VideosProps> = ({ user }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState<FileWithPreview | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<FileWithPreview | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'video' | 'thumbnail'
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (type === 'video' && !file.type.startsWith('video/')) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please select a video file"
      });
      return;
    }

    if (type === 'thumbnail' && !file.type.startsWith('image/')) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please select an image file"
      });
      return;
    }

    const fileWithPreview = Object.assign(file, {
      preview: type === 'thumbnail' ? URL.createObjectURL(file) : undefined
    });

    if (type === 'video') {
      setVideoFile(fileWithPreview);
    } else {
      setThumbnailFile(fileWithPreview);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile || !thumbnailFile) {
      toast({
        variant: "destructive",
        title: "Missing files",
        description: "Please select both a video and thumbnail"
      });
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('thumbnail', thumbnailFile);
    formData.append('title', title);
    formData.append('description', description);

    try {
      const response = await fetch('https://plateform.draminesaid.com/app/upload.php', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Success",
          description: "Video uploaded successfully"
        });
        // Reset form
        setTitle('');
        setDescription('');
        setVideoFile(null);
        setThumbnailFile(null);
        setUploadProgress(0);
      } else {
        throw new Error(data.message || 'Upload failed');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error.message
      });
    } finally {
      setIsUploading(false);
    }
  };

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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  type="text"
                  placeholder="Enter video title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="bg-dashboard-background border-border/40"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Enter video description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="bg-dashboard-background border-border/40 min-h-[80px]"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Video File</label>
                <div 
                  className={`
                    border-2 border-dashed border-border/40 rounded-lg p-6 text-center 
                    cursor-pointer hover:bg-dashboard-background/50 transition-colors
                    ${videoFile ? 'bg-primary/5 border-primary/40' : ''}
                  `}
                  onClick={() => document.getElementById('videoInput')?.click()}
                >
                  <FileVideo className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
                  <input
                    type="file"
                    id="videoInput"
                    onChange={(e) => handleFileChange(e, 'video')}
                    accept="video/*"
                    className="hidden"
                  />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drop video here or click to browse
                  </p>
                  {videoFile && (
                    <p className="text-sm text-primary font-medium truncate max-w-[200px] mx-auto">
                      {videoFile.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Thumbnail Image</label>
                <div 
                  className={`
                    border-2 border-dashed border-border/40 rounded-lg p-6 text-center 
                    cursor-pointer hover:bg-dashboard-background/50 transition-colors relative
                    ${thumbnailFile ? 'bg-primary/5 border-primary/40' : ''}
                  `}
                  onClick={() => document.getElementById('thumbnailInput')?.click()}
                >
                  {thumbnailFile?.preview ? (
                    <>
                      <img 
                        src={thumbnailFile.preview} 
                        alt="Thumbnail preview" 
                        className="w-32 h-32 object-cover mx-auto rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setThumbnailFile(null);
                        }}
                        className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Drop thumbnail here or click to browse
                      </p>
                    </>
                  )}
                  <input
                    type="file"
                    id="thumbnailInput"
                    onChange={(e) => handleFileChange(e, 'thumbnail')}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-sm text-muted-foreground text-center">
                  Uploading... {uploadProgress}%
                </p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isUploading}
              className="w-full"
            >
              <Upload className="mr-2 h-4 w-4" />
              {isUploading ? 'Uploading...' : 'Upload Video'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Videos;