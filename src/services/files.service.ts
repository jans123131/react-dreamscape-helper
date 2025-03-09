
import { fetchData, createData, deleteData } from '../utils/api';

const ENDPOINT = '/files';

export const FilesService = {
  getAllFiles: async (userId?: string) => {
    const params = userId ? { user_id: userId } : {};
    return fetchData(`${ENDPOINT}/read.php`, params);
  },

  uploadFile: async (fileData: FormData) => {
    // Use specific FormData content-type handling
    return createData(`${ENDPOINT}/create.php`, fileData, true);
  },

  deleteFile: async (id: string) => {
    return deleteData(`${ENDPOINT}/delete.php`, id);
  }
};
