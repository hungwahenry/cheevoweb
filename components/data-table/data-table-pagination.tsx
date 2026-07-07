"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DataTablePaginationProps {
  page: number
  lastPage: number
  total: number
  onPageChange: (page: number) => void
  isLoading?: boolean
}

export function DataTablePagination({
  page,
  lastPage,
  total,
  onPageChange,
  isLoading,
}: DataTablePaginationProps) {
  return (
    <div className="flex items-center justify-between px-1 py-2">
      <p className="text-sm text-muted-foreground">
        {total.toLocaleString()} {total === 1 ? "result" : "results"}
      </p>
      <div className="flex items-center gap-2">
        <span className="text-sm tabular-nums">
          Page {page} of {Math.max(lastPage, 1)}
        </span>
        <Button
          variant="outline"
          size="icon"
          aria-label="Previous page"
          disabled={page <= 1 || isLoading}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          aria-label="Next page"
          disabled={page >= lastPage || isLoading}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
