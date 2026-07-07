"use client";

import { Users } from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useDebounced } from "@/lib/use-debounced";
import { usePreview } from "../hooks/use-preview";
import type {
  BroadcastInput,
  BroadcastKind,
  Channel,
  Segment,
} from "../types";
import { SegmentBuilder } from "./segment-builder";

const CHANNELS: Channel[] = ["email", "push", "inapp"];

interface BroadcastComposerProps {
  initial?: Partial<BroadcastInput>;
  pending?: boolean;
  submitLabel?: string;
  onSubmit: (input: BroadcastInput) => void;
}

export function BroadcastComposer({
  initial,
  pending,
  submitLabel = "Save draft",
  onSubmit,
}: BroadcastComposerProps) {
  const [kind, setKind] = useState<BroadcastKind>(initial?.kind ?? "system");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [body, setBody] = useState(initial?.body ?? "");
  const [channels, setChannels] = useState<Channel[]>(
    initial?.channels ?? ["email", "inapp"],
  );
  const [segment, setSegment] = useState<Segment>(initial?.audience ?? {});

  const debouncedSegment = useDebounced(segment);
  const preview = usePreview(kind, debouncedSegment);

  const valid =
    title.trim().length > 0 && body.trim().length > 0 && channels.length > 0;

  function toggleChannel(channel: Channel, on: boolean) {
    setChannels((current) =>
      on ? [...current, channel] : current.filter((c) => c !== channel),
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Message</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel>Type</FieldLabel>
              <Select
                value={kind}
                onValueChange={(value) => setKind(value as BroadcastKind)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system">System notice</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel>Channels</FieldLabel>
              <div className="flex flex-wrap gap-4 pt-1">
                {CHANNELS.map((channel) => (
                  <label
                    key={channel}
                    className="flex items-center gap-2 text-sm capitalize"
                  >
                    <Checkbox
                      checked={channels.includes(channel)}
                      onCheckedChange={(checked) =>
                        toggleChannel(channel, checked === true)
                      }
                    />
                    {channel}
                  </label>
                ))}
              </div>
            </Field>
          </div>
          <p className="text-muted-foreground text-xs">
            {kind === "marketing"
              ? "Marketing only reaches opted-in users and includes an unsubscribe link."
              : "System notices reach everyone in the audience, bypassing marketing consent."}
          </p>
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="body">Body</FieldLabel>
            <Textarea
              id="body"
              rows={6}
              value={body}
              onChange={(event) => setBody(event.target.value)}
            />
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Audience</CardTitle>
          <span className="text-muted-foreground flex items-center gap-1.5 text-sm">
            <Users className="size-4" />
            {preview.isFetching ? (
              <Spinner className="size-3" />
            ) : (
              <span className="tabular-nums">
                ≈ {(preview.data?.recipients ?? 0).toLocaleString()} recipients
              </span>
            )}
          </span>
        </CardHeader>
        <CardContent>
          <SegmentBuilder value={segment} onChange={setSegment} />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          disabled={!valid || pending}
          onClick={() => onSubmit({ kind, title, body, channels, audience: segment })}
        >
          {pending ? <Spinner /> : submitLabel}
        </Button>
      </div>
    </div>
  );
}
