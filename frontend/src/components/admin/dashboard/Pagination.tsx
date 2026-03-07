import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-x-2 mt-6">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="p-2 rounded-xl text-muted-foreground hover:bg-accent hover:text-main disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-x-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          const isActive = currentPage === page;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                "w-9 h-9 rounded-xl text-sm font-semibold transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-main",
              )}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="p-2 rounded-xl text-muted-foreground hover:bg-accent hover:text-main disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
