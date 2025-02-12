
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ProductGrid from "@/components/ProductGrid";

const VetementsCuisine = () => {
  const [activeTab, setActiveTab] = useState<string>("all");

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-100">
        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">Accueil</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">Vêtements Cuisine et restauration</span>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src="/lovable-uploads/98a68746-eff6-4ad1-b7d9-7fed922db14f.png"
          alt="Vêtements de cuisine"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              VÊTEMENTS CUISINE ET RESTAURATION
            </h1>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              La qualité au service de votre métier
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Manelli, le magasin spécialiste des vêtements de cuisine, utilise des tissus de haute qualité. 
              Ultra résistants, ils assurent une excellente durabilité. Pour les hommes et les femmes, les 
              professionnels comme les particuliers, les chefs cuisiniers d'un petit ou d'un grand restaurant 
              comme les apprentis, une large gamme d'uniformes spécialisés dans la cuisine est proposée.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Nos vêtements sont conçus pour répondre aux exigences les plus strictes du secteur de la 
              restauration, alliant confort, durabilité et style professionnel.
            </p>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Nos collections pour la cuisine
          </h2>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {["all", "vestes", "pantalons", "tabliers", "accessoires"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeTab === tab
                    ? "bg-primary text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <ProductGrid onAddToCart={() => {}} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Besoin d'un devis personnalisé ?
          </h2>
          <p className="mb-8 text-lg">
            Contactez-nous pour obtenir un devis adapté à vos besoins spécifiques
          </p>
          <Link
            to="/devis"
            className="inline-block bg-white text-primary px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
          >
            Demander un devis
          </Link>
        </div>
      </section>
    </div>
  );
};

export default VetementsCuisine;
