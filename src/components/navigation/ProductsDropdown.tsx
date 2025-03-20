
import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { ProductCategory } from '../../types';

interface SubMenuItem {
  label: string;
  href: string;
  category: ProductCategory;
  subcategory?: string;
  productId?: string;
}

interface MenuItem {
  label: string;
  items: SubMenuItem[];
}

const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Dattes',
    items: [
      { label: 'Dattes Fraîches', href: 'products', category: 'dattes-en-vrac' },
      { label: 'Dattes Transformées', href: 'products', category: 'coffret-cadeaux' }
    ]
  },
  {
    label: 'Produits Dérivés',
    items: [
      { label: 'Tous les produits dérivés', href: 'products', category: 'tous' },
      { label: 'Café de Dattes', href: 'products', category: 'cafe-dattes', productId: '11' },
      { label: 'Sucre de Dattes', href: 'products', category: 'sucre-dattes', productId: '12' },
      { label: 'Sirop de Dattes', href: 'products', category: 'sirop-dattes', productId: '13' }
    ]
  },
  {
    label: 'Figues Séchées',
    items: [
      { label: 'Toutes les Figues', href: 'products', category: 'figues-sechees' },
      { label: 'Figues djebaa', href: 'products', category: 'figues-sechees', productId: '15' },
      { label: 'Figues ZIDI 200g', href: 'products', category: 'figues-sechees', productId: '9' },
      { label: 'Figues Toujane', href: 'products', category: 'figues-sechees', productId: '14' },
      { label: 'Figues Séchées en Vrac', href: 'products', category: 'figues-sechees', productId: '10' }
    ]
  }
];

interface ProductsDropdownProps {
  onPageChange: (page: string, category?: string, subcategory?: string, productId?: string) => void;
}

const ProductsDropdown = ({ onPageChange }: ProductsDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const handleClick = (href: string, category: string, subcategory?: string, productId?: string, e: React.MouseEvent = {} as React.MouseEvent) => {
    if (e && e.preventDefault) e.preventDefault();
    // Always pass the productId parameter to ensure proper product filtering
    onPageChange(href, category, subcategory, productId);
    setIsOpen(false);
  };

  return (
    <div className="relative group">
      <button
        onMouseEnter={() => setIsOpen(true)}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-[#96cc39] transition-colors"
      >
        Produits
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          onMouseLeave={() => {
            setIsOpen(false);
            setActiveSubmenu(null);
          }}
          className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50"
        >
          {MENU_ITEMS.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setActiveSubmenu(item.label)}
            >
              <button
                className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#96cc39]"
              >
                {item.label}
                <ChevronRight className="w-4 h-4" />
              </button>

              {activeSubmenu === item.label && (
                <div className="absolute top-0 left-full ml-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                  {item.items.map((subItem) => (
                    <a
                      key={subItem.label}
                      href="#"
                      onClick={(e) => handleClick(subItem.href, subItem.category, subItem.subcategory, subItem.productId, e)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#96cc39]"
                    >
                      {subItem.label}
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
