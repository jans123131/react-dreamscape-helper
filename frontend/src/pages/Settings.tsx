
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { 
  User, 
  Shield, 
  Moon, 
  Sun,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [theme, setTheme] = useState('system');
  
  const handleSave = () => {
    toast({
      title: "Paramètres enregistrés",
      description: "Vos modifications ont été enregistrées avec succès.",
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Paramètres</h1>
          <p className="text-muted-foreground mt-1">
            Gérez vos préférences et paramètres
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User size={16} />
              <span>Profil</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <Shield size={16} />
              <span>Compte</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">Prénom</Label>
                    <Input id="first-name" defaultValue="Jean" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Nom</Label>
                    <Input id="last-name" defaultValue="Dupont" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="jean.dupont@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" type="tel" defaultValue="+33 6 12 34 56 78" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Enregistrer</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Photo de profil</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border">
                  <div className="absolute inset-0 bg-primary/10 flex items-center justify-center text-2xl font-semibold text-primary">
                    JD
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="outline">Changer la photo</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mot de passe</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Mot de passe actuel</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nouveau mot de passe</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Mettre à jour</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sécurité</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label>Authentification à deux facteurs</Label>
                    <p className="text-sm text-muted-foreground">
                      Ajouter une couche de sécurité supplémentaire
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
