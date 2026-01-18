export const Card = ({ children, className = "", onClick }: any) => (
  <div
    onClick={onClick}
    className={`bg-white rounded-xl border shadow-sm transition-all ${className}`}
  >
    {children}
  </div>
);
export const CardHeader = ({ children, className = "" }: any) => (
  <div className={`p-5 flex flex-col space-y-1.5 ${className}`}>{children}</div>
);
export const CardTitle = ({ children, className = "" }: any) => (
  <h3 className={`font-bold leading-tight text-xl text-slate-900 ${className}`}>
    {children}
  </h3>
);
export const CardDescription = ({ children, className = "" }: any) => (
  <p className={`text-sm text-slate-500 line-clamp-2 ${className}`}>
    {children}
  </p>
);