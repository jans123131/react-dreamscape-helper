import { PasswordEntry } from '../types';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

class PasswordsService {
  private readonly STORAGE_KEY = 'passwords';

  async getPasswords(): Promise<PasswordEntry[]> {
    return getFromLocalStorage<PasswordEntry[]>(this.STORAGE_KEY, []);
  }

  async getPassword(id: number): Promise<PasswordEntry | undefined> {
    const passwords = await this.getPasswords();
    return passwords.find(pwd => pwd.id === id);
  }

  async createPassword(passwordData: Omit<PasswordEntry, 'id' | 'created_at' | 'updated_at'>): Promise<PasswordEntry> {
    const passwords = await this.getPasswords();
    
    const newPassword: PasswordEntry = {
      ...passwordData,
      id: Math.max(0, ...passwords.map(p => p.id)) + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    passwords.push(newPassword);
    saveToLocalStorage(this.STORAGE_KEY, passwords);
    
    return newPassword;
  }

  async updatePassword(id: number, passwordData: Partial<PasswordEntry>): Promise<PasswordEntry | null> {
    const passwords = await this.getPasswords();
    const index = passwords.findIndex(pwd => pwd.id === id);
    
    if (index === -1) return null;
    
    const updatedPassword: PasswordEntry = {
      ...passwords[index],
      ...passwordData,
      updated_at: new Date().toISOString()
    };

    passwords[index] = updatedPassword;
    saveToLocalStorage(this.STORAGE_KEY, passwords);
    
    return updatedPassword;
  }

  async deletePassword(id: number): Promise<boolean> {
    const passwords = await this.getPasswords();
    const filteredPasswords = passwords.filter(pwd => pwd.id !== id);
    
    if (filteredPasswords.length === passwords.length) return false;
    
    saveToLocalStorage(this.STORAGE_KEY, filteredPasswords);
    return true;
  }
}

export const passwordsService = new PasswordsService();