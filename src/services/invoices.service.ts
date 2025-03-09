
import { fetchData, createData, updateData, deleteData } from '../utils/api';

const ENDPOINT = '/invoices';

export const InvoicesService = {
  getAllInvoices: async (userId?: string) => {
    const params = userId ? { user_id: userId } : {};
    return fetchData(`${ENDPOINT}/read.php`, params);
  },

  getInvoice: async (id: string) => {
    return fetchData(`${ENDPOINT}/read_one.php`, { id });
  },

  createInvoice: async (invoiceData: any) => {
    return createData(`${ENDPOINT}/create.php`, invoiceData);
  },

  updateInvoice: async (invoiceData: any) => {
    return updateData(`${ENDPOINT}/update.php`, invoiceData);
  },

  deleteInvoice: async (id: string) => {
    return deleteData(`${ENDPOINT}/delete.php`, id);
  }
};
