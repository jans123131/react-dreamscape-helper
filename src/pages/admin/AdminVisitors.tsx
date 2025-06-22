import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DateFilter } from '@/components/admin/filters/DateFilter';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Users, 
  TrendingUp, 
  Calendar,
  Eye,
  Activity,
  Globe,
  Monitor,
  Smartphone,
  Filter
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

interface VisitorData {
  date: string;
  visitors: number;
}

interface DeviceData {
  device: string;
  sessions: number;
}

interface LocationData {
  country: string;
  visitors: number;
}

const AdminVisitors = () => {
  const { toast } = useToast();
  const [visitorsData, setVisitorsData] = useState<VisitorData[]>([]);
  const [deviceData, setDeviceData] = useState<DeviceData[]>([]);
  const [locationData, setLocationData] = useState<LocationData[]>([]);
  const [dateFilter, setDateFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const fetchVisitorsData = async () => {
    setLoading(true);
    try {
      // Fetch visitors data
      const visitorsResponse = await fetch('https://draminesaid.com/lucci/api/get_visitors_stats.php');
      const visitorsResult = await visitorsResponse.json();
      if (visitorsResult.success) {
        setVisitorsData(visitorsResult.data);
      } else {
        throw new Error(visitorsResult.message || 'Failed to fetch visitors data');
      }

      // Fetch device data
      const deviceResponse = await fetch('https://draminesaid.com/lucci/api/get_device_stats.php');
      const deviceResult = await deviceResponse.json();
      if (deviceResult.success) {
        setDeviceData(deviceResult.data);
      } else {
        throw new Error(deviceResult.message || 'Failed to fetch device data');
      }

      // Fetch location data
      const locationResponse = await fetch('https://draminesaid.com/lucci/api/get_location_stats.php');
      const locationResult = await locationResponse.json();
      if (locationResult.success) {
        setLocationData(locationResult.data);
      } else {
        throw new Error(locationResult.message || 'Failed to fetch location data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les données des visiteurs',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitorsData();
  }, []);

  const filteredVisitorsData = dateFilter === 'all'
    ? visitorsData
    : visitorsData.filter(data => {
        const dataDate = new Date(data.date);
        const today = new Date();

        switch (dateFilter) {
          case 'today':
            return dataDate.toDateString() === today.toDateString();
          case 'week':
            const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            return dataDate >= weekAgo && dataDate <= today;
          case 'month':
            return dataDate.getMonth() === today.getMonth() && dataDate.getFullYear() === today.getFullYear();
          case 'year':
            return dataDate.getFullYear() === today.getFullYear();
          default:
            return true;
        }
      });

  const totalVisitors = visitorsData.reduce((sum, data) => sum + data.visitors, 0);

  const deviceColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const locationColors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd'];

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p>Chargement des données des visiteurs...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-playfair font-bold text-gray-900">
                  Statistiques des Visiteurs
                </h1>
                <p className="text-gray-600 mt-1">
                  Analyse du trafic et comportement des visiteurs
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-900">
                  Total Visiteurs
                </CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900">{totalVisitors}</div>
                <p className="text-xs text-blue-600">
                  Nombre total de visiteurs
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-900">
                  Visiteurs Aujourd'hui
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-900">
                  {visitorsData.length > 0 ? visitorsData[visitorsData.length - 1].visitors : 0}
                </div>
                <p className="text-xs text-green-600">
                  Visiteurs uniques aujourd'hui
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-900">
                  Nouveaux ce Mois
                </CardTitle>
                <Calendar className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-900">
                  {visitorsData.filter(data => {
                    const dataDate = new Date(data.date);
                    const today = new Date();
                    return dataDate.getMonth() === today.getMonth() && dataDate.getFullYear() === today.getFullYear();
                  }).reduce((sum, data) => sum + data.visitors, 0)}
                </div>
                <p className="text-xs text-purple-600">
                  Visiteurs uniques ce mois-ci
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Data */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Visitors Over Time */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Visiteurs au fil du temps</CardTitle>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setShowFilters(!showFilters)}
                    className={showFilters ? 'bg-gray-100' : ''}
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                {showFilters && (
                  <DateFilter
                    value={dateFilter}
                    onValueChange={setDateFilter}
                  />
                )}
                <CardDescription>Nombre de visiteurs par jour</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={filteredVisitorsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="visitors" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Device Types */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Types d'appareils</CardTitle>
                <CardDescription>Répartition des visiteurs par type d'appareil</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={deviceData}
                      dataKey="sessions"
                      nameKey="device"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {
                        deviceData.map((entry, index) => <Cell key={`cell-${index}`} fill={deviceColors[index % deviceColors.length]} />)
                      }
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center mt-4">
                  {deviceData.map((item, index) => (
                    <div key={index} className="flex items-center mr-4">
                      {item.device === 'desktop' && <Monitor className="mr-2 h-4 w-4" />}
                      {item.device === 'mobile' && <Smartphone className="mr-2 h-4 w-4" />}
                      {item.device === 'other' && <Globe className="mr-2 h-4 w-4" />}
                      <span className="text-sm">{item.device}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Location Data */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Emplacements des visiteurs</CardTitle>
              <CardDescription>Répartition géographique des visiteurs</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={locationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="country" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="visitors" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminVisitors;
