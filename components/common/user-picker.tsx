"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";
import { cn } from "@/lib/utils";
import { useDebounced } from "@/lib/use-debounced";

export interface PickedUser {
  id: string;
  email: string;
  label: string;
  avatar_url?: string;
}

interface UserRow {
  id: string;
  email: string;
  profile: {
    display_name: string | null;
    username: string | null;
    avatar_url: string;
  } | null;
}

function toPicked(user: UserRow): PickedUser {
  return {
    id: user.id,
    email: user.email,
    label: user.profile?.display_name ?? user.profile?.username ?? user.email,
    avatar_url: user.profile?.avatar_url,
  };
}

/** Reusable searchable user selector — backed by the admin users search. */
export function UserPicker({
  value,
  onChange,
  placeholder = "Search a user…",
}: {
  value: PickedUser | null;
  onChange: (user: PickedUser | null) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debounced = useDebounced(query, 300);

  const { data, isFetching } = useQuery({
    queryKey: ["user-search", debounced],
    queryFn: () =>
      api.get<Paginated<UserRow>>("/admin/users", {
        q: debounced || undefined,
        per_page: 8,
      }),
    enabled: open,
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between font-normal"
        >
          {value ? (
            <span className="flex items-center gap-2">
              <Avatar className="size-5">
                <AvatarImage src={value.avatar_url} alt="" />
                <AvatarFallback className="text-[10px]">
                  {value.email.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="truncate">{value.label}</span>
            </span>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronsUpDown className="text-muted-foreground size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search name or email…"
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            <CommandEmpty>
              {isFetching ? "Searching…" : "No users found."}
            </CommandEmpty>
            <CommandGroup>
              {data?.items.map((user) => {
                const picked = toPicked(user);
                return (
                  <CommandItem
                    key={user.id}
                    value={user.id}
                    onSelect={() => {
                      onChange(picked);
                      setOpen(false);
                    }}
                    className={cn(value?.id === user.id && "bg-accent")}
                  >
                    <Avatar className="size-6">
                      <AvatarImage src={picked.avatar_url} alt="" />
                      <AvatarFallback className="text-[10px]">
                        {user.email.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-sm">{picked.label}</p>
                      <p className="text-muted-foreground truncate text-xs">
                        {user.email}
                      </p>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
