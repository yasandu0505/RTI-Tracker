
interface SelectOption {
  value: string;
  label: string;
}
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}
export function Select({
  label,
  options,
  error,
  className = '',
  id,
  ...props
}: SelectProps) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className={`flex flex-col space-y-1.5 ${className}`}>
      {label &&
      <label htmlFor={selectId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      }
      <select
        id={selectId}
        className={`
          px-3 py-2 bg-white border rounded text-sm text-gray-900 
          focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900
          disabled:bg-gray-50 disabled:text-gray-500
          ${error ? 'border-red-500' : 'border-gray-200'}
        `}
        {...props}>
        
        <option value="" disabled>
          Select an option
        </option>
        {options.map((opt) =>
        <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        )}
      </select>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>);

}