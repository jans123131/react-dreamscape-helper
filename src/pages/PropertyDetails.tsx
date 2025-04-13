/**
 * PropertyDetails.tsx
 * 
 * Description (FR):
 * Page de détails d'une propriété, affichant toutes les informations
 * relatives à un espace de travail spécifique.
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  Clock, 
  Building2, 
  Wifi, 
  ParkingCircle, 
  Coffee, 
  Users, 
  Monitor, 
  Check, 
  X,
  Briefcase,
  CalendarClock,
  UtensilsCrossed,
  PrinterIcon,
  BadgeCheck,
  AccessibilityIcon,
  ShieldCheck
} from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { propertyApi, Property } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { canDelete } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        console.log("Fetching property with ID:", id);
        const propertyData = await propertyApi.getPropertyById(id);
        console.log("Fetched property:", propertyData);
        setProperty(propertyData);
      } catch (error) {
        console.error('Error fetching property details:', error);
        toast({
          title: "Erreur",
          description: "Impossible de récupérer les détails de la propriété",
          variant: "destructive",
        });
        // Redirect back to properties list on error
        navigate('/properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, toast, navigate]);

  const handleDelete = async () => {
    if (!id || !property || !canDelete('properties')) return;
    
    try {
      await propertyApi.deleteProperty(id);
      toast({
        title: "Propriété supprimée",
        description: "La propriété a été supprimée avec succès",
      });
      navigate('/properties');
    } catch (error) {
      console.error('Error deleting property:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la propriété",
        variant: "destructive",
      });
    }
  };

  const statusColors = {
    available: { bg: 'bg-green-100', text: 'text-green-700', label: 'Disponible' },
    booked: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Réservé' },
    maintenance: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Maintenance' }
  };

  if (loading) {
    return (
      <Layout>
        <div className="space-y-8">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" onClick={() => navigate('/properties')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Skeleton className="h-10 w-64" />
          </div>
          <Skeleton className="h-[500px] w-full rounded-lg" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-[200px] rounded-lg" />
            <Skeleton className="h-[200px] rounded-lg" />
            <Skeleton className="h-[200px] rounded-lg" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!property) {
    return (
      <Layout>
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold">Propriété non trouvée</h2>
          <p className="text-muted-foreground mt-2">La propriété que vous recherchez n'existe pas ou a été supprimée.</p>
          <Button className="mt-6" onClick={() => navigate('/properties')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour aux Propriétés
          </Button>
        </div>
      </Layout>
    );
  }

  const statusStyle = statusColors[property.status as keyof typeof statusColors] || statusColors.available;
  const isOfficeProperty = property.property_type === 'office';

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" onClick={() => navigate('/properties')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{property.title}</h1>
              <div className="flex items-center mt-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1.5" />
                <span>{property.address}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className={cn("px-3 py-1", statusStyle.bg, statusStyle.text)}>
              {statusStyle.label}
            </Badge>
            {canDelete('properties') && (
              <Button variant="destructive" onClick={handleDelete}>
                Supprimer cette propriété
              </Button>
            )}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl aspect-[16/9] bg-slate-100">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-slate-200 animate-pulse rounded-xl" />
          )}
          <img
            src={property.image_url}
            alt={property.title}
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
            style={{ opacity: imageLoaded ? 1 : 0, transition: 'opacity 0.3s ease-in-out' }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations de Base</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Type</span>
                <span className="font-medium">{property.type}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Prix</span>
                <span className="font-medium text-lg">{property.price}€ / jour</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Note</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 fill-amber-400 text-amber-400" />
                  <span className="font-medium">{property.rating}</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Surface</span>
                <span className="font-medium">{property.area} m²</span>
              </div>
              <Separator />
              {isOfficeProperty ? (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Postes de travail</span>
                    <span className="font-medium">{property.workstations}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Salles de réunion</span>
                    <span className="font-medium">{property.meeting_rooms}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Chambres</span>
                    <span className="font-medium">{property.bedrooms}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Salles de bain</span>
                    <span className="font-medium">{property.bathrooms}</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {isOfficeProperty && (
            <Card>
              <CardHeader>
                <CardTitle>Équipements</CardTitle>
                <CardDescription>Équipements disponibles pour cet espace</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-y-4">
                  <div className="flex items-center">
                    {property.wifi ? (
                      <><Check className="h-5 w-5 text-green-500 mr-2" /> <Wifi className="h-4 w-4 mr-1.5" /> WiFi</>
                    ) : (
                      <><X className="h-5 w-5 text-red-500 mr-2" /> <Wifi className="h-4 w-4 mr-1.5 text-muted-foreground" /> WiFi</>
                    )}
                  </div>
                  <div className="flex items-center">
                    {property.parking ? (
                      <><Check className="h-5 w-5 text-green-500 mr-2" /> <ParkingCircle className="h-4 w-4 mr-1.5" /> Parking</>
                    ) : (
                      <><X className="h-5 w-5 text-red-500 mr-2" /> <ParkingCircle className="h-4 w-4 mr-1.5 text-muted-foreground" /> Parking</>
                    )}
                  </div>
                  <div className="flex items-center">
                    {property.coffee ? (
                      <><Check className="h-5 w-5 text-green-500 mr-2" /> <Coffee className="h-4 w-4 mr-1.5" /> Machine à café</>
                    ) : (
                      <><X className="h-5 w-5 text-red-500 mr-2" /> <Coffee className="h-4 w-4 mr-1.5 text-muted-foreground" /> Machine à café</>
                    )}
                  </div>
                  <div className="flex items-center">
                    {property.kitchen ? (
                      <><Check className="h-5 w-5 text-green-500 mr-2" /> <UtensilsCrossed className="h-4 w-4 mr-1.5" /> Cuisine</>
                    ) : (
                      <><X className="h-5 w-5 text-red-500 mr-2" /> <UtensilsCrossed className="h-4 w-4 mr-1.5 text-muted-foreground" /> Cuisine</>
                    )}
                  </div>
                  <div className="flex items-center">
                    {property.printers ? (
                      <><Check className="h-5 w-5 text-green-500 mr-2" /> <PrinterIcon className="h-4 w-4 mr-1.5" /> Imprimantes</>
                    ) : (
                      <><X className="h-5 w-5 text-red-500 mr-2" /> <PrinterIcon className="h-4 w-4 mr-1.5 text-muted-foreground" /> Imprimantes</>
                    )}
                  </div>
                  <div className="flex items-center">
                    {property.secured ? (
                      <><Check className="h-5 w-5 text-green-500 mr-2" /> <ShieldCheck className="h-4 w-4 mr-1.5" /> Sécurisé</>
                    ) : (
                      <><X className="h-5 w-5 text-red-500 mr-2" /> <ShieldCheck className="h-4 w-4 mr-1.5 text-muted-foreground" /> Sécurisé</>
                    )}
                  </div>
                  <div className="flex items-center">
                    {property.reception ? (
                      <><Check className="h-5 w-5 text-green-500 mr-2" /> <BadgeCheck className="h-4 w-4 mr-1.5" /> Réception</>
                    ) : (
                      <><X className="h-5 w-5 text-red-500 mr-2" /> <BadgeCheck className="h-4 w-4 mr-1.5 text-muted-foreground" /> Réception</>
                    )}
                  </div>
                  <div className="flex items-center">
                    {property.accessible ? (
                      <><Check className="h-5 w-5 text-green-500 mr-2" /> <AccessibilityIcon className="h-4 w-4 mr-1.5" /> Accessible PMR</>
                    ) : (
                      <><X className="h-5 w-5 text-red-500 mr-2" /> <AccessibilityIcon className="h-4 w-4 mr-1.5 text-muted-foreground" /> Accessible PMR</>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Disponibilité</CardTitle>
              <CardDescription>Horaires et disponibilité de l'espace</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <div className="font-medium">Horaires</div>
                  {isOfficeProperty && property.flexible_hours ? (
                    <div className="text-sm text-muted-foreground flex items-center mt-1">
                      <CalendarClock className="h-4 w-4 mr-1.5 text-green-500" />
                      <span>Accès 24h/24 et 7j/7</span>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground mt-1">
                      Lundi - Vendredi: 9h - 19h<br />
                      Samedi: 10h - 17h<br />
                      Dimanche: Fermé
                    </div>
                  )}
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center">
                <Building2 className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <div className="font-medium">Statut actuel</div>
                  <div className="text-sm mt-1">
                    <Badge className={cn("mt-1", statusStyle.bg, statusStyle.text)}>
                      {statusStyle.label}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center">
                <Briefcase className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <div className="font-medium">Type de propriété</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {property.property_type === 'office' ? 'Espace professionnel' : 'Propriété résidentielle'}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                Réserver cet espace
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PropertyDetails;
