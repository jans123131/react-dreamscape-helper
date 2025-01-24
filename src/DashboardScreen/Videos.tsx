import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Upload, Image, Video as VideoIcon } from 'lucide-react';

interface VideosProps {
  user: {
    id: string;
    email: string;
    role: string;
  };
}

const Videos: React.FC<VideosProps> = ({ user }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedMB, setUploadedMB] = useState(0);
    const [totalMB, setTotalMB] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');
    const { toast } = useToast();

    useEffect(() => {
        if (user.role !== 'admin') {
            return <Navigate to="/" />;
        }
    }, [user.role]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) handleFile(selectedFile);
    };

    const handleFile = (selectedFile: File) => {
        if (selectedFile && selectedFile.size <= 2147483648) {
            setVideoFile(selectedFile);
            setTotalMB((selectedFile.size / (1024 * 1024)).toFixed(2));
            setError('');
        } else {
            setError('Veuillez sélectionner un fichier vidéo de moins de 2 Go.');
        }
    };

    const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedThumbnail = event.target.files?.[0];
        if (selectedThumbnail) {
            setThumbnailFile(selectedThumbnail);
        }
    };

    const handleDrop = (event: React.DragEvent, type: 'video' | 'thumbnail') => {
        event.preventDefault();
        const selectedFile = event.dataTransfer.files[0];
        if (type === 'video') {
            handleFile(selectedFile);
        } else if (type === 'thumbnail') {
            setThumbnailFile(selectedFile);
        }
    };

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    };

    const logUploadEvent = async (videoTitle: string) => {
        try {
            await axios.post('https://plateform.draminesaid.com/app/data_logs.php', {
                id_log: 'uniqueLogId',
                text_log: 'Vidéo ' + videoTitle + ' téléchargée avec succès',
                date_log: new Date().toISOString(),
                user_log: user.email,
                type_log: 'téléchargements',
            });
        } catch (err) {
            console.error('Failed to log the event:', err);
        }
    };

    const handleUpload = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!videoFile || !thumbnailFile) {
            toast({
                variant: "destructive",
                title: "Erreur",
                description: 'Veuillez sélectionner un fichier vidéo et une miniature à télécharger.'
            });
            return;
        }

        setIsUploading(true);
        setError('');
        const formData = new FormData();
        formData.append('video', videoFile);
        formData.append('thumbnail', thumbnailFile);
        formData.append('title', title);
        formData.append('description', description);

        try {
            await axios.post('https://plateform.draminesaid.com/app/upload.php', formData, {
                onUploadProgress: (progressEvent) => {
                    const total = progressEvent.total || 0;
                    const current = progressEvent.loaded;
                    const percentCompleted = Math.floor((current * 100) / total);
                    const uploadedMB = (current / (1024 * 1024)).toFixed(2);

                    setUploadProgress(percentCompleted);
                    setUploadedMB(uploadedMB);
                },
            });
            setUploadProgress(100);
            logUploadEvent(title);
            toast({
                title: "Succès",
                description: 'Vidéo téléchargée avec succès !'
            });
        } catch (err) {
            toast({
                variant: "destructive",
                title: "Erreur",
                description: "Une erreur s'est produite lors du téléchargement."
            });
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="p-6">
            <Card className="w-full max-w-4xl mx-auto">
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Télécharger une Nouvelle Vidéo</h2>
                    <form onSubmit={handleUpload} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Titre</label>
                                <Input
                                    type="text"
                                    placeholder="Titre de la Vidéo"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Description</label>
                                <Textarea
                                    placeholder="Description de la Vidéo"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div 
                            className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-accent/50 transition-colors"
                            onDrop={(e) => handleDrop(e, 'thumbnail')} 
                            onDragOver={handleDragOver}
                            onClick={() => document.getElementById('thumbnailInput')?.click()}
                        >
                            <Image className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                            <input
                                type="file"
                                id="thumbnailInput"
                                onChange={handleThumbnailChange}
                                accept="image/*"
                                className="hidden"
                            />
                            <p className="text-sm text-muted-foreground">
                                Glissez-déposez votre miniature ici ou cliquez pour sélectionner une miniature
                            </p>
                            {thumbnailFile && (
                                <p className="mt-2 text-sm text-primary">{thumbnailFile.name}</p>
                            )}
                        </div>

                        <div 
                            className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-accent/50 transition-colors"
                            onDrop={(e) => handleDrop(e, 'video')} 
                            onDragOver={handleDragOver}
                            onClick={() => document.getElementById('videoInput')?.click()}
                        >
                            <VideoIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                            <input
                                type="file"
                                id="videoInput"
                                onChange={handleFileChange}
                                accept="video/*"
                                className="hidden"
                            />
                            <p className="text-sm text-muted-foreground">
                                Glissez-déposez votre vidéo ici ou cliquez pour sélectionner un fichier
                            </p>
                            {videoFile && (
                                <p className="mt-2 text-sm text-primary">{videoFile.name}</p>
                            )}
                        </div>

                        {error && (
                            <p className="text-sm text-destructive">{error}</p>
                        )}

                        {isUploading && (
                            <div className="space-y-2">
                                <Progress value={uploadProgress} />
                                <p className="text-sm text-center text-muted-foreground">
                                    {uploadProgress}% ({uploadedMB} MB / {totalMB} MB)
                                </p>
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={isUploading}
                            className="w-full"
                        >
                            <Upload className="mr-2 h-4 w-4" />
                            {isUploading ? 'Téléchargement en cours...' : 'Télécharger la Vidéo'}
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    );
};

export default Videos;