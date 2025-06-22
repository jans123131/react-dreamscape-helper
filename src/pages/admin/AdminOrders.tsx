
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DateFilter } from '@/components/admin/filters/DateFilter';
import { StatusFilter } from '@/components/admin/filters/StatusFilter';
import { SortableTableHead } from '@/components/ui/sortable-table-head';
import { useTableSort } from '@/hooks/useTableSort';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Package,
  Euro,
  Calendar,
  User,
  Download,
  Clock,
  Mail,
  Phone
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Order {
  id_order: number;
  numero_commande: string;
  total_order: number;
  status_order: string;
  date_creation_order: string;
  customer: {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    adresse: string;
  };
}

interface PaginationInfo {
  current_page: number;
  total_pages: number;
  total_records: number;
  per_page: number;
  has_next: boolean;
  has_prev: boolean;
}

const AdminOrders = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const statusOptions = [
    { value: 'pending', label: 'En attente' },
    { value: 'processing', label: 'En traitement' },
    { value: 'shipped', label: 'Expédiée' },
    { value: 'delivered', label: 'Livrée' },
    { value: 'cancelled', label: 'Annulée' },
  ];

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20',
        search: searchTerm,
        status: statusFilter,
        date: dateFilter
      });

      const response = await fetch(`https://draminesaid.com/lucci/api/get_all_orders.php?${params}`);
      const result = await response.json();

      if (result.success) {
        // Process orders data to ensure proper structure and number conversion
        const processedOrders = result.data.map((order: any) => ({
          id_order: order.id_order,
          numero_commande: order.numero_commande,
          total_order: parseFloat(order.total_order) || 0,
          status_order: order.status_order,
          date_creation_order: order.date_creation_order,
          customer: order.customer || {
            nom: order.nom_customer || '',
            prenom: order.prenom_customer || '',
            email: order.email_customer || '',
            telephone: order.telephone_customer || '',
            adresse: order.adresse_customer || ''
          }
        }));
        
        setOrders(processedOrders);
        setPagination({
          current_page: currentPage,
          total_pages: Math.ceil((result.total || processedOrders.length) / 20),
          total_records: result.total || processedOrders.length,
          per_page: 20,
          has_next: currentPage < Math.ceil((result.total || processedOrders.length) / 20),
          has_prev: currentPage > 1
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les commandes',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, searchTerm, statusFilter, dateFilter]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleDateChange = (value: string) => {
    setDateFilter(value);
    setCurrentPage(1);
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const { sortedData: sortedOrders, sortConfig, requestSort } = useTableSort(orders, 'date_creation_order');

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { label: 'En attente', variant: 'secondary' as const },
      processing: { label: 'En traitement', variant: 'default' as const },
      shipped: { label: 'Expédiée', variant: 'default' as const },
      delivered: { label: 'Livrée', variant: 'default' as const },
      cancelled: { label: 'Annulée', variant: 'destructive' as const },
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || { label: status, variant: 'secondary' as const };
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  // Calculate total revenue safely
  const totalRevenue = orders.reduce((acc, order) => {
    const orderTotal = parseFloat(String(order.total_order)) || 0;
    return acc + orderTotal;
  }, 0);

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-playfair font-bold text-gray-900 flex items-center">
                  <Package className="mr-3 h-8 w-8 text-gray-700" />
                  Commandes
                </h1>
                <p className="text-gray-600 mt-2">
                  Gérez les commandes des clients LUCCI BY E.Y
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button className="bg-gray-900 hover:bg-gray-800">
                  <Download className="mr-2 h-4 w-4" />
                  Exporter
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-900">Total Commandes</CardTitle>
                <Package className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-900 mb-1">{pagination?.total_records || 0}</div>
                <div className="flex items-center text-xs text-blue-700">
                  <Package className="h-3 w-3 mr-1" />
                  Toutes les commandes
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-900">Chiffre d'affaires Total</CardTitle>
                <Euro className="h-5 w-5 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-900 mb-1">
                  €{totalRevenue.toFixed(2)}
                </div>
                <div className="flex items-center text-xs text-green-700">
                  <Euro className="h-3 w-3 mr-1" />
                  Revenu total
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-orange-900">Commandes en cours</CardTitle>
                <Clock className="h-5 w-5 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-900 mb-1">
                  {orders.filter(order => order.status_order !== 'delivered' && order.status_order !== 'cancelled').length}
                </div>
                <div className="flex items-center text-xs text-orange-700">
                  <Clock className="h-3 w-3 mr-1" />
                  Commandes à traiter
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Orders Table */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div>
                  <CardTitle className="font-playfair text-gray-900 flex items-center">
                    <Package className="mr-2 h-5 w-5" />
                    Commandes des Clients
                  </CardTitle>
                  <CardDescription>
                    Liste de toutes les commandes des clients
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-none min-w-[200px]">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher par numéro de commande, nom du client..."
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setShowFilters(!showFilters)}
                    className={showFilters ? 'bg-gray-100' : ''}
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {showFilters && (
                <div className="flex flex-wrap gap-2 pt-4 border-t">
                  <StatusFilter
                    value={statusFilter}
                    onValueChange={handleStatusChange}
                    options={statusOptions}
                    placeholder="Filtrer par statut"
                  />
                  <DateFilter
                    value={dateFilter}
                    onValueChange={handleDateChange}
                  />
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <SortableTableHead 
                        sortKey="numero_commande" 
                        sortConfig={sortConfig} 
                        onSort={requestSort}
                      >
                        Commande
                      </SortableTableHead>
                      <SortableTableHead 
                        sortKey="customer.nom" 
                        sortConfig={sortConfig} 
                        onSort={requestSort}
                      >
                        Client
                      </SortableTableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Téléphone</TableHead>
                      <TableHead>Adresse</TableHead>
                      <SortableTableHead 
                        sortKey="total_order" 
                        sortConfig={sortConfig} 
                        onSort={requestSort}
                      >
                        Total
                      </SortableTableHead>
                      <TableHead>Statut</TableHead>
                      <SortableTableHead 
                        sortKey="date_creation_order" 
                        sortConfig={sortConfig} 
                        onSort={requestSort}
                      >
                        Date
                      </SortableTableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-8">
                          Chargement...
                        </TableCell>
                      </TableRow>
                    ) : orders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-8">
                          Aucune commande trouvée
                        </TableCell>
                      </TableRow>
                    ) : (
                      sortedOrders.map((order) => (
                        <TableRow key={order.id_order}>
                          <TableCell className="font-medium">{order.numero_commande}</TableCell>
                          <TableCell>{`${order.customer.prenom} ${order.customer.nom}`}</TableCell>
                          <TableCell>{order.customer.email}</TableCell>
                          <TableCell>{order.customer.telephone}</TableCell>
                          <TableCell>{order.customer.adresse}</TableCell>
                          <TableCell>€{parseFloat(String(order.total_order)).toFixed(2)}</TableCell>
                          <TableCell>{getStatusBadge(order.status_order)}</TableCell>
                          <TableCell>
                            {format(new Date(order.date_creation_order), 'dd/MM/yyyy HH:mm', { locale: fr })}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewOrder(order)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {pagination && pagination.total_pages > 1 && (
                <div className="flex items-center justify-between space-x-2 py-4">
                  <div className="text-sm text-muted-foreground">
                    Page {pagination.current_page} sur {pagination.total_pages} ({pagination.total_records} commandes)
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={!pagination.has_prev}
                    >
                      Précédent
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => prev + 1)}
                      disabled={!pagination.has_next}
                    >
                      Suivant
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Order Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Commande N° {selectedOrder?.numero_commande}
            </DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <User className="h-4 w-4" />
                    Nom du client
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {`${selectedOrder.customer.prenom} ${selectedOrder.customer.nom}`}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Mail className="h-4 w-4" />
                    Email
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedOrder.customer.email}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Phone className="h-4 w-4" />
                    Téléphone
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedOrder.customer.telephone}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Calendar className="h-4 w-4" />
                    Date de création
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(selectedOrder.date_creation_order), 'dd/MM/yyyy à HH:mm', { locale: fr })}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Euro className="h-4 w-4" />
                    Total
                  </div>
                  <p className="text-sm text-muted-foreground">
                    €{parseFloat(String(selectedOrder.total_order)).toFixed(2)}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Package className="h-4 w-4" />
                    Statut
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {getStatusBadge(selectedOrder.status_order)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminOrders;
