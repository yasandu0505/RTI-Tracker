import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from '../components/Table';
import { StatusBadge } from '../components/StatusBadge';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { mockRTIs } from '../data/mockData';
import { Plus, Search } from 'lucide-react';
export function Dashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const filteredRTIs = mockRTIs.filter((rti) => {
    const matchesSearch =
    rti.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rti.referenceId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? rti.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });
  const columns = [
  {
    header: 'Reference ID',
    accessor: 'referenceId',
    cell: (item: any) =>
    <span className="font-mono text-xs text-gray-600">
          {item.referenceId}
        </span>

  },
  {
    header: 'Title',
    accessor: 'title',
    cell: (item: any) =>
    <span className="font-medium text-gray-900">{item.title}</span>

  },
  {
    header: 'Status',
    accessor: 'status',
    cell: (item: any) => <StatusBadge status={item.status} />
  },
  {
    header: 'Last Updated',
    accessor: 'lastUpdated',
    cell: (item: any) =>
    <span className="text-gray-600">{item.lastUpdated}</span>

  },
  {
    header: 'Actions',
    accessor: 'actions',
    cell: (item: any) =>
    <Button
      variant="outline"
      size="sm"
      onClick={() => navigate(`/rtis/${item.id}`)}>
      
          Quick View
        </Button>

  }];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Global Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">
            Command center for all active RTI requests.
          </p>
        </div>
        <Button
          onClick={() => navigate('/create')}
          className="flex items-center gap-2">
          
          <Plus className="w-4 h-4" />
          New Request
        </Button>
      </div>

      <div className="bg-white p-4 border border-gray-200 rounded flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Search by Title or Ref ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9" />
            
          </div>
        </div>
        <div className="w-full sm:w-64">
          <Select
            options={[
            {
              value: 'Waiting',
              label: 'Waiting'
            },
            {
              value: 'Sent',
              label: 'Sent'
            },
            {
              value: 'Response Received',
              label: 'Response Received'
            },
            {
              value: 'Appealed',
              label: 'Appealed'
            },
            {
              value: 'Approved',
              label: 'Approved'
            },
            {
              value: 'Completed',
              label: 'Completed'
            }]
            }
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)} />
          
        </div>
        <Button
          variant="secondary"
          onClick={() => {
            setSearchTerm('');
            setStatusFilter('');
          }}>
          
          Clear
        </Button>
      </div>

      <Table
        columns={columns}
        data={filteredRTIs}
        keyExtractor={(item) => item.id} />
      
    </div>);

}