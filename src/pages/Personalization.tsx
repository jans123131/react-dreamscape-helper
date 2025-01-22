import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { Canvas, Text } from "fabric";
import { toast } from "sonner";
import CanvasContainer from "@/components/personalization/CanvasContainer";
import DesignTools from "@/components/personalization/DesignTools";
import ImageUploader from "@/components/personalization/ImageUploader";
import UploadedImagesList from "@/components/personalization/UploadedImagesList";
import ProductSelector from "@/components/personalization/ProductSelector";
import { productTemplates } from "@/config/productTemplates";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductCategory, UploadedImage } from "@/types/personalization";

// Define product categories
const productCategories: ProductCategory[] = [
  {
    id: "tshirt",
    name: "T-Shirts",
    description: "Personnalisez vos t-shirts",
    icon: "Shirt",
    startingPrice: "29.99"
  },
  {
    id: "mug",
    name: "Tasses",
    description: "Créez votre tasse unique",
    icon: "Coffee",
    startingPrice: "19.99"
  }
];

// Define available fonts
const availableFonts = [
  { name: "Montserrat", value: "Montserrat" },
  { name: "Arial", value: "Arial" },
  { name: "Times New Roman", value: "Times New Roman" },
  { name: "Helvetica", value: "Helvetica" },
  { name: "Roboto", value: "Roboto" },
  { name: "Open Sans", value: "Open Sans" }
];

const Personalization = () => {
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [text, setText] = useState("");
  const [textColor, setTextColor] = useState("#000000");
  const [selectedFont, setSelectedFont] = useState("Montserrat");
  const [activeText, setActiveText] = useState<Text | null>(null);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [selectedProductType, setSelectedProductType] = useState("tshirt");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const handleDeleteActiveObject = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
      canvas.renderAll();
      
      if (activeObject.type === 'image') {
        const imageUrl = (activeObject as any)._element?.src;
        setUploadedImages(prev => prev.filter(img => img.url !== imageUrl));
      }
      
      if (activeObject.type === 'text') {
        setText('');
        setActiveText(null);
      }
      
      toast.success("Élément supprimé !");
    }
  };

  const handleDeleteImage = (imageToDelete: UploadedImage) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageToDelete.id));
  };

  return (
    <div className="container mx-auto py-6 px-4 lg:py-12 max-w-[100vw] overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-2">Personnalisation</h1>
          <p className="text-gray-600">Créez votre design unique en quelques clics</p>
        </div>

        <div className="mb-6">
          <Select value={selectedProductType} onValueChange={setSelectedProductType}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sélectionnez un produit" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(productTemplates).map(([key, template]) => (
                <SelectItem key={key} value={key}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
          <div className="lg:col-span-3 order-first">
            <ProductSelector
              categories={productCategories}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
          </div>

          <div className="lg:col-span-6">
            <CanvasContainer
              canvas={canvas}
              setCanvas={setCanvas}
              isMobile={isMobile}
              text={text}
              selectedFont={selectedFont}
              productType={selectedProductType}
              onObjectDelete={handleDeleteActiveObject}
            />
          </div>

          <div className="lg:col-span-3">
            <Card className="p-4 lg:p-6 space-y-6">
              <div>
                <DesignTools
                  text={text}
                  setText={setText}
                  selectedFont={selectedFont}
                  setSelectedFont={setSelectedFont}
                  textColor={textColor}
                  setTextColor={setTextColor}
                  activeText={activeText}
                  canvas={canvas}
                  fonts={availableFonts}
                />
              </div>

              <div className="pt-6 border-t border-gray-100">
                <div className="space-y-4">
                  <ImageUploader
                    canvas={canvas}
                    onImageUpload={(image) => {
                      setUploadedImages(prev => [...prev, image]);
                      toast.success("Image ajoutée avec succès !");
                    }}
                  />
                  <UploadedImagesList 
                    images={uploadedImages}
                    canvas={canvas}
                    onImageClick={(image) => {
                      if (!canvas) return;
                      const obj = canvas.getObjects().find(
                        obj => obj.type === 'image' && (obj as any)._element?.src === image.url
                      );
                      if (obj) {
                        canvas.setActiveObject(obj);
                        canvas.renderAll();
                      }
                    }}
                    onOpacityChange={(image, opacity) => {
                      if (!canvas) return;
                      const obj = canvas.getObjects().find(
                        obj => obj.type === 'image' && (obj as any)._element?.src === image.url
                      );
                      if (obj) {
                        obj.set('opacity', opacity);
                        canvas.renderAll();
                      }
                    }}
                    onDeleteImage={handleDeleteImage}
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personalization;

