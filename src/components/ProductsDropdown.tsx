
import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ProductCategory } from "../types";
import { useTranslation } from "react-i18next";

// Define types
interface SubMenuItem {
  label: string;
  href: string;
  category: ProductCategory;
  subcategory?: string;
  translationKey: string;
}

interface MenuItem {
  label: string;
  translationKey: string;
  items?: SubMenuItem[];
  directLink?: {
    href: string;
    category: ProductCategory;
  };
}

// Define the menu structure
const MENU_ITEMS: MenuItem[] = [
  {
    label: "Dattes",
    translationKey: "navbar.dates",
    items: [
      { label: "Coffrets Cadeaux", href: "products", category: "dattes-fraiches", subcategory: "coffret-cadeaux", translationKey: "navbar.gift_box" },
      { label: "Paquets", href: "products", category: "dattes-fraiches", subcategory: "paquet", translationKey: "navbar.packages" },
      { label: "Barquettes", href: "products", category: "dattes-transformees", subcategory: "barquette", translationKey: "navbar.trays" }
    ]
  },
  {
    label: "Figues Séchées",
    translationKey: "navbar.dried_figs",
    items: [
      { label: "Figues Séchées à l'Huile d'Olive", href: "products", category: "figues-sechees", translationKey: "navbar.figs_olive_oil" },
      { label: "Figues Séchées en Vrac", href: "products", category: "figues-sechees", translationKey: "navbar.bulk_figs" }
    ]
  },
  {
    label: "Sirops de Fruits",
    translationKey: "navbar.fruit_syrups",
    items: [
      { label: "Sirop de Dattes", href: "products", category: "sirop-dattes", translationKey: "navbar.date_syrup" }
    ]
  },
  {
    label: "Sucre de Dattes",
    translationKey: "navbar.date_sugar",
    directLink: {
      href: "products",
      category: "sucre-dattes"
    }
  },
  {
    label: "Café de Dattes",
    translationKey: "navbar.date_coffee",
    directLink: {
      href: "products",
      category: "cafe-dattes"
    }
  }
];

interface ProductsDropdownProps {
  onPageChange: (page: string, category?: ProductCategory, subcategory?: string) => void;
}

const ProductsDropdown = ({ onPageChange }: ProductsDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { t } = useTranslation();

  const handleClick = (href: string, category: ProductCategory, subcategory?: string, e: React.MouseEvent) => {
    e.preventDefault();
    onPageChange(href, category, subcategory);
    setIsOpen(false);
  };

  // Handle mouse enter for the main dropdown
  const handleDropdownEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMainProductsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onPageChange("products-all");
    setIsOpen(false);
  };
  
  // Handle mouse leave for the main dropdown with a delay
  const handleDropdownLeave = () => {
    // Add a significant delay before closing the dropdown
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setActiveSubmenu(null);
    }, 300); // 300ms delay before closing
  };

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveSubmenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // Clear any lingering timeouts on unmount
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="relative group" 
      ref={dropdownRef}
      onMouseEnter={handleDropdownEnter}
      onMouseLeave={handleDropdownLeave}
    >
      {/* Main Dropdown Button */}
      <button
        onClick={handleMainProductsClick}
        className="flex items-center gap-1 text-gray-700 hover:text-[#96cc39] transition-colors py-2"
      >
        {t('navbar.products')}
        <ChevronDown className="w-4 h-4" />
      </button>

      {/* Main Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
          {MENU_ITEMS.map((item) => (
            <div 
              key={item.translationKey} 
              className="relative group"
              onMouseEnter={() => setActiveSubmenu(item.directLink ? null : item.translationKey)}
            >
              {/* Main Category Item - Either with submenu or direct link */}
              {item.directLink ? (
                <a 
                  href="#"
                  onClick={(e) => handleClick(item.directLink!.href, item.directLink!.category, undefined, e)}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#96cc39]"
                >
                  {t(item.translationKey)}
                </a>
              ) : (
                <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#96cc39]">
                  <ChevronRight className="w-4 h-4 mr-2" />
                  {t(item.translationKey)}
                </button>
              )}

              {/* Submenu - Appears Aligned to the Right (only for items with subitems) */}
              {item.items && activeSubmenu === item.translationKey && (
                <div 
                  className="absolute top-0 left-full ml-0 w-72 bg-white rounded-lg shadow-lg border border-gray-100 py-2"
                  style={{ marginLeft: '1px' }} // Ensure there's no gap between menus
                >
                  {item.items.map((subItem) => (
                    <a
                      key={subItem.translationKey}
                      href="#"
                      onClick={(e) => handleClick(subItem.href, subItem.category, subItem.subcategory, e)}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#96cc39]"
                    >
                      {t(subItem.translationKey)}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsDropdown;
