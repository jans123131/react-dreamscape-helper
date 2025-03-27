
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { User, Lock, LogIn } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const testUsers = [
    { role: 'Admin', email: 'admin@example.com', password: 'password123', access: 'Accès complet' },
    { role: 'Utilisateur', email: 'user@example.com', password: 'password123', access: 'Mobile uniquement (Tableau de bord)' }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Email ou mot de passe incorrect');
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la connexion');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (testEmail: string, testPassword: string) => {
    setEmail(testEmail);
    setPassword(testPassword);
    setIsLoading(true);
    
    try {
      const success = await login(testEmail, testPassword);
      
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Échec de la connexion rapide');
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md glass-card shadow-xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold">DARIAPP</CardTitle>
          <CardDescription>
            Connectez-vous à votre compte
          </CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Connexion</TabsTrigger>
            <TabsTrigger value="test-users">Utilisateurs de test</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password">Mot de passe</Label>
                    <a href="#" className="text-sm text-primary hover:underline">
                      Mot de passe oublié?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="mr-2">Connexion...</span>
                      <span className="animate-spin">
                        <svg
                          className="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </span>
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Connexion
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="test-users">
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Utilisez ces comptes pour tester les différents rôles
                </p>
                
                <div className="grid gap-3">
                  {testUsers.map((user, index) => (
                    <Button 
                      key={index}
                      variant="outline" 
                      className="flex justify-start items-center" 
                      onClick={() => handleQuickLogin(user.email, user.password)}
                    >
                      <div className="text-left">
                        <div className="font-medium">{user.role}</div>
                        <div className="text-xs text-muted-foreground">{user.access}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Login;
