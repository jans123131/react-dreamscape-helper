import { useEffect, useRef } from "react";
import { Canvas as FabricCanvas, Text, Rect, Polygon, Image } from "fabric";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { SafeZone, ProductTemplate } from "@/types/personalization";
import { getProductTemplate } from "@/config/productTemplates";
import { toast } from "sonner";

interface CanvasContainerProps {
  canvas: FabricCanvas | null;
  setCanvas: (canvas: FabricCanvas | null) => void;
  isMobile: boolean;
  text: string;
  selectedFont: string;
  productType: string;
  onObjectDelete: () => void;
}

const CanvasContainer = ({ 
  canvas, 
  setCanvas, 
  isMobile, 
  text, 
  selectedFont,
  productType,
  onObjectDelete 
}: CanvasContainerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);

  const setupSafeZones = (fabricCanvas: FabricCanvas, template: ProductTemplate) => {
    template.safeZones.forEach((zone: SafeZone) => {
      let safeZone;
      
      if (zone.shape === 'polygon' && zone.points) {
        const points = zone.points.map(point => ({ x: point[0], y: point[1] }));
        safeZone = new Polygon(points, {
          fill: 'rgba(0, 255, 0, 0.1)',
          stroke: 'rgba(0, 255, 0, 0.5)',
          strokeDashArray: [5, 5],
          selectable: false,
          evented: false
        });
      } else {
        safeZone = new Rect({
          left: zone.x,
          top: zone.y,
          width: zone.width,
          height: zone.height,
          fill: 'rgba(0, 255, 0, 0.1)',
          stroke: 'rgba(0, 255, 0, 0.5)',
          strokeDashArray: [5, 5],
          selectable: false,
          evented: false
        });
      }
      
      fabricCanvas.add(safeZone);
      // Move the safe zone to the back of the stack
      fabricCanvas.moveTo(safeZone, 0);
      fabricCanvas.requestRenderAll();
    });
  };

  const enforceZoneConstraints = (obj: any, zones: SafeZone[]) => {
    const bounds = obj.getBoundingRect();
    let isInZone = false;

    zones.forEach(zone => {
      if (zone.shape === 'polygon' && zone.points) {
        const zoneRect = {
          left: zone.x,
          top: zone.y,
          width: zone.width,
          height: zone.height
        };
        if (bounds.left >= zoneRect.left && 
            bounds.top >= zoneRect.top && 
            bounds.left + bounds.width <= zoneRect.left + zoneRect.width &&
            bounds.top + bounds.height <= zoneRect.top + zoneRect.height) {
          isInZone = true;
        }
      } else {
        if (bounds.left >= zone.x && 
            bounds.top >= zone.y && 
            bounds.left + bounds.width <= zone.x + zone.width &&
            bounds.top + bounds.height <= zone.y + zone.height) {
          isInZone = true;
        }
      }
    });

    if (!isInZone) {
      obj.setCoords();
      toast.error("L'objet doit rester dans la zone de personnalisation");
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const template = getProductTemplate(productType);
    if (!template) {
      toast.error("Type de produit non pris en charge");
      return;
    }

    const canvasWidth = isMobile ? window.innerWidth - 32 : template.naturalWidth;
    const canvasHeight = isMobile ? window.innerHeight * 0.5 : template.naturalHeight;
    const scale = isMobile ? (window.innerWidth - 32) / template.naturalWidth : 1;

    const fabricCanvas = new FabricCanvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: "#ffffff",
      preserveObjectStacking: true,
    });

    const loadImage = async () => {
      try {
        await new Promise<void>((resolve, reject) => {
          fabric.Image.fromURL(template.backgroundImage, {
            crossOrigin: 'anonymous',
            callback: (img: fabric.Image) => {
              if (img) {
                fabricCanvas.backgroundImage = img;
                img.scaleToWidth(canvasWidth);
                img.scaleToHeight(canvasHeight);
                fabricCanvas.requestRenderAll();
                resolve();
              } else {
                reject(new Error("Failed to load image"));
              }
            }
          });
        });
      } catch (error) {
        toast.error("Erreur lors du chargement de l'image");
      }
    };

    loadImage();
    setupSafeZones(fabricCanvas, template);

    fabricCanvas.on('object:moving', (e) => {
      if (!e.target) return;
      if (!enforceZoneConstraints(e.target, template.safeZones)) {
        e.target.setCoords();
        fabricCanvas.renderAll();
      }
    });

    fabricCanvas.on('selection:created', (e) => {
      const obj = e.selected?.[0];
      if (deleteButtonRef.current) {
        const bounds = obj?.getBoundingRect();
        if (bounds) {
          deleteButtonRef.current.style.display = 'block';
          deleteButtonRef.current.style.left = `${bounds.left + bounds.width + 10}px`;
          deleteButtonRef.current.style.top = `${bounds.top}px`;
        }
      }
    });

    fabricCanvas.on('selection:cleared', () => {
      if (deleteButtonRef.current) {
        deleteButtonRef.current.style.display = 'none';
      }
    });

    fabricCanvas.on('object:moving', (e) => {
      if (deleteButtonRef.current && e.target) {
        const bounds = e.target.getBoundingRect();
        deleteButtonRef.current.style.left = `${bounds.left + bounds.width + 10}px`;
        deleteButtonRef.current.style.top = `${bounds.top}px`;
      }
    });

    setCanvas(fabricCanvas);

    const handleResize = () => {
      const newWidth = isMobile ? window.innerWidth - 32 : template.naturalWidth;
      const newHeight = isMobile ? window.innerHeight * 0.5 : template.naturalHeight;
      const newScale = isMobile ? (window.innerWidth - 32) / template.naturalWidth : 1;

      fabricCanvas.setDimensions({ width: newWidth, height: newHeight });
      fabricCanvas.setZoom(newScale);
      fabricCanvas.requestRenderAll();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      fabricCanvas.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile, selectedFont, setCanvas, productType]);

  useEffect(() => {
    if (!canvas) return;

    const existingTexts = canvas.getObjects().filter(obj => obj instanceof Text);
    existingTexts.forEach(textObj => canvas.remove(textObj));

    if (text) {
      const fabricText = new Text(text, {
        left: canvas.width! / 2,
        top: canvas.height! / 2,
        fontSize: 16,
        fill: "#000000",
        fontFamily: selectedFont,
        originX: 'center',
        originY: 'center',
        hasControls: true,
        hasBorders: true,
        lockUniScaling: false,
        transparentCorners: false,
        cornerColor: 'rgba(102,153,255,0.5)',
        cornerSize: 12,
        padding: 5
      });

      canvas.add(fabricText);
      canvas.setActiveObject(fabricText);
    } else {
      const placeholderText = new Text("Tapez votre texte ici...", {
        left: canvas.width! / 2,
        top: canvas.height! / 2,
        fontSize: 20,
        fill: "#999999",
        fontFamily: selectedFont,
        originX: 'center',
        originY: 'center',
        selectable: false,
        opacity: 0.7
      });
      canvas.add(placeholderText);
    }

    canvas.renderAll();
  }, [text, canvas, selectedFont]);

  return (
    <Card className="p-4 lg:p-6">
      <div className="w-full flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden relative min-h-[600px]">
        <canvas 
          ref={canvasRef} 
          className="max-w-full touch-manipulation shadow-lg"
        />
        <button
          ref={deleteButtonRef}
          onClick={onObjectDelete}
          className="absolute hidden bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-colors w-6 h-6 flex items-center justify-center"
          style={{
            zIndex: 1000,
            right: '10px',
            top: '10px',
            padding: 0,
          }}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </Card>
  );
};

export default CanvasContainer;