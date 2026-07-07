"use client"

import { Search } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"

interface DataTableSearchProps {
  defaultValue?: string
  onSearch: (value: string) => void
  placeholder?: string
}

/** Debounced search box. Local state drives the input; the URL is updated downstream. */
export function DataTableSearch({
  defaultValue = "",
  onSearch,
  placeholder = "Search…",
}: DataTableSearchProps) {
  const [value, setValue] = useState(defaultValue)
  const onSearchRef = useRef(onSearch)

  useEffect(() => {
    onSearchRef.current = onSearch
  })

  useEffect(() => {
    const timeout = setTimeout(() => onSearchRef.current(value), 300)
    return () => clearTimeout(timeout)
  }, [value])

  return (
    <div className="relative w-full sm:w-64">
      <Search className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        className="pl-8"
      />
    </div>
  )
}
