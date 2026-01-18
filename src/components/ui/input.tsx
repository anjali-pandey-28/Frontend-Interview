export const Input = ({ className = "", ...props }: any) => (
  <input
    {...props}
    className={`w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${className}`}
  />
);