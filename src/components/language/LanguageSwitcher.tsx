import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(() => 
    localStorage.getItem('preferredLanguage') || 'fr'
  );

  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'fr';
    if (i18n.changeLanguage) {
      i18n.changeLanguage(savedLang);
    }
    setCurrentLang(savedLang);
  }, [i18n]);

  const handleLanguageChange = (lang: string) => {
    if (i18n.changeLanguage) {
      i18n.changeLanguage(lang);
      setCurrentLang(lang);
      localStorage.setItem('preferredLanguage', lang);
    }
  };

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="text-white hover:text-red-500">
            <Globe className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem 
            onClick={() => handleLanguageChange('en')}
            className={currentLang === 'en' ? 'bg-accent' : ''}
          >
            English
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleLanguageChange('fr')}
            className={currentLang === 'fr' ? 'bg-accent' : ''}
          >
            Français
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSwitcher;