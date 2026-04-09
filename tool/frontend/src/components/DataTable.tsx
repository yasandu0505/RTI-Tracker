import { Pencil, Trash2, Plus } from 'lucide-react';
import { Button } from './Button';
import { Pagination as PaginationComponent } from './Pagination';
import { TableProps } from '../types/table';

const TableHeader = ({ title, onAdd }: { title: string; onAdd: () => void }) => (
  <div className="p-3 border-b border-gray-200 bg-gray-50/50 flex items-center justify-between gap-3">
    <div className="font-semibold text-xs uppercase tracking-wider text-gray-500">{title} List</div>
    <Button onClick={onAdd} size="sm" className="flex items-center gap-2 whitespace-nowrap">
      <Plus className="w-4 h-4" /> New {title}
    </Button>
  </div>
);

export function DataTable<T>({
  title,
  onAdd,
  data,
  columns,
  onEdit,
  onDelete,
  loading,
  loadingMessage = "Loading...",
  emptyMessage = "No data found.",
  rowKey = 'id' as any,
  pagination,
  onPageChange
}: TableProps<T>) {
  
  const getKey = (item: T): string => {
    if (typeof rowKey === 'function') return rowKey(item);
    return (item as any)[rowKey] as string;
  };

  if (loading) {
    return (
      <div className="flex flex-col">
        {title && <TableHeader title={title} onAdd={onAdd!} />}
        <div className="p-10 text-center text-sm text-gray-500">{loadingMessage}</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col">
        {title && <TableHeader title={title} onAdd={onAdd!} />}
        <div className="p-10 text-center text-sm text-gray-500">{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {title && <TableHeader title={title} onAdd={onAdd!} />}
      
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-white">
            <tr className="text-left text-xs uppercase tracking-wider text-gray-500 border-b border-gray-100">
              {columns.map((col, i) => (
                <th key={i} className={`px-4 py-3 ${col.headerClassName || ''}`}>
                  {col.header}
                </th>
              ))}
              {(onEdit || onDelete) && <th className="px-4 py-3 w-[140px]">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((item) => (
              <tr key={getKey(item)} className="hover:bg-gray-50/50">
                {columns.map((col, i) => (
                  <td key={i} className={`px-4 py-3 ${col.className || ''}`}>
                    {col.accessor ? String((item as any)[col.accessor] || '-') : '-'}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {onEdit && (
                        <Button variant="outline" size="sm" className="px-2" onClick={() => onEdit(item)} title="Edit">
                          <Pencil className="w-4 h-4" />
                        </Button>
                      )}
                      {onDelete && (
                        <Button variant="danger" size="sm" className="px-2" onClick={() => onDelete(item)} title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && pagination.totalPages > 1 && onPageChange && (
        <div className="p-3 border-t border-gray-100 bg-gray-50/30">
          <PaginationComponent
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}
