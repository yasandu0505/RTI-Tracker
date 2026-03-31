import { useParams, useNavigate } from 'react-router-dom';
import { mockRTIs, mockSenders, mockReceivers } from '../data/mockData';
import { StatusBadge } from '../components/StatusBadge';
import { Timeline } from '../components/Timeline';
import { Button } from '../components/Button';
import {
  ArrowLeft,
  Upload,
  FileText,
  AlertCircle,
  CheckCircle } from
'lucide-react';
export function RTIDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  // In a real app, fetch by ID. Using mock data here.
  const rti = mockRTIs.find((r) => r.id === id) || mockRTIs[0];
  const sender = mockSenders.find((s) => s.id === rti.senderId);
  const receiver = mockReceivers.find((r) => r.id === rti.receiverId);
  const renderStageAction = () => {
    switch (rti.status) {
      case 'Response Received':
        return (
          <div className="flex gap-3">
            <Button variant="danger" className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> Trigger Appeal
            </Button>
            <Button className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Mark as Completed
            </Button>
          </div>);

      case 'Waiting':
      case 'Sent':
        return <Button variant="outline">Log Response</Button>;
      case 'Appealed':
        return <Button variant="outline">Update Appeal Status</Button>;
      default:
        return null;
    }
  };
  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
        
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to List
      </button>

      {/* Header Banner */}
      <div className="bg-white border border-gray-200 rounded p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{rti.title}</h1>
            <StatusBadge status={rti.status} />
          </div>
          <p className="text-sm text-gray-500 font-mono">
            Ref: {rti.referenceId} • Last updated: {rti.lastUpdated}
          </p>
        </div>
        {renderStageAction()}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Details & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded p-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-3 mb-4">
              Request Details
            </h2>
            <p className="text-gray-700 text-sm mb-6">{rti.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Sender
                </span>
                <p className="text-sm font-medium text-gray-900">
                  {sender?.name}
                </p>
                <p className="text-xs text-gray-600">{sender?.email}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Receiver
                </span>
                <p className="text-sm font-medium text-gray-900">
                  {receiver?.institutionName}
                </p>
                <p className="text-xs text-gray-600">{receiver?.position}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded p-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-3 mb-6">
              Life-Cycle Timeline
            </h2>
            <Timeline events={rti.timeline} />
          </div>
        </div>

        {/* Right Column: Documents */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded p-6">
            <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Documents</h2>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1">
                
                <Upload className="w-3.5 h-3.5" /> Upload
              </Button>
            </div>

            {rti.documents.length > 0 ?
            <ul className="space-y-3">
                {rti.documents.map((doc, idx) =>
              <li
                key={idx}
                className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded">
                
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileText className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700 truncate">
                        {doc}
                      </span>
                    </div>
                    <Button
                  variant="outline"
                  size="sm"
                  className="ml-2 text-xs py-1 px-2">
                  
                      View
                    </Button>
                  </li>
              )}
              </ul> :

            <p className="text-sm text-gray-500 text-center py-4">
                No documents uploaded yet.
              </p>
            }
          </div>
        </div>
      </div>
    </div>);

}