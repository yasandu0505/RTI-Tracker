export type RTIStatus =
'Waiting' |
'Sent' |
'Response Received' |
'Appealed' |
'Approved' |
'Completed';

export interface Sender {
  id: string;
  name: string;
  email: string;
  contactPerson: string;
  department: string;
  address: string;
}

export interface Receiver {
  id: string;
  institutionName: string;
  position: string;
  email: string;
  department: string;
  address: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  content: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  status: RTIStatus | 'Creation';
  description: string;
  sourceLink?: string;
}

export interface RTIRequest {
  id: string;
  referenceId: string;
  title: string;
  description: string;
  status: RTIStatus;
  lastUpdated: string;
  senderId: string;
  receiverId: string;
  templateId: string;
  timeline: TimelineEvent[];
  documents: string[];
}