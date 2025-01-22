import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef } from "react";
import { toast } from "sonner";
import { Canvas, Image as FabricImage } from "fabric";

interface ImageUploaderProps {
  canvas: Canvas | null;
  onImageUpload: (image: { id: string; url: string; name: string }) => void;
}

const ImageUploader = ({ canvas, onImageUpload }: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!canvas || !event.target.files?.[0]) return;

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      if (!e.target?.result) return;
      
      FabricImage.fromURL(e.target.result.toString(), {
        crossOrigin: 'anonymous',
      }).then((fabricImage) => {
        if (fabricImage) {
          fabricImage.scaleToWidth(150);
          fabricImage.set({
            left: canvas.width! / 2,
            top: canvas.height! / 2,
            originX: 'center',
            originY: 'center',
            cornerColor: 'rgba(102,153,255,0.5)',
            cornerSize: 12,
            transparentCorners: false,
            hasControls: true,
            hasBorders: true,
          });
          canvas.add(fabricImage);
          canvas.setActiveObject(fabricImage);
          canvas.renderAll();
          
          onImageUpload({
            id: Date.now().toString(),
            url: e.target.result as string,
            name: file.name
          });
        }
      }).catch(error => {
        console.error('Error loading image:', error);
        toast.error("Erreur lors du chargement de l'image");
      });
    };

    reader.readAsDataURL(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Ajouter une Image</Label>
      <div className="flex gap-2">
        <Input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />
        <Button 
          onClick={() => fileInputRef.current?.click()}
          className="w-full"
          variant="secondary"
        >
          <Upload className="h-4 w-4 mr-2" />
          Télécharger une Image
        </Button>
      </div>
    </div>
  );
};

export default ImageUploader;