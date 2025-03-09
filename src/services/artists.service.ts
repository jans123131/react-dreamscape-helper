import { Artist } from '../types';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

class ArtistsService {
  private readonly STORAGE_KEY = 'artists';

  async getArtists(): Promise<Artist[]> {
    return getFromLocalStorage<Artist[]>(this.STORAGE_KEY, []);
  }

  async getArtist(id: number): Promise<Artist | undefined> {
    const artists = await this.getArtists();
    return artists.find(artist => artist.id === id);
  }

  async createArtist(artistData: Omit<Artist, 'id' | 'created_at' | 'updated_at'>): Promise<Artist> {
    const artists = await this.getArtists();
    
    const newArtist: Artist = {
      ...artistData,
      id: Math.max(0, ...artists.map(a => a.id)) + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    artists.push(newArtist);
    saveToLocalStorage(this.STORAGE_KEY, artists);
    
    return newArtist;
  }

  async updateArtist(id: number, artistData: Partial<Artist>): Promise<Artist | null> {
    const artists = await this.getArtists();
    const index = artists.findIndex(artist => artist.id === id);
    
    if (index === -1) return null;
    
    const updatedArtist: Artist = {
      ...artists[index],
      ...artistData,
      updated_at: new Date().toISOString()
    };

    artists[index] = updatedArtist;
    saveToLocalStorage(this.STORAGE_KEY, artists);
    
    return updatedArtist;
  }

  async deleteArtist(id: number): Promise<boolean> {
    const artists = await this.getArtists();
    const filteredArtists = artists.filter(artist => artist.id !== id);
    
    if (filteredArtists.length === artists.length) return false;
    
    saveToLocalStorage(this.STORAGE_KEY, filteredArtists);
    return true;
  }
}

export const artistsService = new ArtistsService();