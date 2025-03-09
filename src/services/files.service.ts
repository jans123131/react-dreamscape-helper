
import { fetchData, createData, deleteData } from '../utils/api';

const ENDPOINT = '/files';

export const FilesService = {
  getAllFiles: async (userId?: string) => {
    const params = userId ? { user_id: userId } : {};
    return fetchData(`${ENDPOINT}/read.php`, params);
  },

  uploadFile: async (fileData: FormData) => {
    return createData(`${ENDPOINT}/create.php`, fileData);
  },

  deleteFile: async (id: string) => {
    return deleteData(`${ENDPOINT}/delete.php`, id);
  }
};
