import { RTIRequest, Sender, Receiver, Template } from '../types/rti';

export const mockSenders: Sender[] = [
{
  id: 's1',
  name: 'Open Data Initiative',
  email: 'contact@opendatainitiative.org',
  contactPerson: 'Jane Doe',
  department: 'Legal',
  address: '123 Transparency Blvd, Suite 400, Capital City'
},
{
  id: 's2',
  name: 'Citizens for Justice',
  email: 'info@citizensjustice.org',
  contactPerson: 'John Smith',
  department: 'Advocacy',
  address: '456 Civic Square, Metropolis'
}];


export const mockReceivers: Receiver[] = [
{
  id: 'r1',
  institutionName: 'Ministry of Environment',
  position: 'Information Officer',
  email: 'rti@environment.gov',
  department: 'Public Records',
  address: '789 Government Parkway, Capital City'
},
{
  id: 'r2',
  institutionName: 'City Police Department',
  position: 'Chief Records Officer',
  email: 'records@citypolice.gov',
  department: 'Internal Affairs',
  address: '101 Law Enforcement Way, Metropolis'
}];


export const mockTemplates: Template[] = [
{
  id: 't1',
  name: 'Standard Environmental Data Request',
  description: 'Used for requesting pollution and emission data.',
  content:
  '# Right to Information Request\n\n**Date:** {{date}}\n**To:** {{receiver_name}}, {{receiver_position}}\n**From:** {{sender_name}}\n\nI am writing to request information under the Right to Information Act regarding environmental data...'
},
{
  id: 't2',
  name: 'Budget Allocation Inquiry',
  description: 'Used for requesting departmental budget details.',
  content:
  '# Right to Information Request\n\n**Date:** {{date}}\n**To:** {{receiver_name}}, {{receiver_position}}\n**From:** {{sender_name}}\n\nPlease provide the detailed budget allocation for the fiscal year...'
}];


export const mockRTIs: RTIRequest[] = [
{
  id: 'rti-001',
  referenceId: 'REF-2023-001',
  title: 'Water Quality Report 2023',
  description:
  'Requesting the detailed water quality analysis for the metropolitan area.',
  status: 'Sent',
  lastUpdated: '2023-10-15',
  senderId: 's1',
  receiverId: 'r1',
  templateId: 't1',
  documents: ['initial_request.pdf'],
  timeline: [
  {
    id: 'tl-1',
    date: '2023-10-10',
    status: 'Creation',
    description: 'Draft created and approved internally.',
    sourceLink: 'https://github.com/org/repo/blob/main/drafts/rti-001.md'
  },
  {
    id: 'tl-2',
    date: '2023-10-15',
    status: 'Sent',
    description: 'Officially dispatched via registered email.',
    sourceLink: 'https://github.com/org/repo/blob/main/sent/rti-001.md'
  }]

},
{
  id: 'rti-002',
  referenceId: 'REF-2023-002',
  title: 'Police Procurement Budget',
  description: 'Inquiry regarding the procurement budget for new vehicles.',
  status: 'Appealed',
  lastUpdated: '2023-11-02',
  senderId: 's2',
  receiverId: 'r2',
  templateId: 't2',
  documents: [
  'initial_request.pdf',
  'rejection_letter.pdf',
  'appeal_form.pdf'],

  timeline: [
  {
    id: 'tl-3',
    date: '2023-09-01',
    status: 'Creation',
    description: 'Draft created.'
  },
  {
    id: 'tl-4',
    date: '2023-09-05',
    status: 'Sent',
    description: 'Dispatched to Police HQ.'
  },
  {
    id: 'tl-5',
    date: '2023-10-01',
    status: 'Response Received',
    description: 'Request denied citing security concerns.'
  },
  {
    id: 'tl-6',
    date: '2023-11-02',
    status: 'Appealed',
    description: 'First appeal filed with the Information Commission.'
  }]

},
{
  id: 'rti-003',
  referenceId: 'REF-2023-003',
  title: 'Public Park Maintenance Contracts',
  description:
  'Requesting copies of all maintenance contracts for City Park.',
  status: 'Completed',
  lastUpdated: '2023-08-20',
  senderId: 's1',
  receiverId: 'r1',
  templateId: 't2',
  documents: ['request.pdf', 'contracts_bundle.pdf'],
  timeline: [
  {
    id: 'tl-7',
    date: '2023-07-10',
    status: 'Creation',
    description: 'Draft created.'
  },
  {
    id: 'tl-8',
    date: '2023-07-12',
    status: 'Sent',
    description: 'Dispatched.'
  },
  {
    id: 'tl-9',
    date: '2023-08-20',
    status: 'Completed',
    description: 'Data received and verified.'
  }]

}];