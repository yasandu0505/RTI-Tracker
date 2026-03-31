
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}
export function Input({
  label,
  error,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className={`flex flex-col space-y-1.5 ${className}`}>
      {label &&
      <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      }
      <input
        id={inputId}
        className={`
          px-3 py-2 bg-white border rounded text-sm text-gray-900 
          focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900
          disabled:bg-gray-50 disabled:text-gray-500
          ${error ? 'border-red-500' : 'border-gray-200'}
        `}
        {...props} />
      
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>);

}