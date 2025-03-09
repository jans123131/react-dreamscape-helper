import api from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse | null> {
    try {
      const response = await api.post('/auth/login.php', credentials);
      
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('isAuthenticated', 'true');
        return response.data;
      }
      
      return null;
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  }

  getCurrentUser(): AuthResponse | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
}

export const authService = new AuthService();