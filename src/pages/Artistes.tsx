import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Music, Instagram, Facebook, Youtube, Upload, X, Mail, Phone, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

interface Artiste {
  id: string;
  nom: string;
  genre: string;
  photo: string;
  bio: string;
  social: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
  evenementsPassés: number;
  email?: string;
  telephone?: string;
  adresse?: string;
}

const ArtisteCard = ({ artiste }: { artiste: Artiste }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="card hover:border-gold-500/50 transition-colors cursor-pointer"
      onClick={() => navigate(`/artistes/${artiste.id}`)}
    >
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="w-full sm:w-48 h-48 rounded-lg overflow-hidden">
          <img 
            src={artiste.photo} 
            alt={artiste.nom}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-white">{artiste.nom}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Music className="h-4 w-4 text-gold-400" />
                <span className="text-gray-400">{artiste.genre}</span>
              </div>
            </div>
            <div className="flex gap-2">
              {artiste.social.instagram && (
                <a 
                  href={artiste.social.instagram} 
                  className="text-gray-400 hover:text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {artiste.social.facebook && (
                <a 
                  href={artiste.social.facebook} 
                  className="text-gray-400 hover:text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {artiste.social.youtube && (
                <a 
                  href={artiste.social.youtube} 
                  className="text-gray-400 hover:text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Youtube className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
          <p className="mt-4 text-gray-400">{artiste.bio}</p>
          <div className="mt-4 flex items-center gap-4">
            <span className="text-sm text-gray-400">
              {artiste.evenementsPassés} événements passés
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Artistes = () => {
  const [artistesList, setArtistesList] = useState<Artiste[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [newArtiste, setNewArtiste] = useState<Partial<Artiste>>({
    nom: '',
    genre: '',
    bio: '',
    email: '',
    telephone: '',
    adresse: '',
    social: {
      instagram: '',
      facebook: '',
      youtube: ''
    }
  });

  useEffect(() => {
    const storedArtistes = getFromLocalStorage<Artiste[]>('artistes', []);
    setArtistesList(storedArtistes);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddArtiste = () => {
    const newArtisteData: Artiste = {
      id: Date.now().toString(),
      nom: newArtiste.nom || '',
      genre: newArtiste.genre || '',
      photo: previewImage || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      bio: newArtiste.bio || '',
      social: {
        instagram: newArtiste.social?.instagram || '',
        facebook: newArtiste.social?.facebook || '',
        youtube: newArtiste.social?.youtube || ''
      },
      evenementsPassés: 0,
      email: newArtiste.email || '',
      telephone: newArtiste.telephone || '',
      adresse: newArtiste.adresse || ''
    };

    const updatedArtistes = [newArtisteData, ...artistesList];
    setArtistesList(updatedArtistes);
    saveToLocalStorage('artistes', updatedArtistes);
    
    setIsModalOpen(false);
    setNewArtiste({
      nom: '',
      genre: '',
      bio: '',
      email: '',
      telephone: '',
      adresse: '',
      social: {
        instagram: '',
        facebook: '',
        youtube: ''
      }
    });
    setPreviewImage(null);
  };

  const filteredArtistes = artistesList.filter(artiste => 
    artiste.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artiste.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artiste.bio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Artistes</h1>
        <button 
          className="btn-primary flex items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="h-5 w-5" />
          Ajouter un artiste
        </button>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Rechercher un artiste..."
          className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-gold-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid gap-6"
      >
        {filteredArtistes.map(artiste => (
          <ArtisteCard key={artiste.id} artiste={artiste} />
        ))}
      </motion.div>

      {/* Add Artist Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Ajouter un artiste"
      >
        <div className="space-y-6">
          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Photo de l'artiste
            </label>
            <div className="relative">
              {previewImage ? (
                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setPreviewImage(null)}
                    className="absolute top-2 right-2 p-1 bg-gray-900/80 rounded-full text-white hover:bg-gray-900"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="relative border-2 border-dashed border-gray-700 rounded-lg p-4 text-center h-48 flex flex-col items-center justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="space-y-2">
                    <Upload className="h-8 w-8 mx-auto text-gray-400" />
                    <p className="text-sm text-gray-400">
                      Cliquez ou glissez une image ici
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Nom
              </label>
              <input
                type="text"
                className="input w-full"
                value={newArtiste.nom}
                onChange={(e) => setNewArtiste({ ...newArtiste, nom: e.target.value })}
                placeholder="Nom de l'artiste ou du groupe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Genre musical
              </label>
              <input
                type="text"
                className="input w-full"
                value={newArtiste.genre}
                onChange={(e) => setNewArtiste({ ...newArtiste, genre: e.target.value })}
                placeholder="Ex: Jazz, Hip-Hop, Électro..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Biographie
            </label>
            <textarea
              className="input w-full h-24"
              value={newArtiste.bio}
              onChange={(e) => setNewArtiste({ ...newArtiste, bio: e.target.value })}
              placeholder="Courte description de l'artiste..."
            />
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-md font-semibold mb-2">Informations de contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-1">
                  <Mail className="h-4 w-4" /> Email
                </label>
                <input
                  type="email"
                  className="input w-full"
                  value={newArtiste.email}
                  onChange={(e) => setNewArtiste({ ...newArtiste, email: e.target.value })}
                  placeholder="email@exemple.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-1">
                  <Phone className="h-4 w-4" /> Téléphone
                </label>
                <input
                  type="tel"
                  className="input w-full"
                  value={newArtiste.telephone}
                  onChange={(e) => setNewArtiste({ ...newArtiste, telephone: e.target.value })}
                  placeholder="+33 6 12 34 56 78"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-1">
                <MapPin className="h-4 w-4" /> Adresse
              </label>
              <input
                type="text"
                className="input w-full"
                value={newArtiste.adresse}
                onChange={(e) => setNewArtiste({ ...newArtiste, adresse: e.target.value })}
                placeholder="Ville, Pays"
              />
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-md font-semibold mb-2">Réseaux sociaux</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-1">
                  <Instagram className="h-4 w-4" /> Instagram
                </label>
                <input
                  type="text"
                  className="input w-full"
                  value={newArtiste.social?.instagram}
                  onChange={(e) => setNewArtiste({ 
                    ...newArtiste, 
                    social: { ...newArtiste.social, instagram: e.target.value } 
                  })}
                  placeholder="URL Instagram"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-1">
                  <Facebook className="h-4 w-4" /> Facebook
                </label>
                <input
                  type="text"
                  className="input w-full"
                  value={newArtiste.social?.facebook}
                  onChange={(e) => setNewArtiste({ 
                    ...newArtiste, 
                    social: { ...newArtiste.social, facebook: e.target.value } 
                  })}
                  placeholder="URL Facebook"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-1">
                  <Youtube className="h-4 w-4" /> YouTube
                </label>
                <input
                  type="text"
                  className="input w-full"
                  value={newArtiste.social?.youtube}
                  onChange={(e) => setNewArtiste({ 
                    ...newArtiste, 
                    social: { ...newArtiste.social, youtube: e.target.value } 
                  })}
                  placeholder="URL YouTube"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Annuler
            </button>
            <button
              type="button"
              className="btn-primary"
              onClick={handleAddArtiste}
            >
              Ajouter l'artiste
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Artistes;