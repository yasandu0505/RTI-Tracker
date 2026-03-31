import { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { mockTemplates, mockSenders, mockReceivers } from '../data/mockData';
import { FileText, ArrowRight, Save, Send } from 'lucide-react';
export function CreateRTI() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    templateId: '',
    title: '',
    description: '',
    senderId: '',
    receiverId: '',
    content: ''
  });
  const handleTemplateSelect = (templateId: string, content: string) => {
    setFormData({
      ...formData,
      templateId,
      content
    });
    setStep(2);
  };
  const renderStepIndicator = () =>
  <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((num) =>
    <Fragment key={num}>
          <div
        className={`
            w-8 h-8 rounded flex items-center justify-center text-sm font-bold border
            ${step === num ? 'bg-blue-900 text-white border-blue-900' : step > num ? 'bg-blue-50 text-blue-900 border-blue-200' : 'bg-white text-gray-400 border-gray-200'}
          `}>
        
            {num}
          </div>
          {num < 3 &&
      <div
        className={`w-16 h-px ${step > num ? 'bg-blue-900' : 'bg-gray-200'}`} />

      }
        </Fragment>
    )}
    </div>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Create New RTI Request
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Follow the steps to generate and dispatch a new request.
        </p>
      </div>

      {renderStepIndicator()}

      {step === 1 &&
      <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Step 1: Select Template
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockTemplates.map((template) =>
          <div
            key={template.id}
            className="bg-white border border-gray-200 rounded p-5 flex flex-col">
            
                <div className="flex items-start gap-3 mb-3">
                  <FileText className="w-5 h-5 text-blue-900 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {template.description}
                    </p>
                  </div>
                </div>
                <div className="mt-auto pt-4">
                  <Button
                variant="outline"
                fullWidth
                onClick={() =>
                handleTemplateSelect(template.id, template.content)
                }>
                
                    Select Template
                  </Button>
                </div>
              </div>
          )}
          </div>
        </div>
      }

      {step === 2 &&
      <div className="bg-white border border-gray-200 rounded p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Step 2: Data Entry
          </h2>

          <div className="space-y-4">
            <Input
            label="Request Title"
            placeholder="e.g., Annual Budget Report 2023"
            value={formData.title}
            onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value
            })
            } />
          

            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
              className="px-3 py-2 bg-white border border-gray-200 rounded text-sm text-gray-900 focus:outline-none focus:border-blue-900 min-h-[100px]"
              placeholder="Brief description of the request purpose..."
              value={formData.description}
              onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value
              })
              } />
            
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
              label="Sender (Applicant)"
              options={mockSenders.map((s) => ({
                value: s.id,
                label: s.name
              }))}
              value={formData.senderId}
              onChange={(e) =>
              setFormData({
                ...formData,
                senderId: e.target.value
              })
              } />
            
              <Select
              label="Receiver (Institution)"
              options={mockReceivers.map((r) => ({
                value: r.id,
                label: `${r.institutionName} - ${r.position}`
              }))}
              value={formData.receiverId}
              onChange={(e) =>
              setFormData({
                ...formData,
                receiverId: e.target.value
              })
              } />
            
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-gray-200">
            <Button variant="secondary" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button
            onClick={() => setStep(3)}
            className="flex items-center gap-2">
            
              Continue to Preview <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      }

      {step === 3 &&
      <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Step 3: Document Preview
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[500px]">
            {/* Editor */}
            <div className="flex flex-col bg-white border border-gray-200 rounded overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 text-sm font-medium text-gray-700">
                Markdown Editor
              </div>
              <textarea
              className="flex-1 p-4 text-sm font-mono text-gray-800 focus:outline-none resize-none"
              value={formData.content}
              onChange={(e) =>
              setFormData({
                ...formData,
                content: e.target.value
              })
              } />
            
            </div>

            {/* Preview */}
            <div className="flex flex-col bg-white border border-gray-200 rounded overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 text-sm font-medium text-gray-700">
                Live HTML Preview
              </div>
              <div className="flex-1 p-6 overflow-y-auto prose prose-sm max-w-none">
                {/* Simple mock rendering for demo purposes */}
                <div className="whitespace-pre-wrap font-serif text-gray-900">
                  {formData.content.
                replace('# Right to Information Request', '').
                replace('{{date}}', new Date().toLocaleDateString()).
                replace(
                  '{{receiver_name}}',
                  mockReceivers.find((r) => r.id === formData.receiverId)?.
                  institutionName || '[Receiver]'
                ).
                replace(
                  '{{receiver_position}}',
                  mockReceivers.find((r) => r.id === formData.receiverId)?.
                  position || '[Position]'
                ).
                replace(
                  '{{sender_name}}',
                  mockSenders.find((s) => s.id === formData.senderId)?.
                  name || '[Sender]'
                )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="secondary" onClick={() => setStep(2)}>
              Back
            </Button>
            <div className="flex gap-3">
              <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="flex items-center gap-2">
              
                <Save className="w-4 h-4" /> Save Draft
              </Button>
              <Button
              onClick={() => navigate('/')}
              className="flex items-center gap-2">
              
                <Send className="w-4 h-4" /> Request Approval
              </Button>
            </div>
          </div>
        </div>
      }
    </div>);

}