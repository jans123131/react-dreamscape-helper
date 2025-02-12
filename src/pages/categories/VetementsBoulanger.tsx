
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ProductGrid from "@/components/ProductGrid";

const VetementsBoulanger = () => {
  const [activeTab, setActiveTab] = useState<string>("all");

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-100">
        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">Accueil</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">Vêtements Boulanger et Pâtissier</span>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="flex justify-center px-4 py-8">
        <div className="relative w-[80%] h-[400px] overflow-hidden rounded-2xl">
          <img
            src="/lovable-uploads/f0e25fb0-eac3-41ef-85f4-134f71438f42.png"
            alt="Vêtements de boulanger"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                VÊTEMENTS BOULANGER ET PÂTISSIER
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-[80%] mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">
              L'excellence au service de votre art
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6 text-center">
              Manelli propose une gamme complète de vêtements professionnels pour les boulangers 
              et pâtissiers. Nos tenues allient style, confort et praticité, répondant aux exigences 
              spécifiques de votre métier. Fabriqués avec des matériaux de première qualité, nos 
              vêtements sont conçus pour durer et supporter les conditions intenses de votre 
              environnement de travail.
            </p>
          </div>
        </div>
      </section>

      {/* Static Product Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-[80%] mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Notre Collection Boulangerie
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Vestes Card */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-square bg-gray-50 p-6">
                  <img 
                    src="/lovable-uploads/cdabb2a1-03dd-46f0-bda9-019861f8fb42.png"
                    alt="Vestes de boulanger"
                    className="w-full h-full object-contain hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Vestes Professionnelles</h3>
                  <p className="text-gray-600 mb-4">Des vestes élégantes et confortables, conçues pour la boulangerie</p>
                  <Link 
                    to="/personalization"
                    className="inline-block bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors"
                  >
                    Personnaliser
                  </Link>
                </div>
              </div>

              {/* Tabliers Card */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-square bg-gray-50 p-6">
                  <img 
                    src="/lovable-uploads/a8994e1f-ed0e-4817-a205-aee661515beb.png"
                    alt="Tabliers de boulanger"
                    className="w-full h-full object-contain hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Tabliers Professionnels</h3>
                  <p className="text-gray-600 mb-4">Protection optimale avec style pour votre travail quotidien</p>
                  <Link 
                    to="/personalization"
                    className="inline-block bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors"
                  >
                    Personnaliser
                  </Link>
                </div>
              </div>

              {/* Accessoires Card */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-square bg-gray-50 p-6">
                  <img 
                    src="/lovable-uploads/822785e2-1af0-42b6-b6a6-adde97b0442b.png"
                    alt="Accessoires de boulanger"
                    className="w-full h-full object-contain hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Accessoires Essentiels</h3>
                  <p className="text-gray-600 mb-4">Toques, bandanas et autres accessoires indispensables</p>
                  <Link 
                    to="/personalization"
                    className="inline-block bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors"
                  >
                    Personnaliser
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-[80%] mx-auto bg-primary rounded-2xl text-white p-12 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Besoin d'un devis personnalisé ?
            </h2>
            <p className="mb-8 text-lg max-w-2xl mx-auto">
              Contactez-nous pour obtenir un devis adapté à vos besoins spécifiques. 
              Nos experts sont là pour vous conseiller.
            </p>
            <Link
              to="/devis"
              className="inline-block bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Demander un devis
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VetementsBoulanger;
