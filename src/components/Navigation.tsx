
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path: string) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/80 backdrop-blur-lg shadow-sm py-4'
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>

          <div className="hidden md:flex items-center space-x-8">
            {[
              { label: 'Produits', path: '/products' },
              { label: 'Caractéristiques', path: '/features' },
              { label: 'À propos', path: '/about' },
              { label: 'Contact', path: '/contact' },
            ].map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="text-gray-600 hover:text-primary"
                onClick={() => handleNavigation(item.path)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-lg animate-fade-in">
            <div className="flex flex-col space-y-4 p-6">
              {[
                { label: 'Produits', path: '/products' },
                { label: 'Caractéristiques', path: '/features' },
                { label: 'À propos', path: '/about' },
                { label: 'Contact', path: '/contact' },
              ].map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="justify-start"
                  onClick={() => handleNavigation(item.path)}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
