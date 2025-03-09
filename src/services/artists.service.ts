
import { fetchData, createData, updateData, deleteData } from '../utils/api';

const ENDPOINT = '/artists';

export const ArtistsService = {
  getAllArtists: async (userId?: string) => {
    const params = userId ? { user_id: userId } : {};
    return fetchData(`${ENDPOINT}/read.php`, params);
  },

  getArtist: async (id: string) => {
    return fetchData(`${ENDPOINT}/read_one.php`, { id });
  },

  createArtist: async (artistData: any) => {
    return createData(`${ENDPOINT}/create.php`, artistData);
  },

  updateArtist: async (artistData: any) => {
    return updateData(`${ENDPOINT}/update.php`, artistData);
  },

  deleteArtist: async (id: string) => {
    return deleteData(`${ENDPOINT}/delete.php`, id);
  }
};
