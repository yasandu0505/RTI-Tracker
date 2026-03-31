import { useState } from 'react';
import { mockReceivers } from '../data/mockData';
import { Receiver } from '../types/rti';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
export function Receivers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReceiver, setSelectedReceiver] = useState<Receiver | null>(
    mockReceivers[0]
  );
  const filteredReceivers = mockReceivers.filter(
    (r) =>
    r.institutionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.position.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Receiver Directory</h1>
        <p className="text-sm text-gray-600 mt-1">
          Manage target institutions and public authorities.
        </p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 overflow-hidden">
        {/* Left Pane: List */}
        <div className="w-full md:w-1/3 flex flex-col bg-white border border-gray-200 rounded overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Search receivers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9" />
              
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredReceivers.map((receiver) =>
            <button
              key={receiver.id}
              onClick={() => setSelectedReceiver(receiver)}
              className={`w-full text-left p-4 border-b border-gray-200 transition-colors ${selectedReceiver?.id === receiver.id ? 'bg-blue-50 border-l-4 border-l-blue-900' : 'hover:bg-gray-50 border-l-4 border-l-transparent'}`}>
              
                <h3 className="font-medium text-gray-900">
                  {receiver.institutionName}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {receiver.position}
                </p>
              </button>
            )}
          </div>
        </div>

        {/* Right Pane: Details */}
        <div className="flex-1 bg-white border border-gray-200 rounded overflow-hidden flex flex-col">
          {selectedReceiver ?
          <>
              <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h2 className="font-semibold text-gray-900">
                  Receiver Details
                </h2>
                <div className="flex gap-2">
                  <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1">
                  
                    <Edit className="w-3.5 h-3.5" /> Edit
                  </Button>
                  <Button
                  variant="danger"
                  size="sm"
                  className="flex items-center gap-1">
                  
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </Button>
                  <Button size="sm" className="flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" /> Add New
                  </Button>
                </div>
              </div>
              <div className="p-6 space-y-6 overflow-y-auto">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {selectedReceiver.institutionName}
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    ID: {selectedReceiver.id}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Position/Title
                    </span>
                    <p className="text-sm text-gray-900">
                      {selectedReceiver.position}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Email
                    </span>
                    <p className="text-sm text-gray-900">
                      {selectedReceiver.email}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Department
                    </span>
                    <p className="text-sm text-gray-900">
                      {selectedReceiver.department}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Address
                    </span>
                    <p className="text-sm text-gray-900">
                      {selectedReceiver.address}
                    </p>
                  </div>
                </div>
              </div>
            </> :

          <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a receiver to view details
            </div>
          }
        </div>
      </div>
    </div>);

}