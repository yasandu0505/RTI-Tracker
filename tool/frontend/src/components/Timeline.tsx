import { TimelineEvent } from '../types/rti';
import { StatusBadge } from './StatusBadge';
import { FileCode } from 'lucide-react';
interface TimelineProps {
  events: TimelineEvent[];
}
export function Timeline({ events }: TimelineProps) {
  // Sort events by date descending for display
  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return (
    <div className="relative border-l border-gray-200 ml-3 space-y-8 py-4">
      {sortedEvents.map((event, index) =>
      <div key={event.id} className="relative pl-6">
          {/* Timeline dot */}
          <span className="absolute -left-1.5 top-1.5 w-3 h-3 bg-white border-2 border-blue-900 rounded-full"></span>

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-1">
            <div className="flex items-center gap-3">
              <StatusBadge status={event.status} />
              <span className="text-sm text-gray-500 font-medium">
                {event.date}
              </span>
            </div>

            {event.sourceLink &&
          <a
            href={event.sourceLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs text-blue-900 hover:underline">
            
                <FileCode className="w-3.5 h-3.5 mr-1" />
                Source
              </a>
          }
          </div>

          <p className="text-sm text-gray-700 mt-2 bg-gray-50 p-3 border border-gray-200 rounded">
            {event.description}
          </p>
        </div>
      )}
    </div>);

}