
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Star, StarHalf } from "lucide-react";

const VetementsCuisine = () => {
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
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Products Header */}
          <div className="flex justify-between items-center mb-8">
            <p className="text-gray-600">Produits 1-32 sur 43</p>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Trier par</span>
              <select className="border rounded-md px-4 py-2 bg-white">
                <option>Recommandé</option>
                <option>Prix croissant</option>
                <option>Prix décroissant</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product Card 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <img
                  src="/lovable-uploads/c7046d56-7f03-4b6d-b599-ad3148741218.png"
                  alt="Bodywarmer isolant"
                  className="w-full h-[300px] object-cover"
                />
                <div className="absolute top-4 left-0 bg-red-600 text-white px-4 py-1">
                  DÉSTOCKAGE -30%
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Bodywarmer isolant Femme Regatta Pro-fessional STAGE II</h3>
                <div className="flex items-center mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 text-gray-300" />
                  <span className="ml-2 text-sm text-gray-600">3.5/5 - 2 avis</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-gray-500">À partir de</span>
                  <span className="text-xl font-bold text-red-600">24,28 €</span>
                  <span className="text-sm text-gray-500 line-through">34,68 €</span>
                </div>
                <div className="text-sm text-gray-500">20,23 € HT</div>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <img
                  src="/lovable-uploads/c7046d56-7f03-4b6d-b599-ad3148741218.png"
                  alt="Gilet de service"
                  className="w-full h-[300px] object-cover"
                />
                <div className="absolute top-4 left-0 bg-red-600 text-white px-4 py-1">
                  DÉSTOCKAGE -30%
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Gilet de service Femme Robur ANETH</h3>
                <div className="flex items-center mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-2 text-sm text-gray-600">5/5 - 1 avis</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-gray-500">À partir de</span>
                  <span className="text-xl font-bold text-red-600">41,86 €</span>
                  <span className="text-sm text-gray-500 line-through">59,80 €</span>
                </div>
                <div className="text-sm text-gray-500">34,88 € HT</div>
              </div>
            </div>

            {/* Product Card 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <img
                  src="/lovable-uploads/c7046d56-7f03-4b6d-b599-ad3148741218.png"
                  alt="Gilet micropolaire"
                  className="w-full h-[300px] object-cover"
                />
                <div className="absolute top-4 left-0 bg-red-600 text-white px-4 py-1">
                  PROMO -30%
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Gilet micropolaire femme BALTIC WOMEN</h3>
                <div className="flex items-center mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 text-gray-300" />
                  <Star className="w-4 h-4 text-gray-300" />
                  <Star className="w-4 h-4 text-gray-300" />
                  <Star className="w-4 h-4 text-gray-300" />
                  <span className="ml-2 text-sm text-gray-600">1/5 - 2 avis</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-gray-500">À partir de</span>
                  <span className="text-xl font-bold text-red-600">10,49 €</span>
                  <span className="text-sm text-gray-500 line-through">14,98 €</span>
                </div>
                <div className="text-sm text-gray-500">8,74 € HT</div>
              </div>
            </div>
          </div>
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
