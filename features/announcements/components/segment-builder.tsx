"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useSegmentOptions } from "../hooks/use-segment-options";
import type { Segment } from "../types";

const ROLES = ["attendee", "organiser", "admin"];

interface SegmentBuilderProps {
  value: Segment;
  onChange: (segment: Segment) => void;
}

export function SegmentBuilder({ value, onChange }: SegmentBuilderProps) {
  const { data: options } = useSegmentOptions();
  const set = (patch: Partial<Segment>) => onChange({ ...value, ...patch });

  function toggle<T>(list: T[] | undefined, item: T, on: boolean): T[] | undefined {
    const next = on ? [...(list ?? []), item] : (list ?? []).filter((v) => v !== item);
    return next.length ? next : undefined;
  }

  const ordered =
    value.has_ordered === undefined
      ? "any"
      : value.has_ordered
        ? "yes"
        : "no";

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Field>
        <FieldLabel>Roles</FieldLabel>
        <div className="flex flex-wrap gap-4 pt-1">
          {ROLES.map((role) => (
            <label key={role} className="flex items-center gap-2 text-sm capitalize">
              <Checkbox
                checked={value.roles?.includes(role) ?? false}
                onCheckedChange={(checked) =>
                  set({ roles: toggle(value.roles, role, checked === true) })
                }
              />
              {role}
            </label>
          ))}
        </div>
      </Field>

      <Field>
        <FieldLabel>Purchase history</FieldLabel>
        <Select
          value={ordered}
          onValueChange={(v) =>
            set({ has_ordered: v === "any" ? undefined : v === "yes" })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Anyone</SelectItem>
            <SelectItem value="yes">Has bought a ticket</SelectItem>
            <SelectItem value="no">Never bought</SelectItem>
          </SelectContent>
        </Select>
      </Field>

      <Field>
        <FieldLabel>Active since</FieldLabel>
        <Input
          type="date"
          value={value.active_since ?? ""}
          onChange={(e) => set({ active_since: e.target.value || undefined })}
        />
      </Field>

      <Field>
        <FieldLabel>Inactive since</FieldLabel>
        <Input
          type="date"
          value={value.inactive_since ?? ""}
          onChange={(e) => set({ inactive_since: e.target.value || undefined })}
        />
      </Field>

      <Field orientation="horizontal" className="items-center justify-between">
        <FieldLabel htmlFor="upcoming-rsvp">Has an upcoming RSVP</FieldLabel>
        <Switch
          id="upcoming-rsvp"
          checked={value.has_upcoming_rsvp ?? false}
          onCheckedChange={(checked) =>
            set({ has_upcoming_rsvp: checked || undefined })
          }
        />
      </Field>

      {options && options.cities.length > 0 && (
        <Field className="md:col-span-2">
          <FieldLabel>Cities</FieldLabel>
          <ScrollArea className="h-32 rounded-md border p-3">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {options.cities.map((city) => (
                <label key={city} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={value.cities?.includes(city) ?? false}
                    onCheckedChange={(checked) =>
                      set({ cities: toggle(value.cities, city, checked === true) })
                    }
                  />
                  <span className="truncate">{city}</span>
                </label>
              ))}
            </div>
          </ScrollArea>
        </Field>
      )}
    </div>
  );
}
