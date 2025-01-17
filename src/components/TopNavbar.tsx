import React, { useState } from "react";
import { Menu, X, MapPin, Phone, Globe } from "lucide-react";
import CartIcon from "./navigation/CartIcon";
import MobileMenu from "./navigation/MobileMenu";
import MobileMenuOverlay from "./navigation/MobileMenuOverlay";
import { menuItems } from "@/constants/menuItems";
import StoreLocationsModal from "./StoreLocationsModal";
import ContactModal from "./ContactModal";
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TopNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setExpandedItem(null);
  };

  const toggleSubmenu = (title: string) => {
    setExpandedItem(expandedItem === title ? null : title);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="font-['WomanFontRegular']">
      <nav className="bg-primary px-2 sm:px-3 py-3 sm:py-[4px] shadow-md">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          <div className="flex items-center justify-between w-full sm:w-auto sm:h-[90%]">
            <button
              onClick={toggleMenu}
              className="lg:hidden text-white hover:text-accent transition-colors duration-300 -ml-1"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={26} className="text-white" />
              ) : (
                <Menu size={26} className="text-white" />
              )}
            </button>

            <div className="flex-1 text-center sm:hidden">
              <span className="text-sm text-white whitespace-nowrap">
                {t('common.freeShipping')}
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-4">
              <span className="flex items-center gap-2 text-sm text-white whitespace-nowrap">
                {t('common.freeShipping')}
              </span>
            </div>

            <div className="flex items-center gap-4 sm:hidden -mr-1">
              <CartIcon />
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-4 sm:h-[90%]">
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="flex items-center gap-2 text-sm text-white whitespace-nowrap hover:text-accent transition-colors duration-300"
            >
              <Phone size={16} />
              {t('navigation.contact')}
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 text-sm text-white whitespace-nowrap hover:text-accent transition-colors duration-300">
                  <Globe size={16} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => changeLanguage('fr')}>
                  Français
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('en')}>
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <CartIcon />
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={isOpen}
        onClose={toggleMenu}
        menuItems={menuItems}
        expandedItem={expandedItem}
        onToggleSubmenu={toggleSubmenu}
        onStoreClick={() => setIsStoreModalOpen(true)}
        onContactClick={() => setIsContactModalOpen(true)}
      />

      <MobileMenuOverlay isOpen={isOpen} onClose={toggleMenu} />

      <StoreLocationsModal
        isOpen={isStoreModalOpen}
        onOpenChange={setIsStoreModalOpen}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
      />
    </div>
  );
};

export default TopNavbar;