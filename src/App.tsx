
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Artistes from './pages/Artistes';
import ArtisteDetail from './pages/ArtisteDetail';
import Evenements from './pages/Evenements';
import Taches from './pages/Taches';
import Finances from './pages/Finances';
import NouveauDevis from './pages/NouveauDevis';
import Parametres from './pages/Parametres';
import FileManager from './pages/FileManager';

function App() {
  // For demo purposes, we'll use a simple authentication check
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if the user is authenticated by looking at localStorage
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route
          path="/"
          element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}
        >
          <Route index element={<Dashboard />} />
          <Route path="artistes" element={<Artistes />} />
          <Route path="artistes/:id" element={<ArtisteDetail />} />
          <Route path="evenements" element={<Evenements />} />
          <Route path="taches" element={<Taches />} />
          <Route path="finances" element={<Finances />} />
          <Route path="finances/nouveau-devis" element={<NouveauDevis />} />
          <Route path="parametres" element={<Parametres />} />
          <Route path="fichiers" element={<FileManager />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
