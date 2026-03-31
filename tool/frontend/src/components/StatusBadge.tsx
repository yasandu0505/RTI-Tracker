
import { RTIStatus } from '../types/rti';
interface StatusBadgeProps {
  status: RTIStatus | 'Creation';
  className?: string;
}
export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  let colorStyles = '';
  switch (status) {
    case 'Waiting':
      colorStyles = 'bg-yellow-50 text-yellow-800 border-yellow-200';
      break;
    case 'Sent':
      colorStyles = 'bg-blue-50 text-blue-800 border-blue-200';
      break;
    case 'Response Received':
      colorStyles = 'bg-purple-50 text-purple-800 border-purple-200';
      break;
    case 'Appealed':
      colorStyles = 'bg-orange-50 text-orange-800 border-orange-200';
      break;
    case 'Approved':
      colorStyles = 'bg-green-50 text-green-800 border-green-200';
      break;
    case 'Completed':
      colorStyles = 'bg-gray-100 text-gray-800 border-gray-300';
      break;
    case 'Creation':
      colorStyles = 'bg-gray-50 text-gray-600 border-gray-200';
      break;
    default:
      colorStyles = 'bg-gray-50 text-gray-800 border-gray-200';
  }
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border ${colorStyles} ${className}`}>
      
      {status}
    </span>);

}