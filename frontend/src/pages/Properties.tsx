import React, { useState } from 'react';
import { 
  Building2, 
  Plus, 
  Search, 
  Filter, 
  Grid, 
  List,
  SlidersHorizontal
} from 'lucide-react';
import { Layout } from '@/components/Layout';
import { PropertyCard, PropertyData } from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Properties = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const propertiesData: PropertyData[] = [
    {
      id: 'prop1',
      title: 'Villa de Luxe Front de Mer',
      address: '123 Ocean Drive, Miami, FL',
      price: 350,
      type: 'Villa',
      bedrooms: 4,
      bathrooms: 3,
      area: 2800,
      rating: 4.9,
      status: 'available',
      imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'prop2',
      title: 'Appartement Moderne Centre-Ville',
      address: '456 Main St, Seattle, WA',
      price: 180,
      type: 'Appartement',
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      rating: 4.7,
      status: 'booked',
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'prop3',
      title: 'Chalet Confortable en Montagne',
      address: '789 Pine Rd, Aspen, CO',
      price: 250,
      type: 'Chalet',
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      rating: 4.8,
      status: 'maintenance',
      imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'prop4',
      title: 'Loft Urbain Stylé',
      address: '101 Arts District, Portland, OR',
      price: 195,
      type: 'Loft',
      bedrooms: 1,
      bathrooms: 1,
      area: 950,
      rating: 4.6,
      status: 'available',
      imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'prop5',
      title: 'Cottage au Bord du Lac',
      address: '42 Lake View Rd, Lake Tahoe, NV',
      price: 280,
      type: 'Cottage',
      bedrooms: 3,
      bathrooms: 2,
      area: 1600,
      rating: 4.9,
      status: 'booked',
      imageUrl: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'prop6',
      title: 'Maison Historique en Ville',
      address: '567 Park Ave, New York, NY',
      price: 400,
      type: 'Maison de ville',
      bedrooms: 3,
      bathrooms: 2.5,
      area: 2200,
      rating: 4.7,
      status: 'available',
      imageUrl: 'https://images.unsplash.com/photo-1581577124372-9b0bc4b9a848?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }
  ];

  const filteredProperties = propertiesData.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          property.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || property.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleEditProperty = (id: string) => {
    toast({
      title: "Modifier la Propriété",
      description: `Modification de la propriété ID: ${id}`,
    });
  };

  const handleDeleteProperty = (id: string) => {
    toast({
      title: "Supprimer la Propriété",
      description: `La propriété ID: ${id} a été supprimée.`,
      variant: "destructive",
    });
  };

  const handleAddProperty = () => {
    toast({
      title: "Propriété Ajoutée",
      description: "La nouvelle propriété a été ajoutée avec succès.",
    });
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Propriétés</h1>
            <p className="text-muted-foreground mt-1">Gérez vos propriétés de location</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter une Propriété
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Ajouter une Nouvelle Propriété</DialogTitle>
                <DialogDescription>
                  Entrez les détails de votre nouvelle propriété de location.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="title" className="text-sm font-medium">Titre de la Propriété</label>
                  <Input id="title" placeholder="Entrez le titre de la propriété" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="type" className="text-sm font-medium">Type de Propriété</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="appartement">Appartement</SelectItem>
                        <SelectItem value="maison">Maison</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="chalet">Chalet</SelectItem>
                        <SelectItem value="cottage">Cottage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="price" className="text-sm font-medium">Prix par Nuit (€)</label>
                    <Input id="price" type="number" placeholder="0" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="address" className="text-sm font-medium">Adresse</label>
                  <Input id="address" placeholder="Entrez l'adresse de la propriété" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="bedrooms" className="text-sm font-medium">Chambres</label>
                    <Input id="bedrooms" type="number" placeholder="0" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="bathrooms" className="text-sm font-medium">Salles de Bain</label>
                    <Input id="bathrooms" type="number" placeholder="0" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="area" className="text-sm font-medium">Surface (m²)</label>
                    <Input id="area" type="number" placeholder="0" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="image" className="text-sm font-medium">URL de l'Image</label>
                  <Input id="image" placeholder="Entrez l'URL de l'image" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" type="button">Annuler</Button>
                <Button type="submit" onClick={handleAddProperty}>Ajouter</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher des propriétés..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les Propriétés</SelectItem>
                <SelectItem value="available">Disponible</SelectItem>
                <SelectItem value="booked">Réservé</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
            
            <Tabs defaultValue={viewMode} className="w-auto h-9">
              <TabsList>
                <TabsTrigger 
                  value="grid" 
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger 
                  value="list" 
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 dark:bg-slate-900/30 rounded-lg">
            <Building2 className="mx-auto h-16 w-16 text-muted-foreground/50" />
            <h3 className="mt-4 text-xl font-medium">Aucune propriété trouvée</h3>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              Essayez d'ajuster votre recherche ou vos filtres pour trouver ce que vous cherchez.
            </p>
            <Button variant="outline" className="mt-6">
              <Plus className="mr-2 h-4 w-4" />
              Ajouter Votre Première Propriété
            </Button>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3" 
            : "flex flex-col space-y-6"
          }>
            {filteredProperties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property}
                onDelete={handleDeleteProperty}
                className={viewMode === 'list' ? "flex flex-row h-auto max-h-64" : ""}
                showActions={true}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Properties;
