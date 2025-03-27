
const API_BASE_URL = 'http://localhost:3000/api';

// Interfaces based on your database schema
export interface User {
  user_id: number;
  nom: string;
  prenom: string;
  email: string;
  role: 'admin' | 'user';
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
  role?: 'admin' | 'user';
}

export interface UserUpdate {
  nom?: string;
  prenom?: string;
  email?: string;
  password?: string;
  role?: 'admin' | 'user';
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
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      errorData.message || `Erreur ${response.status}`,
      response.status
    );
  }
  return response.json();
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
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
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
