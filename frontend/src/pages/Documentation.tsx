
import React from 'react';
import { Layout } from '@/components/Layout';

const Documentation = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold mb-6">Documentation API - DARIAPP</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4 text-primary">API Utilisateurs</h2>
          
          <div className="space-y-8">
            {/* GET all users */}
            <div className="border-b pb-6">
              <div className="flex items-center mb-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-mono mr-2">GET</span>
                <span className="font-bold text-lg">/api/users</span>
              </div>
              <p className="text-gray-600 mb-4">Récupère la liste de tous les utilisateurs</p>
              
              <h4 className="font-semibold mb-2">Exemple avec Postman:</h4>
              <div className="bg-gray-50 p-3 rounded-md mb-2">
                <p className="font-mono text-sm">
                  <span className="text-blue-600">Méthode:</span> GET<br />
                  <span className="text-blue-600">URL:</span> http://localhost:3000/api/users
                </p>
              </div>
              
              <h4 className="font-semibold mb-2">Réponse:</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
{`[
  {
    "user_id": 1,
    "nom": "Dupont",
    "prenom": "Jean",
    "email": "jean.dupont@example.com",
    "role": "user"
  },
  {
    "user_id": 2,
    "nom": "Martin",
    "prenom": "Marie",
    "email": "marie.martin@example.com",
    "role": "admin"
  }
]`}
              </pre>
            </div>
            
            {/* GET user by ID */}
            <div className="border-b pb-6">
              <div className="flex items-center mb-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-mono mr-2">GET</span>
                <span className="font-bold text-lg">/api/users/:id</span>
              </div>
              <p className="text-gray-600 mb-4">Récupère les informations d'un utilisateur spécifique</p>
              
              <h4 className="font-semibold mb-2">Paramètres:</h4>
              <ul className="list-disc pl-5 mb-4">
                <li><span className="font-mono">id</span>: identifiant de l'utilisateur</li>
              </ul>
              
              <h4 className="font-semibold mb-2">Exemple avec Postman:</h4>
              <div className="bg-gray-50 p-3 rounded-md mb-2">
                <p className="font-mono text-sm">
                  <span className="text-blue-600">Méthode:</span> GET<br />
                  <span className="text-blue-600">URL:</span> http://localhost:3000/api/users/1
                </p>
              </div>
              
              <h4 className="font-semibold mb-2">Réponse:</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
{`{
  "user_id": 1,
  "nom": "Dupont",
  "prenom": "Jean",
  "email": "jean.dupont@example.com",
  "role": "user"
}`}
              </pre>
            </div>
            
            {/* Register */}
            <div className="border-b pb-6">
              <div className="flex items-center mb-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-mono mr-2">POST</span>
                <span className="font-bold text-lg">/api/users/register</span>
              </div>
              <p className="text-gray-600 mb-4">Crée un nouvel utilisateur</p>
              
              <h4 className="font-semibold mb-2">Corps de la requête:</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto mb-4">
{`{
  "nom": "Dupont",
  "prenom": "Jean",
  "email": "jean.dupont@example.com",
  "password": "motdepasse123",
  "role": "user"
}`}
              </pre>
              
              <h4 className="font-semibold mb-2">Exemple avec Postman:</h4>
              <div className="bg-gray-50 p-3 rounded-md mb-2">
                <p className="font-mono text-sm">
                  <span className="text-blue-600">Méthode:</span> POST<br />
                  <span className="text-blue-600">URL:</span> http://localhost:3000/api/users/register<br />
                  <span className="text-blue-600">Body:</span> raw (JSON)<br />
                  <span className="text-blue-600">Contenu:</span> Copier le JSON ci-dessus
                </p>
              </div>
              
              <h4 className="font-semibold mb-2">Réponse:</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
{`{
  "message": "Utilisateur créé avec succès",
  "userId": 3
}`}
              </pre>
            </div>
            
            {/* Login */}
            <div className="border-b pb-6">
              <div className="flex items-center mb-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-mono mr-2">POST</span>
                <span className="font-bold text-lg">/api/users/login</span>
              </div>
              <p className="text-gray-600 mb-4">Authentifie un utilisateur</p>
              
              <h4 className="font-semibold mb-2">Corps de la requête:</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto mb-4">
{`{
  "email": "jean.dupont@example.com",
  "password": "motdepasse123"
}`}
              </pre>
              
              <h4 className="font-semibold mb-2">Exemple avec Postman:</h4>
              <div className="bg-gray-50 p-3 rounded-md mb-2">
                <p className="font-mono text-sm">
                  <span className="text-blue-600">Méthode:</span> POST<br />
                  <span className="text-blue-600">URL:</span> http://localhost:3000/api/users/login<br />
                  <span className="text-blue-600">Body:</span> raw (JSON)<br />
                  <span className="text-blue-600">Contenu:</span> Copier le JSON ci-dessus
                </p>
              </div>
              
              <h4 className="font-semibold mb-2">Réponse:</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
{`{
  "user": {
    "id": 1,
    "nom": "Dupont",
    "prenom": "Jean",
    "email": "jean.dupont@example.com",
    "role": "user"
  }
}`}
              </pre>
            </div>
            
            {/* Logout */}
            <div className="border-b pb-6">
              <div className="flex items-center mb-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-mono mr-2">POST</span>
                <span className="font-bold text-lg">/api/users/logout</span>
              </div>
              <p className="text-gray-600 mb-4">Déconnecte l'utilisateur actuellement connecté</p>
              
              <h4 className="font-semibold mb-2">Exemple avec Postman:</h4>
              <div className="bg-gray-50 p-3 rounded-md mb-2">
                <p className="font-mono text-sm">
                  <span className="text-blue-600">Méthode:</span> POST<br />
                  <span className="text-blue-600">URL:</span> http://localhost:3000/api/users/logout
                </p>
              </div>
              
              <h4 className="font-semibold mb-2">Réponse:</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
{`{
  "message": "Déconnecté avec succès"
}`}
              </pre>
            </div>
            
            {/* Current user */}
            <div className="border-b pb-6">
              <div className="flex items-center mb-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-mono mr-2">GET</span>
                <span className="font-bold text-lg">/api/users/me</span>
              </div>
              <p className="text-gray-600 mb-4">Récupère les informations de l'utilisateur actuellement connecté</p>
              
              <h4 className="font-semibold mb-2">Exemple avec Postman:</h4>
              <div className="bg-gray-50 p-3 rounded-md mb-2">
                <p className="font-mono text-sm">
                  <span className="text-blue-600">Méthode:</span> GET<br />
                  <span className="text-blue-600">URL:</span> http://localhost:3000/api/users/me
                </p>
              </div>
              
              <h4 className="font-semibold mb-2">Réponse:</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
{`{
  "user_id": 1,
  "nom": "Dupont",
  "prenom": "Jean",
  "email": "jean.dupont@example.com",
  "role": "user"
}`}
              </pre>
            </div>
            
            {/* Update user */}
            <div className="border-b pb-6">
              <div className="flex items-center mb-2">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm font-mono mr-2">PUT</span>
                <span className="font-bold text-lg">/api/users/:id</span>
              </div>
              <p className="text-gray-600 mb-4">Modifie les informations d'un utilisateur</p>
              
              <h4 className="font-semibold mb-2">Paramètres:</h4>
              <ul className="list-disc pl-5 mb-4">
                <li><span className="font-mono">id</span>: identifiant de l'utilisateur</li>
              </ul>
              
              <h4 className="font-semibold mb-2">Corps de la requête (tous les champs sont optionnels):</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto mb-4">
{`{
  "nom": "Nouveau Nom",
  "prenom": "Nouveau Prénom",
  "email": "nouvel.email@example.com",
  "password": "nouveaumotdepasse",
  "role": "admin"
}`}
              </pre>
              
              <h4 className="font-semibold mb-2">Exemple avec Postman:</h4>
              <div className="bg-gray-50 p-3 rounded-md mb-2">
                <p className="font-mono text-sm">
                  <span className="text-blue-600">Méthode:</span> PUT<br />
                  <span className="text-blue-600">URL:</span> http://localhost:3000/api/users/1<br />
                  <span className="text-blue-600">Body:</span> raw (JSON)<br />
                  <span className="text-blue-600">Contenu:</span> Copier le JSON ci-dessus (ou une partie des champs à modifier)
                </p>
              </div>
              
              <h4 className="font-semibold mb-2">Réponse:</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
{`{
  "message": "Utilisateur mis à jour avec succès"
}`}
              </pre>
            </div>
            
            {/* Delete user */}
            <div>
              <div className="flex items-center mb-2">
                <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm font-mono mr-2">DELETE</span>
                <span className="font-bold text-lg">/api/users/:id</span>
              </div>
              <p className="text-gray-600 mb-4">Supprime un utilisateur</p>
              
              <h4 className="font-semibold mb-2">Paramètres:</h4>
              <ul className="list-disc pl-5 mb-4">
                <li><span className="font-mono">id</span>: identifiant de l'utilisateur</li>
              </ul>
              
              <h4 className="font-semibold mb-2">Exemple avec Postman:</h4>
              <div className="bg-gray-50 p-3 rounded-md mb-2">
                <p className="font-mono text-sm">
                  <span className="text-blue-600">Méthode:</span> DELETE<br />
                  <span className="text-blue-600">URL:</span> http://localhost:3000/api/users/1
                </p>
              </div>
              
              <h4 className="font-semibold mb-2">Réponse:</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
{`{
  "message": "Utilisateur supprimé avec succès"
}`}
              </pre>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-bold mb-4">Schéma de la base de données</h3>
          
          <h4 className="font-semibold mb-2">Table users</h4>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
{`CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL COMMENT 'Store hashed password ',
    role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`}
          </pre>
        </div>
      </div>
    </Layout>
  );
};

export default Documentation;
