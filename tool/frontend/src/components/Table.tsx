
interface Column {
  header: string;
  accessor: string;
  cell?: (item: any) => React.ReactNode;
}
interface TableProps {
  columns: Column[];
  data: any[];
  keyExtractor: (item: any) => string;
}
export function Table({ columns, data, keyExtractor }: TableProps) {
  return (
    <div className="w-full overflow-x-auto border border-gray-200 rounded bg-white">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {columns.map((col, idx) =>
            <th
              key={idx}
              className="p-3 font-medium text-gray-700 border-r border-gray-200 last:border-r-0">
              
                {col.header}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ?
          <tr>
              <td
              colSpan={columns.length}
              className="p-6 text-center text-gray-500">
              
                No data available
              </td>
            </tr> :

          data.map((item) =>
          <tr
            key={keyExtractor(item)}
            className="border-b border-gray-200 last:border-b-0">
            
                {columns.map((col, idx) =>
            <td
              key={idx}
              className="p-3 text-gray-900 border-r border-gray-200 last:border-r-0 align-middle">
              
                    {col.cell ? col.cell(item) : item[col.accessor]}
                  </td>
            )}
              </tr>
          )
          }
        </tbody>
      </table>
    </div>);

}