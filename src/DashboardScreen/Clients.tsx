import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

interface ClientsProps {
  user: any;
}

const Clients: React.FC<ClientsProps> = ({ user }) => {
  const clients = [
    { name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { name: 'Mike Johnson', email: 'mike@example.com', status: 'Active' },
  ];

  return (
    <div className="p-6 mt-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Clients</h2>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </div>
      
      <Card className="p-6 bg-dashboard-card">
        <div className="space-y-4">
          {clients.map((client, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-background/50">
              <div>
                <p className="font-medium">{client.name}</p>
                <p className="text-sm text-muted-foreground">{client.email}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                client.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
              }`}>
                {client.status}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Clients;