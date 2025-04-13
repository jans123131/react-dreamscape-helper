
/**
 * api.ts
 * 
 * Description (FR):
 * Ce fichier contient les fonctions d'API pour communiquer avec le backend.
 * Il inclut:
 * - La définition des interfaces de données (User, UserLogin, etc.)
 * - La gestion des erreurs API
 * - Des fonctions pour les opérations CRUD sur les utilisateurs
 * - La gestion de l'authentification (login, logout)
 */

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:3000/api';

// Interfaces based on your database schema
export interface User {
  user_id: number;
  nom: string;
  prenom: string;
  email: string;
  role: 'admin' | 'user' | 'owner';
  created_at?: string;
  updated_at?: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister extends UserLogin {
  nom: string;
  prenom: string;
  role?: 'admin' | 'user' | 'owner';
}

export interface UserUpdate {
  nom?: string;
  prenom?: string;
  email?: string;
  password?: string;
  role?: 'admin' | 'user' | 'owner';
}

// Property related interfaces
export interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  type: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  workstations?: number;
  meeting_rooms?: number;
  rating: number;
  status: 'available' | 'booked' | 'maintenance';
  image_url: string; // Updated to match API response
  property_type: 'residential' | 'office';
  owner_id?: string;
  created_at?: string;
  updated_at?: string;
  // Office property amenities
  wifi?: boolean;
  parking?: boolean;
  coffee?: boolean;
  reception?: boolean;
  secured?: boolean;
  accessible?: boolean;
  printers?: boolean;
  kitchen?: boolean;
  flexible_hours?: boolean;
}

export interface PropertyCreate {
  title: string;
  address: string;
  price: number;
  type: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  workstations?: number;
  meeting_rooms?: number;
  rating: number;
  status?: 'available' | 'booked' | 'maintenance';
  property_type: 'residential' | 'office';
  owner_id?: string;
  // Amenities for office properties
  wifi?: boolean;
  parking?: boolean;
  coffee?: boolean;
  reception?: boolean;
  secured?: boolean;
  accessible?: boolean;
  printers?: boolean;
  kitchen?: boolean;
  flexible_hours?: boolean;
}

export interface PropertyUpdate {
  title?: string;
  address?: string;
  price?: number;
  type?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  workstations?: number;
  meeting_rooms?: number;
  rating?: number;
  status?: 'available' | 'booked' | 'maintenance';
  property_type?: 'residential' | 'office';
  owner_id?: string;
  // Amenities for office properties
  wifi?: boolean;
  parking?: boolean;
  coffee?: boolean;
  reception?: boolean;
  secured?: boolean;
  accessible?: boolean;
  printers?: boolean;
  kitchen?: boolean;
  flexible_hours?: boolean;
}

// API Error handling
export class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

// Helper method to handle API responses
const handleResponse = async (response: Response) => {
  const contentType = response.headers.get('content-type');
  
  if (!response.ok) {
    let errorMessage = `Erreur ${response.status}`;
    
    if (contentType && contentType.includes('application/json')) {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.errors?.[0]?.msg || errorMessage;
    }
    
    throw new ApiError(errorMessage, response.status);
  }
  
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  
  return { success: true };
};

// API service for user operations
export const userApi = {
  // Get all users
  getAllUsers: async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      credentials: 'include',
    });
    return handleResponse(response);
  },

  // Get user by ID
  getUserById: async (id: number): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      credentials: 'include',
    });
    return handleResponse(response);
  },

  // Register a new user
  register: async (userData: UserRegister) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(userData),
      });
      return handleResponse(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError("Erreur de connexion au serveur", 500);
    }
  },

  // Login
  login: async (credentials: UserLogin) => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  // Logout
  logout: async () => {
    const response = await fetch(`${API_BASE_URL}/users/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    return handleResponse(response);
  },

  // Get current user (me)
  getCurrentUser: async (): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      credentials: 'include',
    });
    return handleResponse(response);
  },

  // Update user
  updateUser: async (id: number, userData: UserUpdate) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  // Delete user
  deleteUser: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return handleResponse(response);
  },
};

// API service for property operations
export const propertyApi = {
  // Get all properties
  getAllProperties: async (): Promise<Property[]> => {
    const response = await fetch(`${API_BASE_URL}/properties`, {
      credentials: 'include',
    });
    const result = await handleResponse(response);
    return result.data || [];
  },

  // Get property by ID
  getPropertyById: async (id: string): Promise<Property> => {
    const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
      credentials: 'include',
    });
    const result = await handleResponse(response);
    return result.data;
  },

  // Create a new property with image upload
  createProperty: async (propertyData: PropertyCreate, imageFile: File): Promise<{id: string, image_url: string}> => {
    const formData = new FormData();
    
    // Add all property data to formData
    Object.entries(propertyData).forEach(([key, value]) => {
      if (value !== undefined) {
        // Convert boolean values to strings for FormData
        formData.append(key, value.toString());
      }
    });
    
    // Add image file
    formData.append('image', imageFile);
    
    const response = await fetch(`${API_BASE_URL}/properties`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
      // Note: Don't set Content-Type header when using FormData - browser will set it
    });
    
    const result = await handleResponse(response);
    return result.data;
  },

  // Update property with optional image upload
  updateProperty: async (id: string, propertyData: PropertyUpdate, imageFile?: File): Promise<{image_url?: string}> => {
    const formData = new FormData();
    
    // Add all property data to formData
    Object.entries(propertyData).forEach(([key, value]) => {
      if (value !== undefined) {
        // Convert boolean values to strings for FormData
        formData.append(key, value.toString());
      }
    });
    
    // Add image file if provided
    if (imageFile) {
      formData.append('image', imageFile);
    }
    
    const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
      method: 'PUT',
      credentials: 'include',
      body: formData,
      // Note: Don't set Content-Type header when using FormData - browser will set it
    });
    
    const result = await handleResponse(response);
    return result.data || {};
  },

  // Delete property
  deleteProperty: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return handleResponse(response);
  },

  // Update property status
  updatePropertyStatus: async (id: string, status: 'available' | 'booked' | 'maintenance') => {
    return propertyApi.updateProperty(id, { status });
  },
  
  // Helper function to map API response to PropertyData
  mapApiPropertyToOfficePropertyData: (property: Property): import('@/components/OfficePropertyCard').OfficePropertyData => {
    return {
      id: property.id,
      title: property.title,
      address: property.address,
      price: Number(property.price),
      type: property.type,
      workstations: property.workstations || 0,
      meetingRooms: property.meeting_rooms || 0,
      area: Number(property.area) || 0,
      rating: Number(property.rating),
      status: property.status,
      imageUrl: property.image_url,
      amenities: {
        wifi: property.wifi || false,
        parking: property.parking || false,
        coffee: property.coffee || false,
        reception: property.reception || false,
        secured: property.secured || false,
        accessible: property.accessible || false,
        printers: property.printers || false,
        kitchen: property.kitchen || false
      },
      flexibleHours: property.flexible_hours || false
    };
  },
  
  // Helper function to map API response to PropertyData
  mapApiPropertyToPropertyData: (property: Property): import('@/components/PropertyCard').PropertyData => {
    return {
      id: property.id,
      title: property.title,
      address: property.address,
      price: Number(property.price),
      type: property.type,
      bedrooms: property.bedrooms || 0,
      bathrooms: Number(property.bathrooms) || 0,
      area: Number(property.area) || 0,
      rating: Number(property.rating),
      status: property.status,
      imageUrl: property.image_url
    };
  }
};
