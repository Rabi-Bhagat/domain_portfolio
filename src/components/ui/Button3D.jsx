import React from 'react';

export default function Button3D({ 
  children, 
  href, 
  onClick, 
  variant = 'primary', 
  className = '', 
  size = 'md',
  ...props 
}) {
  const sizes = {
    sm: "px-6 py-2 text-sm",
    md: "px-8 py-4 text-base",
    lg: "px-10 py-5 text-lg"
  };

  const baseClasses = "group relative inline-flex items-center justify-center font-bold rounded-xl transition-all duration-150 active:translate-y-[6px] active:shadow-none outline-none focus:outline-none";
  
  const variants = {
    primary: "bg-primary text-white shadow-[0_6px_0_#1d4ed8] hover:bg-blue-500", 
    secondary: "bg-white text-slate-700 shadow-[0_6px_0_#cbd5e1] border border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:shadow-[0_6px_0_#0f172a] dark:border-white/5 dark:hover:border-white/10 dark:hover:bg-slate-700 dark:hover:text-white", 
    accent: "bg-accent text-slate-900 shadow-[0_6px_0_#047857] hover:bg-emerald-400",
    gradient: "bg-gradient-to-r from-primary to-secondary text-white shadow-[0_6px_0_#4c1d95] hover:opacity-90"
  };

  const combinedClasses = `${baseClasses} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClasses} {...props}>
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </a>
    );
  }

  return (
    <button onClick={onClick} className={combinedClasses} {...props}>
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
}
