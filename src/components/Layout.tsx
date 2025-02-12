
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, ClipboardList, Search, Menu, X, Percent, ChevronRight } from "lucide-react";
import Footer from "./Footer";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

const menuItems = [
  {
    title: "Vêtements de cuisine",
    image: "/lovable-uploads/f0e25fb0-eac3-41ef-85f4-134f71438f42.png",
    path: "/vetements-cuisine",
    topText: "Vêtements",
    bottomText: "de cuisine"
  },
  {
    title: "Vêtements Boulanger & Pâtissier",
    image: "/lovable-uploads/f0e25fb0-eac3-41ef-85f4-134f71438f42.png",
    path: "/vetements-boulanger",
    topText: "Vêtements",
    bottomText: "Boulanger & Pâtissier"
  },
  {
    title: "Vêtements boucher",
    image: "/lovable-uploads/f0e25fb0-eac3-41ef-85f4-134f71438f42.png",
    path: "/vetements-boucher",
    topText: "Vêtements",
    bottomText: "boucher"
  },
  {
    title: "Vêtements Service & Hôtellerie",
    image: "/lovable-uploads/f0e25fb0-eac3-41ef-85f4-134f71438f42.png",
    path: "/vetements-hotellerie",
    topText: "Vêtements",
    bottomText: "Service & Hôtellerie"
  },
  {
    title: "Vêtements Médicaux",
    image: "/lovable-uploads/f0e25fb0-eac3-41ef-85f4-134f71438f42.png",
    path: "/vetements-medicaux",
    topText: "Vêtements",
    bottomText: "Médicaux"
  },
  {
    title: "Vêtements esthéticiennes",
    image: "/lovable-uploads/f0e25fb0-eac3-41ef-85f4-134f71438f42.png",
    path: "/vetements-esthetique",
    topText: "Vêtements",
    bottomText: "esthéticiennes"
  },
  {
    title: "Vêtements de travail",
    image: "/lovable-uploads/f0e25fb0-eac3-41ef-85f4-134f71438f42.png",
    path: "/vetements-travail",
    topText: "Vêtements",
    bottomText: "de travail"
  },
  {
    title: "Chaussures de sécurité",
    image: "/lovable-uploads/f0e25fb0-eac3-41ef-85f4-134f71438f42.png",
    path: "/chaussures",
    topText: "Chaussures",
    bottomText: "de sécurité"
  }
];

// CategoryLink component for desktop navigation
const CategoryLink = ({ href, topText, bottomText }: { href: string; topText: string; bottomText: string; }) => (
  <Link
    to={href}
    className="flex flex-col text-left min-w-max px-3 py-2 rounded-md hover:bg-gray-50 transition-all"
  >
    <span className="text-sm font-medium text-gray-800 whitespace-nowrap">
      {topText}
    </span>
    <span className="text-xs text-gray-600 whitespace-nowrap">
      {bottomText}
    </span>
  </Link>
);

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Load favorites from localStorage
  useEffect(() => {
    const favoritesStr = localStorage.getItem('favorites');
    if (favoritesStr) {
      try {
        const parsedFavorites = JSON.parse(favoritesStr);
        setFavorites(parsedFavorites);
      } catch (error) {
        console.error('Error parsing favorites:', error);
        setFavorites([]);
      }
    }
  }, [location.pathname]); // Reload when route changes

  // Check for designs in sessionStorage
  useEffect(() => {
    const designs = sessionStorage.getItem('designs');
    if (designs) {
      try {
        const parsedDesigns = JSON.parse(designs);
        setCartCount(Array.isArray(parsedDesigns) ? parsedDesigns.length : 0);
      } catch (error) {
        console.error('Error parsing designs from sessionStorage:', error);
        setCartCount(0);
      }
    } else {
      setCartCount(0);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Banner */}
      <div className="w-full bg-[#FFD700] py-2">
        <div className="container mx-auto text-center text-sm font-medium flex items-center justify-center gap-2">
          <Percent className="h-4 w-4" />
          <span>Livraison offerte dès 69€ d'achats !</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="w-full bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto">
          {/* Upper Navigation */}
          <div className="flex items-center justify-between py-4 px-4">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[300px]">
                <SheetHeader className="p-4 border-b">
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                
                {/* Logo Header (replaced PROMOTIONS) */}
                <div className="bg-white p-4 flex items-center justify-center border-b">
                  <img src="/logo.png" alt="ELLES" className="h-12" />
                </div>

                {/* Menu Items */}
                <div className="divide-y">
                  {menuItems.map((item, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
                      onClick={() => navigate(item.path)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium text-left">{item.title}</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img src="/logo.png" alt="ELLES" className="h-14" />
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl px-8 hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Recherchez votre vêtement professionnel"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchResults(true);
                  }}
                  className="w-full px-4 py-2.5 pl-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#00A6E6]/20 focus:border-[#00A6E6] transition-all"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate('/favorites')}
                className="hidden md:flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
              >
                <Heart className="h-6 w-6" />
                <span className="text-sm font-medium">Wishlist</span>
              </button>

              <button
                onClick={() => navigate('/cart')}
                className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="text-sm font-medium hidden md:inline">Panier</span>
              </button>

              <button
                onClick={() => navigate('/devis')}
                className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-[#333333] text-white rounded-md hover:bg-[#333333]/90 transition-colors shadow-sm"
              >
                <ClipboardList className="h-5 w-5" />
                <span className="font-medium">DEMANDE DE DEVIS</span>
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden px-4 pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Recherchez votre vêtement professionnel"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(true);
                }}
                className="w-full px-4 py-2 pl-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#00A6E6]/20 focus:border-[#00A6E6] transition-all"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Desktop Lower Navigation */}
          <div className="hidden md:block border-t">
            <div className="container mx-auto">
              <div className="flex items-center justify-between py-3">
                {/* Left-aligned Categories with improved spacing */}
                <div className="flex items-center gap-1">
                  {menuItems.map((item, index) => (
                    <CategoryLink 
                      key={index}
                      href={item.path}
                      topText={item.topText}
                      bottomText={item.bottomText}
                    />
                  ))}
                </div>

                {/* Right Buttons with better styling */}
                <div className="flex items-center gap-3 ml-4">
                  <button
                    onClick={() => navigate('/marques')}
                    className="px-6 py-2.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2"
                  >
                    <span>Personalisation</span>
                  </button>
                  <button
                    onClick={() => navigate('/metiers')}
                    className="px-6 py-2.5 bg-[#FFD700] text-black rounded-md hover:bg-[#FFD700]/90 transition-colors text-sm font-medium shadow-sm flex items-center gap-2"
                  >
                    <span>MÉTIERS</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow" onClick={() => setShowSearchResults(false)}>
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;