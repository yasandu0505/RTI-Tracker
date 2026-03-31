import { useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { mockRTIs, mockSenders, mockReceivers } from '../data/mockData';
import { ShieldCheck, FileSignature, Upload } from 'lucide-react';
export function ApprovalPortal() {
  const [signature, setSignature] = useState('');
  const [isApproved, setIsApproved] = useState(false);
  // Using mock data for demo
  const rti = mockRTIs[0];
  const sender = mockSenders.find((s) => s.id === rti.senderId);
  const receiver = mockReceivers.find((r) => r.id === rti.receiverId);
  const handleApprove = () => {
    if (signature) {
      setIsApproved(true);
    }
  };
  if (isApproved) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mb-4">
          <ShieldCheck className="w-8 h-8 text-green-700" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Document Approved</h1>
        <p className="text-gray-600 max-w-md">
          The RTI request has been digitally signed and approved. It will now be
          dispatched to the receiver.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => setIsApproved(false)}>
          
          Return to Portal
        </Button>
      </div>);

  }
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            External Approval Portal
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Review and digitally sign the outgoing request.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm font-medium text-gray-700">
          <ShieldCheck className="w-4 h-4 text-blue-900" />
          Verified by Asgardio
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Document View */}
        <div className="flex-1 bg-white border border-gray-200 rounded overflow-hidden flex flex-col">
          <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex justify-between items-center">
            <span className="font-medium text-sm text-gray-700">
              Document Preview: {rti.title}
            </span>
            <span className="text-xs text-gray-500 font-mono">
              Ref: {rti.referenceId}
            </span>
          </div>
          <div className="p-8 flex-1 overflow-y-auto bg-white min-h-[500px]">
            <div className="max-w-2xl mx-auto font-serif text-gray-900 space-y-6">
              <h2 className="text-xl font-bold text-center mb-8">
                Right to Information Request
              </h2>

              <div className="space-y-1">
                <p>
                  <strong>Date:</strong> {new Date().toLocaleDateString()}
                </p>
                <p>
                  <strong>To:</strong> {receiver?.institutionName},{' '}
                  {receiver?.position}
                </p>
                <p>
                  <strong>From:</strong> {sender?.name}
                </p>
              </div>

              <div className="pt-4">
                <p className="whitespace-pre-wrap leading-relaxed">
                  I am writing to request information under the Right to
                  Information Act regarding environmental data. Specifically, we
                  require the detailed water quality analysis for the
                  metropolitan area for the year 2023. Please provide the data
                  in an open, machine-readable format (e.g., CSV or JSON) as per
                  the Open-Data Protocol.
                </p>
              </div>

              <div className="pt-12 space-y-8">
                <p>Sincerely,</p>
                <div className="w-48 h-px bg-gray-300"></div>
                <p>
                  {sender?.contactPerson}
                  <br />
                  {sender?.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Action Area */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          <div className="bg-white border border-gray-200 rounded p-5 space-y-4">
            <h3 className="font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Request Summary
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-500 block text-xs">Title</span>
                <span className="font-medium text-gray-900">{rti.title}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-xs">Sender</span>
                <span className="text-gray-900">{sender?.name}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-xs">Receiver</span>
                <span className="text-gray-900">
                  {receiver?.institutionName}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded p-5 space-y-4">
            <h3 className="font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-2">
              <FileSignature className="w-4 h-4" /> Sign & Approve
            </h3>

            <div className="space-y-4">
              <Input
                label="Digital Signature (Type Full Name)"
                placeholder="John Doe"
                value={signature}
                onChange={(e) => setSignature(e.target.value)} />
              

              <div className="relative">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true">
                  
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-2 text-xs text-gray-500">
                    OR
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                fullWidth
                className="flex items-center justify-center gap-2">
                
                <Upload className="w-4 h-4" /> Upload GPG Key
              </Button>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-200">
              <Button
                fullWidth
                className="bg-green-700 hover:bg-green-800 border-green-700 text-white"
                disabled={!signature}
                onClick={handleApprove}>
                
                Sign & Approve Document
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>);

}