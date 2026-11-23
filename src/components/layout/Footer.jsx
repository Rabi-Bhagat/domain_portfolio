import { ArrowUp } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-ink">Rabi Bhagat</p>
          <p className="mt-1 text-xs text-muted">
            Full-stack developer · Rajbiraj, Saptari, Nepal
          </p>
        </div>

        <div className="flex items-center gap-5 text-xs text-muted">
          <span>© {year} All rights reserved</span>
          <a
            href="#home"
            className="inline-flex items-center gap-1 text-ink transition-colors hover:text-primary focus-ring rounded"
          >
            Top <ArrowUp size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
}
