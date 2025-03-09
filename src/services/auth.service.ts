
import { createData } from '../utils/api';

const ENDPOINT = '/auth';

export const AuthService = {
  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await createData(`${ENDPOINT}/login.php`, credentials);
      if (response.success) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
};
